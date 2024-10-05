const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes= require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose
  .connect("mongodb+srv://sai_charan:saicharan@cluster0.pu747xs.mongodb.net/chatDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () =>
  console.log(`Server started on ${5000}`)
);

const io = socket(server,{
  cors:{
    origin:"https://chatapp-fe-kcca.onrender.com",
    credentials:true,
  }
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  })

  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.message)
    }
  })
});


