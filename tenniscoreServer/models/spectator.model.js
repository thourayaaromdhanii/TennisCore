const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment");
const SpectatorSchema = mongoose.Schema({
    name: String,
    PhoneNumber: String,
    email: { type: String },
    password: { type: String },
    token: String,
    resetToken: String,
    expireResetToken: Date,
    profilePicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/club-1584683000051.appspot.com/o/panda.jpg?alt=media&token=d51453d9-f792-41e0-af70-655dbeed50a0",
    },
    
    dateNow: { type: String, default: moment().format("MMMM-DD-YYYY") },
    yt: String,
    fb: String,
    inst: String,
    city: String,
    block:{type:String,default : false},
    
})
SpectatorSchema.index({ startLocation: "2dshpere" });
//exportation de schema
SpectatorSchema.methods.createResetPassword = function () {
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
module.exports = mongoose.model("spectator", SpectatorSchema);
