const coach = require("../models/coach.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const email = require("../utility/email");
const { User } = require("parse/lib/browser/Parse");

exports.singIn = async (req, res) => {
  Coach = await coach.findOne({ email: req.body.email });
  if (Coach) {
    res.send({ message: "email exist" });
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    newCoach = await coach.create(req.body);
    user = await coach.findOne({ email: req.body.email });

    const resetToken = user.createResetPassword();

    await user.save({ validateBeforeSave: false });
    message = "Coach Ajouté";
    data = { message };
    res.status(200).json({
      status: "success",
      data,
    });
  }
};
exports.login = (req, res) => {
  coach.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.send({ message: "email invalid" });
    } else {
      //test password validation
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        //if password invalid is match==false
        if (!isMatch) {
          res.send({ status:401,
            message: "password invalid" });
        } else {
    
            if (user.verified==false){
              res.send({status:401,
                message:"votre compte est en cours de verification par un club"})

          
          } else {
            console.log('lala')
            console.log(user,"gfdgfr")
            const token = jwt.sign({ _id: user._id }, "pokimonateverywhere", {
              expiresIn: "2d",
            });
            
            user.token = token;
            user.save((err, user) => {});
            idUser = user._id;
            data={token,
                idUser,}
                console.log(data)
                res.status(200).json({
                  status: "success",
                  data,
                });
          }
        }
      });
    }
  });
};
exports.update = () => {};
