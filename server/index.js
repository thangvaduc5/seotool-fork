require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const profileRoutes = require('./routes/profileRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cookieParser())

const corsOptions = {
  origin: 'https://seo-tools-fork-lyart.vercel.app',
  credentials: true, // Allow credentials (cookies)
}

app.use((req, res, next) => {
  console.log(req.cookies)
  next()
})

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/seoTool'
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => console.log(err))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

app.use('/seo', profileRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
