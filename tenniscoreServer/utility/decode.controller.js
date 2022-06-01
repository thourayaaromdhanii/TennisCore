const jwt=require("jsonwebtoken")
exports.decode=async(req)=>{
    console.log(req.authorization,req.headers.authorization.startsWith('Bearer'),"armaz")
    if   (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
const id= jwt.verify(token,"pokimonateverywhere")
console.log(id)
return id._id
    }
}