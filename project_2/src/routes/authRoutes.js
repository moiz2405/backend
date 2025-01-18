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
    try {
        //adding a new user 
        const insertUser = db.prepare(`INSERT INTO users (username,password) VALUES(?,?)`)
        const result = insertUser.run(username, hashedPassword)
        
        //default todo
        const defaultTodo = "Hello Add your first Todo"

        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)

        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create a token 
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24' })
        console.log(users)
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})
//login route
router.post('/login', (req, res) => {

    const { username, password } = req.body

    try {
        //fetching name from db
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        
        const user = getUser.get(username)

        //if not a registered user
        if (!user) { return res.status(404).json({ message: "User Not Found" }) }
        
        //compare passwords
        //user.password returns the hashes password and compare sync compares normal and hashed password syncronously 
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        
        if(!passwordIsValid){return res.status(401).json({message : "Invalid Password"})}
        
        console.log(user);
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn:'24'})
        res.json({token})

    } catch (err) {
        console.log(err);
        res.sendStatus(503);
    }

})
export default router;