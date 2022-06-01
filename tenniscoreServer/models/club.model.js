const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment");
const ClubSchema = mongoose.Schema({
  name: String,
    PhoneNumber: String,
    Address: String,
    email: { type: String },
    password: { type: String },
    flagPicture: String,
    token: String,
    resetToken: String,
    expireResetToken: Date,
    poste: {
      poste_title: { type: String, default: "Welcome to our page" },
      poste_head: { type: String, default: "header1" },
      poste_head2: { type: String, default: "header2" },
      poste_paragraph: {
        type: String,
        default:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eos, officia aspernatur ea, possimus doloribus iusto similique molestiae rerum explicabo impedit culpa illum vero laborum voluptates, ab inventore cumque. Tempore?",
      },
      poste_paragraph2: {
        type: String,
        default:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eos, officia aspernatur ea, possimus doloribus iusto similique molestiae rerum explicabo impedit culpa illum vero laborum voluptates, ab inventore cumque. Tempore?",
      },
      poste_image: {
        type: String,
        default:
          "https://firebasestorage.googleapis.com/v0/b/club-1584683000051.appspot.com/o/pic3.jpg?alt=media&token=357a3bc2-c84b-49ec-9d0e-3ced299c5f9e",
      },
      poste_show: { type: Boolean, default: true },
    },
  
    video: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/club-1584683000051.appspot.com/o/Project-1.m4v?alt=media&token=64b3b67c-ff51-4eaf-83ca-acf1299349d8",
    },
    picture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/club-1584683000051.appspot.com/o/pic3.jpg?alt=media&token=357a3bc2-c84b-49ec-9d0e-3ced299c5f9e",
    },
    profilePicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/club-1584683000051.appspot.com/o/panda.jpg?alt=media&token=d51453d9-f792-41e0-af70-655dbeed50a0",
    },
    
    verified: { type: Boolean, default: false },
    dateNow: { type: String, default: moment().format("MMMM-DD-YYYY") },
    yt: String,
    fb: String,
    pictures: [String],
    inst: String,
    city: String,
    videos: [String],
    block:{type:String,default : false},
    coaches: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Coach'
      }], 
      players: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Player'
      }], 

})
ClubSchema.index({ startLocation: "2dshpere" });
//exportation de schema
ClubSchema.methods.createResetPassword = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.expireResetToken = Date.now() + 20 * 60 * 1000;
  console.log(resetToken);
  console.log(this.resetToken);
  return resetToken;
};
module.exports = mongoose.model("club", ClubSchema);
