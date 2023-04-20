import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

const app = express()
const port = 8080
app.use(cors())
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)
dotenv.config()
app.use(express.json({limit:'50mb'}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const start =async ()=>{
  try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port,()=>{
          console.log(`server listening at port ${port}...`)
      })
      console.log('connected to database')
  } catch (error) {
      console.log(new Error("could not connect to database"));
  }
}
start();