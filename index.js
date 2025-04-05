require('dotenv').config()

const app = require('./src/app')
const {MongoClient} = require('mongodb')

const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`The server is running on the port: ${PORT}`)
})
