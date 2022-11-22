import Server from './lib/server'
import routes from './routes/index'

const PORT = parseInt(process.env.PORT || '4000')

const server = new Server()

server.use(routes).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('SIGTERM', async () => {
  await server.shutdown()
})
