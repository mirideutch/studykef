const mongoose = require('mongoose')

const wordOfLetterSchema= mongoose.Schema({
    
    word:{type:String},    
    wordSound:{type:String},
    wordImage:{type:String}
    
})
module.exports = mongoose.model("Word",wordOfLetterSchema)