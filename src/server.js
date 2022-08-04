import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.js'
import tableRouter from './routes/table.js'
import playerStateRouter from './routes/playerState.js'


const server = express()
server.disable('x-powered-by')
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/user', userRouter)
server.use('/table', tableRouter)
server.use('/playerState', playerStateRouter)



server.use('/status', (req, res) => {
  res.json({status: 'ok'})
})

server.get('*', (req, res) => {
    res.status(404).json({
      status: 'fail',
      data: {
        resource: 'Not found'
      }
    })
  })

export default server