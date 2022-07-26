import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.js'

const server = express()
server.disable('x-powered-by')
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(express.json())
server.use('/user', userRouter)
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