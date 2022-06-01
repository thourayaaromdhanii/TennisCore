const spectator = require("../models/spectator.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const email = require("../utility/email");

exports.singIn = async (req, res) => {
  Spectator = await spectator.findOne({ email: req.body.email });
  if (Spectator) {
    message = "email exist";
    data = { message };
    res.status(200).json({
      status: "success",
      data,
    });
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    newSpectator = await spectator.create(req.body);
    user = await spectator.findOne({ email: req.body.email });

    const resetToken = user.createResetPassword();

    await user.save({ validateBeforeSave: false });
    message = "spectateur Ajouté";
    data = { message };
    res.status(200).json({
      status: "success",
      data,
    });
  }
};
exports.login = (req, res) => {
  spectator.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      message="email invalid"
      data={message}
      res.status(200).json({
          status: "success",
          data,
        });
    } else {
      //test password validation
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        //if password invalid is match==false
        if (!isMatch) {
          res.send({ message: "password invalid" });
        } else {
          if (user.verified == false) {
            
              message= "votre compte est en cours de verification par un Club",
            
            data={message}
            res.status(200).json({
                status: "success",
                data,
              });
          } else {
            const token = jwt.sign({ _id: user._id }, "pokimonateverywhere", {
              expiresIn: "2d",
            });
            idUser = user._id;
            data = { token, idUser };
            res.status(200).json({
              status: "success",
              data,
            });
            user.token = token;
            user.save((err, user) => {});
          }
        }
      });
    }
  });
};
