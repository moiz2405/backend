import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//register a new user at /authr/register
router.post('/register', (req, res) => {
    //got the username , password values from req
    const { username, password } = req.body
    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    //save username and new password to db
    try{
        //adding a new user 
        const insertUser = db.prepare(`INSERT INTO users (username,password) VALUES(?,?)`)
        const result = insertUser.run(username,hashedPassword)

        //default todo
        const defaultTodo = "Hello Add your first Todo"
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
        
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create a token 
        const token = jwt.sign({id : result.lastInsertRowid},process.env.JWT_SECRET, {expiresIn: '24'})
        res.json({token})

    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', (req, res) => {

})
export default router;