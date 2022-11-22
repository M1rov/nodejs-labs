import Router from '../lib/router'
import server from '../lib/server.js'

const router = new Router()

router.get('/', (req, res) => {
  server.send(res, 'Server works!', 'json')
})

router.get('/test', (req, res) => {
  server.send(res, 'GET method test', 'json')
})

router.post('/test', (req, res) => {
  server.send(res, 'POST method test', 'json')
})

router.post('/test/xml', (req, res) => {
  req.on('data', (data) => {
    server.send(res, data, 'xml')
  })
})

export default router
