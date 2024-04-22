const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  }

  let allChats= [
    {
        from:"hiya",
        to:"diya",
        message:"hello how are where have you been!",
        createdAt: new Date()
    },
    {
        from:"riya",
        to:"krishna",
        message:"What are you doing",
        createdAt: new Date()
    },
    {
        from:"kavya",
        to:"keshav",
        message:"wanna Play",
        createdAt: new Date()
    },
    {
        from:"shreya",
        to:"dikaha",
        message:"hello where are you!",
        createdAt: new Date()
    },
    {
        from:"himani",
        to:"gaurav",
        message:"hello need some help!",
        createdAt: new Date()
    }
  ]

Chat.insertMany(allChats);
