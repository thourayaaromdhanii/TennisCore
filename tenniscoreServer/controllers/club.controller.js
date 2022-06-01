const club =require('../models/club.model');
const coach =require('../models/coach.model');
const bcrypt = require('bcryptjs')
const crypto = require('crypto') //moch masbouba par defaut
var jwt = require('jsonwebtoken');
const decode=require("../utility/decode.controller")

exports.singIn = async(req,res)=>{
    console.log("salut")
    Club= await club.findOne({email : req.body.email})
    if(Club){
        return res.json({status:404,
          message :"email exist"})
  }else{
      req.body.password= await bcrypt.hash(req.body.password, 8 )
      newClub = await club.create(req.body)
    user= await club.findOne({email : req.body.email})

      const resetToken=user.createResetPassword();
 
  await user.save({validateBeforeSave:false})
  message="club Ajouté"
  data={message}
  return res.json({status:200,
    data,
  });
  }
  }
  exports.login= (req,res)=>
  {
      console.log('im here')
        
       club.findOne({email : req.body.email},(err,user)=>
      {
          if(!user)
          
           {
            return res.json({status:404,
                message: "email invalid"});
           }else
              {
                  
                  //test password validation 
                  bcrypt.compare(req.body.password , user.password,(err,isMatch)=>
                  { 
                  //if password invalid is match==false 
                      if(!isMatch){
                        return res.json({status:404,
                            message: "password invalid"});
                      }else {
                          if(user.verifier==false){
                            return res.json({status:404,
                                "message":"verifier votre compte"})
                          }
                          else {
                              if (user.verified==false){
                                  res.send({status:404,
                                    "message":"votre compte est en cours de verification par un admnistrateur"})
  
                              }
                              
                          
                          else{
                              console.log('lalal')
                     const token=     jwt.sign({_id :user._id},"pokimonateverywhere",{
                         expiresIn : '2d'
                     }) ;
                     iduser=user._id
                     data={token, iduser}
                     res.json({
                         Status:200,
                         data
                     })
                     user.token=token
                     user.save( (err,user)=>{
  
                     })
                  }
                      }
                  }
  
                  })
          
              }
      })
      
  }
exports.verifer=async(req,res)=>{
    try{
        id=await decode.decode(req)
            Coach=await coach.findOneAndUpdate({email : req.body.email, club:id}, {verified:true});
            if(Coach){
                res.status(200).json({
                  status:'success',
                  Coach
                })
                }
                else{
                  res.status(404).json({
                      status:'fail',
                  })
                }
        }

   catch (error) {
    res.status(406).json({
        status:'error'
    })
  }
  }

  exports.ajoutCaoch=async(req,res)=>{
    try {
        id=await decode.decode(req)
        Club= await club.findById(id);
          Coach = await coach.findOne({ email: req.body.email })
          if (!Coach) {
            Coach = await coach.create(req.body)
          }
          console.log(Coach)
          await Club.coachs.push(Coach._id);
          console.log( Club.coachs, "aa")
          await Club.save(function (err) {
            if (err) return res.status(500).json(err);
    
            res.status(201).json(actor);
          });
    
        
      } catch (error) {
        res.json({
          error,
        });
      }  
}
exports.addPlayer=async(req,res)=>{
    try {
        id=await decode.decode(req)
        Club= await club.findById(id);
          Player = await player.findOne({ email: req.body.email })
          if (!Player) {
            Player = await player.create(req.body)
          }
          console.log(Player)
          await Club.players.push(Player._id);
          console.log( Club.players, "aa");
          await Club.save(function (err) {
            if (err) return res.status(500).json(err);
    
            res.status(201).json(actor);
          });
    
        
      } catch (error) {
        res.json({
          error,
        });
      }  
}



 /* 
  exports.getone= async (req,res)=>{
    try{
        token = req.headers.authorization.split(' ')[1]
    const result = await club.findById(req.params._id)

    if(result.token==token){
    res.status(200).json({stauts :'succes',
    data:{
        result
    
    }
    })
}
    else{ res.send("token 8alta")}
}catch(err){res.send("go away")}
}
exports.getoneparent= async (req,res)=>{ //tjib club lil parent ma8ir token verification
    try{
       
    const result = await club.findById(req.params._id).populate({path :'actid',populate:({path:'profid'})})
   const ens =await ense.find({clubid:req.params._id})
  if (result){
    res.status(200).json({stauts :'succes',
    data:{
        result,
        ens
    
    }
    })

  }
}catch(err){console.log(err)}
}
exports.forgetpassword=async(req,res)=>{
  try {
      
 
    const user= await club.findOne({email :req.body.email})  
  if(!user){
      res.send({"message" :"email invalide"})
  }

  const resetToken=user.createresetpasword();
  
  await user.save({validateBeforeSave:false})
  const mailgun = new Mailgun({apiKey: API_KEY , domain: DOMAIN });

  const data = {
      from: 'Club Manager<me@samples.mailgun.org>',
      to: user.email,
      subject: 'club',
      text: 'http://localhost:4200/reset/'+ resetToken
  };

  mailgun.messages().send(data, function (error, body) {
   
  res.send({"message":"email sent"})
     
})
  
} catch (error) {
    console.log(error)
}
}
exports.confirmer=async(req,res)=>{
try {
    

    const hashedtoken=crypto.createHash('sha256').update(req.params._id).digest('hex')
    const user =await club.findOne({
        resetToken : hashedtoken,
        expireResetToken:{$gt : Date.now()}
    });
    
    if (!user){
        res.send({"mesg":"false"})
    }
    else{
    user.verifier=true
    user.resetToken=undefined
    user.expireResetToken=undefined
    await user.save();
    res.send({"mesg":"true"})
    console.log("true")

    }
    
} catch (error) {
    console.log(error)
}
     }
  
 exports.reset=async(req,res)=>{
     try {
         
     
console.log(req.body.password)
const hashedtoken=crypto.createHash('sha256').update(req.params._id).digest('hex')
const user =await club.findOne({
    resetToken : hashedtoken,
    expireResetToken:{$gt : Date.now()}
});
if (!user){
    res.send({"mesg":"try again token expired"})
}
else{
req.body.password= await bcrypt.hash(req.body.password, 8 )

user.password=req.body.password
user.resetToken=undefined
user.expireResetToken=undefined
await user.save();
const message="Votre motdepasse est changé "
res.status(200).json({stauts :'succes',
message

    
    

})
}
} catch (error) {
    console.log(error)
      
}
 }

   
exports.modify= async(req,res)=>
{
    try {
        
  
const result= await club.findByIdAndUpdate(req.params._id,req.body,{new : true})

    
    res.status(200).json({status : 'succes',
result})
} catch (error) {
    console.log(error)

}
}
// exports.login2=async(req,res)=>{

// const Club=await club.findOne({email : req.body.email})
// if(!clubadmin){
//     res.send({"message" : "email invalid"});

// }else {  
//   const match = await bcrypt.compare(req.body.password , clubadmin.password)
// if (!match){
//     res.send({"message" :"password invalid"})
// }
// else {
//     res.send(clubadmin)
// }

// }



// }
exports.upload=async(req,res)=>{
    try {
        
   
    const user =await club.findOne({_id:req.params._id})
    if (user){
        if(req.body.img==1){
              if(user.pictures.length<12){
                                    user.pictures.push(req.body.pic)
                                     await user.save();
                                res.status(200).json({status : 'succes', user})
                                                       } 
               else {
                const message="supprimer une photo pour ajouter un autre"
                 res.status(200).json({status : 'succes',message})
                                     }
    }else if(req.body.img==2){
            if(user.videos.length<12){
                
              user.videos.push(req.body.pic)
              await user.save();
              res.status(200).json({status : 'succes', user})
            } else {
            const message="supprimer une video pour ajouter un autre"
            res.status(200).json({status : 'succes', message})
            }
    }
      
   
}
} catch (error) {
    console.log(error)
    
}
  
}

exports.deltepicture=async(req,res)=>{
    try {
        
   
const user = await club.findById({_id:req.params._id})
if (user){
    if(req.body.deleteindex==1){
    for( var i = 0; i < user.pictures.length; i++){ if ( user.pictures[i] == req.body.pic) user.pictures.splice(i, 1); }
    await user.save();}
    else if(req.body.deleteindex==2){
        for( var i = 0; i < user.videos.length; i++){ if ( user.videos[i] == req.body.pic) user.videos.splice(i, 1); }
        await user.save();}
    

    res.status(200).json({status : 'succes',
      user})
}

} catch (error) {
      console.log(error)  
}
}
exports.choisirpicture=async(req,res)=>{
    try{
    const user = await club.findById({_id:req.params._id})
    if (user){

        if(req.body.numb==1){
        user.picture=req.body.pic
        await user.save();
        }else if(req.body.numb==2){
            user.carousel.splice(0, 1, req.body.pic)

            await user.save();
        }
          else if (req.body.numb==3){
            user.carousel.splice(1, 1, req.body.pic)
              await user.save();
          }
          else if (req.body.numb==4){
            user.carousel.splice(2, 1, req.body.pic)
            await user.save();
        }
        else if (req.body.numb==5){
            user.video=req.body.pic
            await user.save();
        }
        
    res.status(200).json({status : 'succes',
      user})

    }
}catch(err){console.log(err)}
}
exports.postemodifcation=async(req,res)=>{
    try{
    const user = await club.findById({_id:req.params._id})
    if (user){
        if(req.body.num==1)
        {
            user.poste.poste_image=req.body.poste.poste_image
        }
        else if(req.body.num==2){
            user.poste=req.body.poste
        }
        else if(req.body.num==3){
            user.poste.poste_show=req.body.poste.poste_show
        }
        await user.save()
        const poste=user.poste
        res.status(200).json({status : 'succes',
        poste})
    }
}catch(err){
    console.log(err)
}
}
exports.loadconver=async(req,res)=>{
    try {
        conversations=await convers.find({clubid:req.params.clubid}).populate("parentid")
        newconversations=await convers.find({clubid:req.params.clubid,seen:false})
        console.log(newconversations)
        res.status(200).json({
            status:'succes',
            conversations,
            newconversations
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getconversation=async(req,res)=>{
    try{
        if(req.params.converid!=undefined){
            console.log(req.params.converid);
        msg = await messages.find({converid:req.params.converid})
        res.status(200).json({
            status:'succes',
            msg

        })
    }
    }catch(err){
console.log(err);

    }
}
exports.sendmessage=async(req,res)=>{
    try {
        if(req.params.converid){
        conversation=await  convers.findById(req.params.converid)
        conversation.modificationdate=Date.now()
        conversation.dernieremsg=req.body.message
        conversation.seenparent=false
         conversation.lastsender="club"
        await conversation.save()
        req.body.converid=conversation._id
            
            req.body.sender="club"
          msg=  await messages.create(req.body)
            socket.getio().emit('sendmsgpar',{action :'create',msg:msg})
            
        res.status(200).json({
            status:'succes'
        })
    }
    } catch (error) {
        console.log(error)
    }


}
exports.getdemandeinscription=async(req,res)=>{
    try{
    inscriptions=await inscription.find({clubid:req.params.clubid,accepter:false}).populate({path:'enfantid',populate:({path:'parentid'})}).populate('actvid')
    res.status(200).json({
        stauts:'succes',
        inscriptions
    })
    }catch(err){
        console.log(err);
    }
}
exports.verifierinscri=async(req,res)=>{
    try {
        console.log(req.body);
        inscri = await inscription.findByIdAndUpdate(req.body.inscriid,{accepter:req.body.accepter})
        enfant=await enfants.findById(inscri.enfantid)
        actv=await activite.findById(inscri.actvid)   
        console.log(inscri);
        const notification={parentid:enfant.parentid,text:"Votre inscription pour votre enfant " +enfant.nomenf +" "+ enfant.prenomenf + " est accepté  pour l'activite "+ actv.nomactivite +" pour pl1us d'informations contacter le club",enfantimage:actv.imageactvite,
        type:'refuser notification',date:Date.now()}
await notificationparent.create(notification)
socket.getio().emit('notificationparent') 

        res.status(200).json({
            status:'succes',
            
        })
    } catch (error) {
        console.log(error);
    }
  
}
exports.refuser=async(req,res)=>{
    try {
        horaire=true
        console.log(req.body);
        inscri = await inscription.findById(req.body.inscriid)
        enfant=await enfants.findById(inscri.enfantid)
        actv=await activite.findById(inscri.actvid)      
        console.log(inscri);
        const notification={parentid:enfant.parentid,text:"Votre inscription pour votre enfant " +enfant.nomenf +" "+ enfant.prenomenf + " est réfusée  pour l'activite "+ actv.nomactivite +" pour pl1us d'informations contacter le club",enfantimage:actv.imageactvite,
            type:'refuser notification',date:Date.now()}
            console.log(notification);
await notificationparent.create(notification)
        for (var key in actv.horaire) {
            if(actv.horaire[key].time1==true){
                  if(enfant.horaire[key].s1.time==true){
                     enfant.horaire[key].s1.time=false
                     enfant.horaire[key].s1.nomactvitie=null
                  }      
            }
            if(actv.horaire[key].time2==true){
             if(enfant.horaire[key].s2.time==true){
                enfant.horaire[key].s2.time=false
                enfant.horaire[key].s2.nomactvitie=null
     
             }      
       }
       if(actv.horaire[key].time3==true){
         if(enfant.horaire[key].s3.time==true){
            enfant.horaire[key].s3.time=false
            enfant.horaire[key].s3.nomactvitie=req.body.nomactvitie
     
         }      
     }
     if(actv.horaire[key].time4==true){
         if(enfant.horaire[key].s4.time==true){
            enfant.horaire[key].s4.time=false
            enfant.horaire[key].s4.nomactvitie=null
     
         }      
    
     }
     if(actv.horaire[key].time5==true){
         if(enfant.horaire[key].s5.time==true){
            enfant.horaire[key].s5.time=false
            enfant.horaire[key].s5.nomactvitie=null
     
         }      
     }
     if(actv.horaire[key].time6==true){
         if(enfant.horaire[key].s6.time==true){
            enfant.horaire[key].s6.time=false
            enfant.horaire[key].s6.nomactvitie=null
     
         }      
     }
     if(actv.horaire[key].time7==true){
         if(enfant.horaire[key].s7.time==true){
            enfant.horaire[key].s7.time=false
            enfant.horaire[key].s7.nomactvitie=null
     
         }      
     }
     if(actv.horaire[key].time8==true){
         if(enfant.horaire[key].s8.time==true){
            enfant.horaire[key].s8.time=false
            enfant.horaire[key].s8.nomactvitie=null
     
         }      
     }
     if(actv.horaire[key].time9==true){
         if(enfant.horaire[key].s9.time==true){
            enfant.horaire[key].s9.time=false
            enfant.horaire[key].s9.nomactvitie=null
     
         }      
     }
    await enfant.save()
    await inscription.findByIdAndDelete(req.body.inscriid)
     
         }
         socket.getio().emit('notificationparent') 
      

        res.status(200).json({
            status:'succes',
            
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getallinscription=async(req,res)=>{
    try {
        
  
inscriptions=await inscription.distinct('parentid',{clubid:req.params.clubid})
inscriptions=await Parent.find({'_id':{$in:inscriptions}})

res.status(200).json({
    stauts :'succes',
    inscriptions
})
} catch (error) {
    console.log(error);    
}
}
exports.getallchildren = async (req, res) => {
  try {
    inscriptionsenfant = await inscription.find({ parentid: req.params.parentid })
      .populate("enfantid")
      .populate("actvid");
    console.log(inscriptionsenfant);
    res.status(200).json({
      stauts: "succes",
      inscriptionsenfant,
    });
  } catch (error) {
    console.log(error);
  }
};
*/