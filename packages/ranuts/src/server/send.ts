import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

type Next = () => Promise<never> | Promise<void>

interface TypesExtension {
  [x: string]: string
}

interface Option {
  pathname: string
  types: TypesExtension
}

type MiddlewareFunction = (
  req: IncomingMessage,
  res: ServerResponse,
  next: Next,
) => Promise<void> | void

// 允许访问的文件类型
const defaultTypes: TypesExtension = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',
  xml: 'application/xml',
}

const staticServer = (option: Partial<Option> = {}): MiddlewareFunction => {
  const { pathname, types = defaultTypes } = option
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: Next,
  ): Promise<void> => {
    try {
      if (req.url) {
        const dirPath = pathname ? pathname : process.cwd()
        // 静态资源文件根路径
        const root = path.normalize(path.resolve(dirPath))
        // 获取访问的文件类型
        const extension = path.extname(req.url).slice(1)
        // 文件类型后缀
        const type = extension ? types[extension] : types.html
        // 是否支持的文件类型
        const supportedExtension = Boolean(type)
        // 如果这个文件类型不允许访问，则直接返回404
        if (!supportedExtension) {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end('404: File not found')
          return
        }

        // 通过url获取访问的文件名称
        let fileName = req.url
        // 如果访问的路径是 /
        if (req.url === '/') {
          // 则文件名是 index.html
          fileName = 'index.html'
        } else if (!extension) {
          try {
            // 检测文件是否允许访问
            fs.accessSync(path.join(root, req.url + '.html'), fs.constants.F_OK)
            // 当允许访问时，则返回对应的页面
            fileName = req.url + '.html'
          } catch (e) {
            // 否则直接返回 index.html
            fileName = path.join(req.url, 'index.html')
          }
        }

        const filePath = path.join(root, fileName)
        const isPathUnderRoot = path
          .normalize(path.resolve(filePath))
          .startsWith(root)

        if (!isPathUnderRoot) {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end('404: File not found')
          return
        }

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end('404: File not found')
          } else {
            res.writeHead(200, { 'Content-Type': type })
            res.end(data)
          }
        })
      } else {
        console.log('request has not url')
      }
      await next()
    } catch (error) {}
  }
}

export default staticServer
