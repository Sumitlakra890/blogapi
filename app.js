const { Router } = require('express');
const express = require('express');
const app = express();
const Blog = require('./model/blog');
const userouter=require('./router/user')


app.use(express.json());
// app.use(userouter)

app.get('/api/blog', async (req, res) => {
    const createdBy = req.body.userId;

    try{
        const result = await Blog.find({createdBy});
        res.send(result);
    }catch(err){
        console.log('err is ', err);
    }

})

app.put('/api/blog', async (req, res) => {
    const blogId = req.body.blogId;

    try{
        const result = await Blog.update({_id: blogId}, {
            description: req.body.content
        });   
    }catch(err){
        console.log('blog not updated ', err);
    }
})

app.listen(5000, () => {
    console.log('server is running at port ', port);
})

