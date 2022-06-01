const mongoose =require ('mongoose')
const ScoreSchema =mongoose.Schema({
  addBy:{
      type : mongoose.Schema.ObjectId,
    },
    match :{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      } ,
    player : {
        type : mongoose.Schema.ObjectId,
        ref : 'Player'
      } ,
    setOne:Number,
    setTwo:Number,
    setThree:Number


})
module.exports=mongoose.model('score',ScoreSchema)