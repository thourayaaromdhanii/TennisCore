const mongoose=require ('mongoose');
const adminSchema =mongoose.Schema({
    adminId:String,
    password:String,
    role:{type:String,default:"admin"},
    name:String,
    email:String,
    token:String
})
module.exports = mongoose.model('admin',adminSchema)