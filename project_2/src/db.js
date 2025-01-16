import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory')

db.exec(`
    CREATE TABLE users (
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    `)
db.exec(`
    CREATE TABLE todos(
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    `)

export default db    