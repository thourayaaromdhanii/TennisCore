const jws = require("jsonwebtoken")
const promisify = require("promisify")
const admin=require("../models/admin.model")
const club=require("../models/club.model")
const spectator=require("../models/spectator.model")
const crypto=require("crypto")
const { Admin } = require("mongodb")
var token

exports.protect= async (req,res,next)=>{
try {
    console.log("daz",req.headers.authorization)

if   (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
 jws.verify(token,"pokimonateverywhere",(err,decoded)=>{
     console.log(token)
    console.log("aa",decoded._id)
    
 })

 next()
}

} catch (error) {
res.status(402).json({message : "failed123"})}
}
exports.protectLayer2= async (req,res,next)=>{
const token1=crypto.createHash('sha256').update(token).digest('hex');
console.log( req.params.id,'sefegqer')
 const Admin =await admin.findOne({_id: req.params.id,token:token1})
if (!Admin){res.status(401).json({message : "fail to connect as an admin"})}
else{
    next()
}
} 
exports.protectLayer3= async (req,res,next)=>{
    const token1=crypto.createHash('sha256').update(token).digest('hex');
 const Admin =await admin.findOne({adminId: req.params.adminId,token:token1})

if (Admin.role!="super admin"){res.status(401).json({message : "fail to connect as a super admin"})}
else{
    next()
}
}
exports.protectLayer4= async (req,res,next)=>{
    const token1=crypto.createHash('sha256').update(token).digest('hex');
 const Club =await club.findOne({adminId: req.params.adminId,token:token1})

 if (Club){res.status(401).json({message : "l'utlisateur n' a pas d'acces a cet tache"})}
 else{
     next()
 }
} 
exports.protectLayer5= async (req,res,next)=>{
    const token1=crypto.createHash('sha256').update(token).digest('hex');
 const spectator =await spectator.findOne({adminId: req.params.adminId,token:token1})

 if (spectator){res.status(401).json({message : "l'utlisateur n' a pas d'accées a cet tache"})}
 else{
     next()
 }
} 

