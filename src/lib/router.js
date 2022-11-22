import { URL } from 'url'
import { httpMethods } from './http-methods.js'
import server from './server'

export default class {
  handlers = {}

  async handle(req, res) {
    const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname
    const method = req.method || httpMethods.GET

    const routeHandlers = this.handlers[path]?.[method]
    if (!routeHandlers || routeHandlers.length === 0) {
      server.send(res, 'Not found', 'json', 404)
      return
    }

    for (const handler of await Promise.all(this.handlers[path][method])) {
      handler(req, res)
    }
  }

  add(method, path = '/', ...handlers) {
    if (!this.handlers[path]?.[method]) {
      this.handlers[path] = {
        ...(this.handlers[path] || {}),
        [method]: [...handlers],
      }
    } else this.handlers[path][method].push(...handlers)
  }

  get(path = '/', ...handlers) {
    this.add(httpMethods.GET, path, ...handlers)
  }

  post(path = '/', ...handlers) {
    this.add(httpMethods.POST, path, ...handlers)
  }

  put(path = '/', ...handlers) {
    this.add(httpMethods.PUT, path, ...handlers)
  }

  delete(path = '/', ...handlers) {
    this.add(httpMethods.DELETE, path, ...handlers)
  }

  options(path = '/', ...handlers) {
    this.add(httpMethods.OPTIONS, path, ...handlers)
  }

  patch(path = '/', ...handlers) {
    this.add(httpMethods.PATCH, path, ...handlers)
  }

  head(path = '/', ...handlers) {
    this.add(httpMethods.HEAD, path, ...handlers)
  }

  connect(path = '/', ...handlers) {
    this.add(httpMethods.CONNECT, path, ...handlers)
  }

  trace(path = '/', ...handlers) {
    this.add(httpMethods.TRACE, path, ...handlers)
  }
}
