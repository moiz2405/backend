import express from 'express'
// import db from '../db.js'
import prisma from '../prismaClient.js'
const router = express.Router()

// Get all todos for logged-in user
router.get('/', async (req, res) => {
    const userId = req.userID
    const todos = await prisma.todo.findMany({
        where:{
            userId
        }
    })
    res.json(todos)
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body
    const userId = req.userId
    const todo = await prisma.todo.create({
        data :{
            task,
            userId
        }
    })

    res.json({todo})
})

// Update a todo
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params
    const userId = req.userId
    const updatedTodo = await prisma.todo.update({

        where :{
            id : parseInt(id),
            userId
        },
        data :{
            completed : !!completed
        }
    })

    res.json({ updatedTodo})
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    
    const deleteTodo = await prisma.todo.delete({
        where :{
            id : parseInt(id),
            userId
        }
    })
    
    res.send({ message: "Todo deleted" })
})

export default router