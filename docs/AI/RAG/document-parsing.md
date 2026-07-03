# 多格式文档解析

> 解析是 RAG 管线里最大的脏活：**格式决定策略**，一套代码通吃所有格式的结果就是所有格式都解析得稀烂。本文按格式逐一给出可运行的处理方案，目标只有一个——产出“带结构信息的干净文本”。

## 格式总览

| 格式 | 主要难点 | 推荐工具 |
|:---|:---|:---|
| PDF (文本型) | 双栏、页眉页脚、段落断裂 | PyMuPDF |
| PDF (扫描型) | 需要 OCR | PaddleOCR、VLM |
| PDF 中的表格 | 单元格错位、跨页 | pdfplumber、Camelot |
| Word (.docx) | 样式与结构分离 | python-docx |
| HTML | 广告、导航等噪声 | trafilatura、BeautifulSoup |
| Excel / CSV | 表格不是“文本” | pandas + 行文本化 |
| Markdown | 几乎没有,天然结构化 | 直接读 |

## PDF：文本型

PyMuPDF 速度快、还原准，按“块”读取可保留位置信息用于去页眉页脚：

```python
import fitz  # PyMuPDF

def parse_pdf(path: str) -> list[dict]:
    doc, results = fitz.open(path), []
    for page_num, page in enumerate(doc, 1):
        for x0, y0, x1, y1, text, *_ in page.get_text("blocks"):
            if y0 < 50 or y1 > page.rect.height - 50:
                continue  # 按坐标过滤页眉页脚
            if text.strip():
                results.append({"text": text.strip(), "page": page_num})
    return results
```

要点：

- **页码必须保留**——生成环节的引用标注、bad case 回溯全靠它
- 双栏排版按坐标先分左右再拼接，直接顺序读取会把两栏文字交错混在一起
- 段落被换行符切碎是常态，用“行尾无标点则与下一行合并”的启发式修复

## PDF：表格与扫描件

```python
import pdfplumber

with pdfplumber.open("report.pdf") as pdf:
    for table in pdf.pages[10].extract_tables():
        header, *rows = table
        # 表格转 Markdown,保住行列关系
        md = "| " + " | ".join(map(str, header)) + " |\n"
        md += "|" + "---|" * len(header) + "\n"
        for row in rows:
            md += "| " + " | ".join(str(c or "") for c in row) + " |\n"
```

- 表格区域的坐标可以拿到，**正文解析时挖掉表格区域**，避免表格文字混进段落
- 扫描件先用 `page.get_text()` 检测：没有文本层就转 OCR (PaddleOCR 中文效果好)；预算充足时直接把页面截图交给 VLM (GPT-4o、Qwen-VL) 转 Markdown，复杂版面的效果远超传统 OCR
- 版面极复杂 (财报、票据) 时，考虑跳过解析走 [ColPali 视觉检索](./multimodal-rag)路线

## Word 与 HTML

```python
from docx import Document

def parse_docx(path: str) -> list[dict]:
    blocks, heading_path = [], []
    for p in Document(path).paragraphs:
        if p.style.name.startswith("Heading"):
            level = int(p.style.name.split()[-1])
            heading_path = heading_path[: level - 1] + [p.text]
        elif p.text.strip():
            blocks.append({
                "text": p.text,
                "breadcrumb": " > ".join(heading_path),  # 标题路径
            })
    return blocks
```

docx 的最大价值是**样式即结构**：Heading 1/2/3 直接给出层级，务必把“标题路径”(面包屑) 挂到每个段落上，后续[分块](./chunking-in-practice)和检索都受益。

HTML 用 trafilatura 一行提取正文，自动去掉导航、广告、评论：

```python
import trafilatura

text = trafilatura.extract(trafilatura.fetch_url(url), output_format="markdown")
```

## Excel / CSV

表格数据的两种文本化策略，按查询模式二选一或并用：

```python
import pandas as pd

df = pd.read_excel("sales.xlsx")

# 策略一:行级文本化——适合“查具体记录”类问题
rows = [
    f"{r.部门} {r.年份}年销售额 {r.销售额}万元,同比{r.同比}"
    for r in df.itertuples()
]

# 策略二:表级摘要——适合“整体趋势”类问题,摘要用于检索,命中后把整表给 LLM
summary = f"本表包含 {df.部门.nunique()} 个部门 {df.年份.min()}~{df.年份.max()} 年销售数据,字段:{list(df.columns)}"
```

## 统一中间表示

不管什么格式，解析产物统一为同一种结构，下游分块才能格式无关：

```python
{"text": "...", "metadata": {"source": "2023年报.pdf", "page": 42,
 "breadcrumb": "第四章 > 营收分析", "type": "paragraph|table|title"}}
```

不想逐格式手写，可用 **Unstructured** 或 IBM **Docling** 一站式解析——它们输出的正是这种带类型和元数据的元素列表，代价是对个别格式的精细控制力下降。

::: details e.g. 财务知识库的解析管线
年报 PDF → PyMuPDF 按块解析 + pdfplumber 挖表格转 Markdown；制度文档 (docx) → 标题路径挂元数据；历史扫描件 → PaddleOCR；月度报表 (Excel) → 行级文本化 + 表级摘要双份。全部汇入统一中间表示，每个元素带 source/page/breadcrumb，进入[分块环节](./chunking-in-practice)。
:::

## 参考

- [PyMuPDF 文档](https://pymupdf.readthedocs.io/)
- [Unstructured](https://github.com/Unstructured-IO/unstructured)
- [Docling](https://github.com/docling-project/docling)
