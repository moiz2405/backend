import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
const app = express()
const PORT = process.env.PORT || 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import authMiddleware from './middleware/authMiddleware.js'
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

//routes
app.use('/auth', authRoutes)

app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})
