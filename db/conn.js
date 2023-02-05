const mongoose =require("mongoose")
mongoose.connect("mongodb://27017/Student").then((result)=>{
    console.log("monodb is connected")
}).catch((e)=>{
    console.log(e);
});