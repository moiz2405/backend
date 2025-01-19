import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})


//create a new todo
router.post('/', (req, res) => {

    const { todoData } = req.body
    console.log(todoData)
    const newTodo = db.prepare(`INSERT INTO todos (user_id,task) VALUES (?,?)`)

    newTodo.run(req.userId, todoData)

})

//update a todo
router.put('/:id', (req, res) => {

})

//delete a todo
router.delete('/:id', (req, res) => {

})

export default router;