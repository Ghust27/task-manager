const {MongoClient} = require('mongodb')

let db

async function connectDB(){
    if(db){
        return db
    }

    const client = new MongoClient(process.env.MONGO_URI, {useUnifiedTopology: true})

    await client.connect()

    db = client.db()
    console.log("Connected to the database.")
    return db
}


module.exports = {connectDB}