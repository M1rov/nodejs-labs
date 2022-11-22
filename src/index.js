import Server from './lib/server'
import router from './routes/index'

const PORT = parseInt(process.env.PORT || '8080')

const server = new Server()

server.use(router).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', async () => {
  await server.shutdown()
})
