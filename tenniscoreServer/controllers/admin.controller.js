const admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const club = require("../models/club.model");
const crypto = require("crypto");

exports.addAdmin = async (req, res) => {
  console.log("im hear",req.body);
  try {
    if (
      req.body.password == undefined ||
      req.body.adminId == undefined ||
      req.body.role == undefined ||
      req.body.adminId.length < 5 ||
      req.body.password.length < 5 ||
      req.body.name.length < 5
    ) {
      res.send({ message: "Inscription Echoué" });
    } else {
      req.body.adminId = req.body.adminId.toLowerCase();
      admins = await admin.findOne({ adminId: req.body.adminId });
      if (admins) {
        res.send({ message: "adminId deja Exist" });
      } else {
        console.log("nouveau Admin ", req.params.adminId);
        const Admin = await admin.findOne({ _id: req.params._id });
        await Admin.save({ validateBeforeSave: false });
        req.body.password = await bcrypt.hash(req.body.password, 8);
        A = await admin.create(req.body);s
        res.send({ message: "Admin Ajouté" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.loginAdmin = async (req, res) => {
  console.log("s'identifier admin____________________________");
  try {
    if (
      req.body.adminId == undefined ||
      req.body.password == undefined ||
      req.body.adminId.length < 5 ||
      req.body.password.length < 5
    ) {
      res.send({ message: "Identification Echoué" });
    } else {
      req.body.adminId = req.body.adminId.toLowerCase();
      admin.findOne({ adminId: req.body.adminId }, (err, user) => {
        if (!user) {
          res.send({ message: "adminId invalid" });
        } else {
          //test password validation
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            //if password invalid is match==false
            if (!isMatch) {
              res.send({ message: "MotPasse Invalid" });
            } else {
              console.log(user.token)
              var token = jwt.sign({ _id: user._id }, "pokimonateverywhere", {
                expiresIn: "1h",
              });
              
              console.log(token,"_________________")
              token1 = crypto.createHash("sha256").update(token).digest("hex");
              user.token = token1;
              user.save((err, user) => {console.log(user)});
              idUser = user._id;
              data = {
                idUser,
                token,
              };
              res.status(200).json({
                status: "success",
                data,
              });
            
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(406).json({
      status: "error",
    });
  }
};
exports.getList = async (req, res) => {
  try {
  console.log("'here'")
    admins = await admin.findOne({ _id: req.params.id });
    if (admins.role == "super admin") {
      data = await admin.find();
    } else {
      data = await admin.find({ role: "admin" });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};exports.getMe = async (req, res) => {
  try {
  console.log("'here'")
    data = await admin.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const Admin = await admin.findOne({ adminId: req.body.adminId });
    if (!Admin) {
      const message = "admin n'exist pas";
      data = { message };
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      await admin.findByIdAndDelete(Admin._id);

      message = "supprimé avec succés";
      res.status(200).json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    const Admin = await admin.findOne({ adminId: req.params.adminId });
    if (!Admin) {
      const message = "admin n'exist pas";
      data = { message };
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      await admin.findByIdAndDelete(Admin._id);

      message = "supprimé avec succés";
      data: {
        message;
      }
      res.status(200).json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateAdmin = async (req, res) => {
  console.log("Mise a jour Admin");
  try {
    const Admin = await admin.findOne({ adminId: req.body.adminId });
    if (!Admin) {
      const message = "Admin n'exist pas";
      res.status(200).json({
        status: "success",
        message,
      });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      const newAdmin = await admin.findByIdAndUpdate(Admin._id, req.body);
      const message = "modifié avec succés",
        data = {
          message,
          newAdmin,
        };
      res.status(200).json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateProfile = async (req, res) => {
  console.log("Mise a jour Profile Admin");
  try {
    const Admin = await admin.findOne({ adminId: req.params.adminId });
    if (!Admin) {
      const message = "Admin n'exist pas";
      data = { message };
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      const A = await admin.findByIdAndUpdate(Admin._id, req.body);
      message="modifié avec succés"
data={message}
      res.status(200).json({
        status: "success",
        data
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.verify = async (req, res) => {
  try {
    clubs = await club.findOneAndUpdate(
      { email: req.body.email },
      { verified: true }
    );
    if (clubs) {
      data={clubs}
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      res.status(404).json({
        status: "fail",
      });
    }
  } catch (error) {
    res.status(406).json({
      status: "error",
    });
  }
};
