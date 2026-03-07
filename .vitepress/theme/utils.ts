import fs from 'fs'
import yaml from 'js-yaml'

const loadYamlConfig = (filePath: string) => {
  return yaml.load(fs.readFileSync(filePath, 'utf-8')) as any
}

export { loadYamlConfig }
