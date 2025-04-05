const express = require('express')
const app = express()

app.use(express.json())

const userRoutes = require('./routes/users')    
const taskRoutes = require('./routes/tasks')

app.use('/api/users',userRoutes)
app.use('/api/tasks',taskRoutes)

app.get('/',(req,res)=>{    
    res.send('Seja bem vindo ao task manager!')
})


module.exports = app