const mongoose = require('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        maxlength:20,
        required:true
    },

    email:{
        type:String,
        trim:true,
        maxlength:30,
        required:true,
        unique:true

    },
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
   

       
    }
}, {timestamps:true})



userSchema.virtual('password')
.set(function(password){
    this.__password=password
    this.salt=uuidv1()
    this.hashed_password=this.encryptPassword(password)

})
.get(function(){
    return this.__password
})

userSchema.methods={
    encryptPassword: function(password){
        if (!password) return ''
        try{
            crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')

        }
        catch(err){
            return ''
        }
            
    }
}

module.exports=mongoose.model('User',userSchema)