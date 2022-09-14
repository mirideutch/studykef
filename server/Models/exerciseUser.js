const mongoose = require('mongoose')

const exerciseUserSchema= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId ,ref:"User"},//צריך מפתח?
    label:{type:String , ref:"Letter"},
    gameExercise:{type:Number},
    mark:{type:Number}   
})
module.exports = mongoose.model("Exercise",exerciseUserSchema)