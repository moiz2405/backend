const express = require('express');

const app = express();
const PORT = 3000

const data = {
    "username": ['moiz'],
    "password": "1234",
}
app.use(express.json());

app.get('/', (req, res) => {
    console.log('On the Home page')
    res.send(`
        <p>${JSON.stringify(data)}</p>
        `)
})

app.get('/dashboard', (req, res) => {
    console.log('On Dashboard page')
    res.send('<h1>Dashboard</h1>')
})

app.get('/api/data', (req, res) => {
    res.send(data);
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    res.sendStatus(201)
    console.log(newEntry)
    data.username.push(newEntry.user)
})

app.delete('/api/data', (req, res) => {
    res.sendStatus(200)
    data.username.pop()
})

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
