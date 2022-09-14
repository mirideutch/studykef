const mongoose = require('mongoose')

const letterSchema= mongoose.Schema({
    letter:{type:String},//A=id    
    wordsLetter:[{type:mongoose.Schema.Types.ObjectId,ref:"Word"}],
    imageUppercase:{type:String},
    imageLowercase:{type:String},
    soundLetter:{type:String}
    
})
module.exports = mongoose.model("Letter",letterSchema)