const express=require('express')
const app=express()
const mongoose=require('mongoose')



    const DB='mongodb+srv://KanndaOCR:KanndaOCR@cluster0.9vhjq4r.mongodb.net/db?retryWrites=true&w=majority'

    mongoose.connect(DB).then(()=>{
      console.log("connection succesful")
    }).catch((err)=>console.log("connection unsuccesful"))
app.get('/',(req,res)=>{
    res.send("Hello from server")
})

app.listen(3000,()=>{
    console.log("port running successfully")
})