# MCP 协议

> **MCP** (Model Context Protocol，模型上下文协议) 是 Anthropic 于 2024 年底开源的标准协议，统一了 AI 应用连接外部工具与数据源的方式，被称为“AI 应用的 USB-C 接口”。2025 年起被 OpenAI、Google、微软等相继采纳，成为事实标准。

## 解决什么问题

没有 MCP 之前，M 个 AI 应用接入 N 个工具需要写 M×N 个定制集成；有了 MCP，工具方实现一次 MCP Server，任何支持 MCP 的应用 (Claude、IDE、自研 Agent) 都能直接使用，集成数量降为 M+N。

## 架构

```text
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  MCP Host    │      │  MCP Client  │      │  MCP Server  │
│ (Claude Code │─内嵌─→│  (1:1 连接    │─协议─→│ (GitHub 服务  │
│  IDE、Agent) │      │   维护会话)   │      │  数据库、文件) │
└──────────────┘      └──────────────┘      └──────────────┘
```

- **Host**：面向用户的 AI 应用，管理多个 Client
- **Client**：Host 内部与某个 Server 的 1:1 连接
- **Server**：暴露能力的一方，可以是本地进程 (stdio) 或远程服务 (Streamable HTTP)

## 三类核心能力

| 能力 | 控制方 | 类比 | 示例 |
|:---|:---|:---|:---|
| **Tools** | 模型决定何时调用 | POST 接口 | 创建 Issue、执行 SQL |
| **Resources** | 应用/用户挑选后注入上下文 | GET 接口 | 文件内容、数据库 Schema |
| **Prompts** | 用户主动触发 | 快捷指令模板 | 「/审查这段代码」 |

区分三者的意义：不是所有能力都该交给模型自主调用。Resources 和 Prompts 把控制权留给用户与应用，避免“一切皆工具”导致的失控。

## 快速上手

```json
// Claude Code 的 .mcp.json：接入 GitHub MCP Server
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

```python
# 用官方 SDK 写一个最小 MCP Server
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("demo")

@mcp.tool()
def get_order(order_id: str) -> str:
    """根据订单号查询订单状态"""
    return query_db(order_id)

mcp.run()  # 默认 stdio 传输
```

## 工程注意事项

- **传输方式选型**：本地集成用 stdio (简单、无网络暴露)；多用户/云端场景用 Streamable HTTP + OAuth
- **安全是最大命题**：MCP Server 拿到的凭据、Server 返回内容可能包含提示词注入——对第三方 Server 要像对待第三方依赖一样审查
- **工具数量控制**：接入多个 Server 后工具会迅速膨胀，配合动态加载/按需启用，避免淹没模型上下文
- **生态**：GitHub、Slack、Sentry、Stripe、各数据库均有官方或社区 Server，先搜再造

## 参考

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [MCP Server 官方仓库](https://github.com/modelcontextprotocol/servers)
- [Anthropic MCP 发布公告](https://www.anthropic.com/news/model-context-protocol)
