const express = require("express");
const app =express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
app.use(express.urlencoded({extended: true}));
const methodOverride = require("method-override");

app.set("viewengine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  }

//ROOT
app.get("/", (req,res)=> {
    res.send("root is working");
}) 
//CHATS
app.get("/chats", async(req,res) =>{
    const chats= await Chat.find();
    res.render("index.ejs",{chats});

})
//NEW CHAT
app.get("/chats/new",(req,res) =>{
    res.render("new.ejs");
})
app.post("/chats",(req,res) =>{
    let {from ,to,message}=req.body;
    let newChat =new Chat({
        from: from,
        to: to,
        message: message,
        createdAt: Date.now()
    })
    newChat.save().then(res => { console.log("chat is saved")})
    res.redirect("/chats");
})

//EDIT CHAT
app.get("/chats/:id/edit",async(req,res) =>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
})
app.put("/chats/:id",async (req,res) =>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    await Chat.findByIdAndUpdate(id,{
        message: newMsg},{runValidators : true});
    res.redirect("/chats");
});

//DELETE CHAT
app.delete("/chats/:id",async (req,res) =>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
app.listen(8080 , ()=>  {
    console.log("server listening at 8080");
});