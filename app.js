const {sequelize , first , Post} = require('./models')
const express = require('express')
const app = express()

app.use(express.json())

app.post('/first',async(req,res)=>{
    const {name , email, role} = req.body;

    try{
        const user = await first.create({name,email,role})
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }

})

app.get('/user',async(req,res)=>{
    try{
        const users = await first.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:"Wrong Something"})
    }
})


app.get('/user/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const users = await first.findOne({
            where:{uuid}
        })
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:"Wrong Something"})
    }
})


app.delete('/user/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const users = await first.findOne({
            where:{uuid}
        })

        await users.destroy()
        return res.json({message:"Deleted user"})
        // return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:"Wrong Something"})
    }
})


app.put('/user/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    const {name , email , role}  = req.body;
    try{
        const users = await first.findOne({
            where:{uuid}
        })
        users.name = name
        users.email = email
        users.role = role
        await users.save()
       
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({err:"Wrong Something"})
    }

})




app.get('/posts',async(req,res)=>{
  

    
    try{
        
        const post = await Post.findAll({include:[]});
        return res.json(post)
    }catch(err){
        console.log(err)
      return  res.status(500).json({err:'Error'})
    }
})


app.get('/posts',async(req,res)=>{
    const {userUuid,body} = req.body;

    
    try{
        const user  = await first.findOne({where:{uuid:userUuid}})
        const post = await Post.create({body , userId:user.id})
        return res.json(post)
    }catch(err){
        console.log(err)
      return  res.status(500).json({err:'Error'})
    }
})



app.listen({port:5000} , async() =>{
    console.log('server started')
    await sequelize.authenticate()
    console.log('Databased Connected');
})

