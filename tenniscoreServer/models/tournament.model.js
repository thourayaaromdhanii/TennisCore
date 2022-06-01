const mongoose=require ('mongoose');
const TournamentSchema =mongoose.Schema({
    
    name:String,
    dateDeb:{type : Date},
    dateFin:{type : Date},
    addBy:{
      type : mongoose.Schema.ObjectId,
    },
    matches: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      firstCalif: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      secondCalif: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      thirdCalif: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      finalCalif: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      fristTFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      fristTFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      fristTFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      eighthFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      forthFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      semiFinal: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 
      Final: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Match'
      }], 


})
module.exports = mongoose.model('tournament',TournamentSchema)