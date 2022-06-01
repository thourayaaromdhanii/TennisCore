const mongoose =require ('mongoose')
const playerSchema =mongoose.Schema({
  id :{type:String,index: true},
    Name:String,
    age:Number,
    points:{type:Number,default:0},
    addBy:{
      type : mongoose.Schema.ObjectId,
    },
    coach :{
        type : mongoose.Schema.ObjectId,
        ref : 'Coach'
      } ,
    club : {
        type : mongoose.Schema.ObjectId,
        ref : 'Club'
      } 


})
module.exports=mongoose.model('player',playerSchema)