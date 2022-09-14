const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
   userFirstName:{type:String},
   userLastName:{type:String},
   userBirthDate:{type:Date},
   passWord:{type:String},
   mail:{type:String},
   phone:{type:String}
    
})
module.exports = mongoose.model("User",userSchema)