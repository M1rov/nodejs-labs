import http from 'http'
import contentTypes from './contentTypes.js'

export default class server {
  httpServer
  router

  connections = new Map()

  constructor() {
    this.httpServer = http.createServer((req, res) => {
      if (!res.socket) return
      this.connections.set(res.socket, res)
    })

    this.httpServer.on('connection', (socket) => {
      socket.on('close', () => {
        this.connections.delete(socket)
      })
    })
    return this
  }

  use(router) {
    this.router = router
    return this
  }

  listen(...params) {
    if (!this.router) throw new Error('No specified routes!')
    this.httpServer.on('request', this.router.handle.bind(this.router))
    this.httpServer.listen(...params)
  }

  async closeConnections() {
    for (const [connection, res] of this.connections.entries()) {
      this.connections.delete(connection)
      server.send(res, 'Connection was closed by server', 'json', 503)
      connection.destroy()
    }
  }

  async shutdown(...params) {
    this.httpServer.close((err) => {
      params[0]?.()
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    await this.closeConnections()
  }

  static send(res, data, type = 'json', statusCode = 200) {
    if (!(type in contentTypes)) {
      console.error('Unsupported response type!')
      res.writeHead(500)
      return
    }

    const { formattedData, contentType } = contentTypes[type](data)

    res.setHeader('Content-Type', contentType)
    res.writeHead(statusCode)
    res.write(formattedData)
    res.end()
  }
}
