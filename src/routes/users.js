const express = require('express')
const router = express.Router()
const {connectDB} = require('../configs/db.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register',async (req,res)=>{
    try{
        const {username,email,password} = req.body
        if (!username||!email||!password){
            return res.status(400).json({error:"Preencha username,email e password"})
        }
        const db = await connectDB()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({email})
        if (existingUser){
            return res.status(400).json({error:"email ja registrado."})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = {
            username,
            email,
            password: hashedPassword
        }
        await usersCollection.insertOne(newUser)
        res.status(201).json({message:"Usuario registrado com sucesso."})
    }catch(err){
        res.status(500).json({error:"Server error."})

    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            res.status(400).json({error:"preencha email e password."})
        }
        const db = await connectDB()
        const usersCollection = db.collection('users')

        const user = await usersCollection.findOne({email})
        if(!user){
            return res.status(401).json({error:"Credenciais invalidas."})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({error:"Credenciais invalidas."})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expires:'1d'})
        res.jgons({message:"Login bem-sucedido.",token})

    }catch (error){
        res.status(500).json({error:"internal server error."})
    }
})

module.export = router