import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'

function buildServer() {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use('/api', router)
  
  // Error handling middleware
  app.use(errorHandler)
  
  
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' })
  })

  return app
}


export default buildServer