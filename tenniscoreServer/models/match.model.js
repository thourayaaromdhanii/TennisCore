const mongoose=require ('mongoose');
const MatchSchema =mongoose.Schema({
      id:String,
    dateDeb:{type : Date,default:Date.now()},
    type:String,
    addby:{
      type : mongoose.Schema.ObjectId,
    },
    tournament: {
        type : mongoose.Schema.ObjectId,
        ref : 'Tournois'
      } , 
      player1: {
        type : mongoose.Schema.ObjectId,
        ref : 'Joueur'
      }, 
      player2: {
        type : mongoose.Schema.ObjectId,
        ref : 'Joueur'
      },
      winner: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Joueur'
      }], 
      score: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Score'
      } ],
      scorect: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Score'
      } ]
})
module.exports = mongoose.model('match',MatchSchema)