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
    res.json({ message: "New Todo Created" })

})

//update a todo
router.put('/:id', (req, res) => {

    const { id } = req.params
    const { completed } = req.body
    const updateTodo = db.prepare(`UPDATE todos SET completed = (?) WHERE id = (?)`)

    updateTodo.run(completed, id)
    res.json({ message: "Todo completed" })
})

//delete a todo
router.delete('/:id', (req, res) => {

    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? and user_Id = ?`)
    deleteTodo.run(id, userId)
    res.json({ message: "Todo Deleted" })
})


export default router;