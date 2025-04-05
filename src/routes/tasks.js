const express = require('express')
const {connectDB} = require('../configs/db.config')
const authMiddleware = require('../middlewares/auth')
const {ObjectId, ReturnDocument} = require('mongodb')


const router = express.Router()

router.post('/', authMiddleware, async (req,res)=>{
    try{
        const {title,description} = req.body
        
        const db = await connectDB()
        const tasksCollection = db.collection('tasks')
    
        const newTask = {
            title,
            description,
            completed:false,
            userId:new ObjectId(req.userId)
        }

        const result = await tasksCollection.insertOne(newTask)
        res.status(201).json({message:"Task inserida com sucesso.",taskeId:result.insertedId})
    
    }catch (error){
        console.error(error)
        res.status(500).json({error:"Erro ao criar a tarefa."})
    }
})

router.get('/',authMiddleware,async (req,res)=>{
    try{
        const db = await connectDB()
        const tasksCollection = db.collection('tasks')

        const tasks = await tasksCollection.find({userId:new ObjectId(req.userId)}).toArray()
        res.json(tasks)


    }catch (error){
        console.error(error)
        res.status(500).json({error:"erro ao buscar tarefas."})
    }
})

router.get('/:id',authMiddleware,async (req,res)=>{
    try{
        const {id} = req.params
        const db = await connectDB()
        const tasksCollection = db.collection('tasks')

        const task = await tasksCollection.findOne({_id:new ObjectId(id),userId:new ObjectId(req.userId)})
        if (!task){
            return res.status(404).json({error:"Tarefa nao encontrada."})
        }
        res.json(task)
    }catch (error){
        console.error(error)
        res.status(500).json({error:"erro ao buscar tarefas."})
    }   
})

router.put('/:id', authMiddleware, async (req,res)=>{
    try{
        const {id} = req.params
        const {title,description,completed} = req.body
        
        const db = await connectDB()
        const tasksCollection = db.collection('tasks')

        const result = await tasksCollection.findOneAndUpdate({
            _id: new ObjectId(id),
            userId: new ObjectId(req.userId)
            },
            {$set:{title,description,completed}},
            {ReturnDocument:'after'}
        )

        if (!result.value) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' })
        }
    
        res.json({message: 'Tarefa atualizada com sucesso!',task: result.value})


    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Erro ao atualizar a tarefa.' })
    }

    router.delete('/:id', authMiddleware, async (req, res) => {
        try {
            const { id } = req.params
            const db = await connectDB()
            const tasksCollection = db.collection('tasks')
        
            const result = await tasksCollection.deleteOne({
                _id: new ObjectId(id),
                userId: new ObjectId(req.userId)
            })
        
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' })
            }
        
            res.json({ message: 'Tarefa removida com sucesso!' })
            
        }catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao remover a tarefa.' })
        }
        })
        
        module.exports = router

})