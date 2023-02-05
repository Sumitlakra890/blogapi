const mongoose =require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// import{isEmail} from validator;



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail, "invalid email"]
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('Unabel to login');
    }

    const isMatch  = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('unable to login');
    }

    return user;
}

const User= mongoose.model('user',userSchema);

module.exports=User;