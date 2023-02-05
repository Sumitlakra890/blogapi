const mongoose = require("mongoose");
// import { ObjectId } from "bson";


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        // type: new ObjectId,
        type: String,
        required:true,
    },
    createdOn:{
        type:Date,
        required:true,
    },
    
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;