const player = require("../models/player.model");
const tournament = require("../models/tournament.model");
const mach = require("../models/match.model");
const score = require("../models/score.model");
const coach = require("../models/coach.model");
const club = require("../models/club.model");
const crypto = require("crypto"); //moch masbouba par defaut
const decode = require("../utility/decode.controller");

exports.addTournament = async (req, res) => {
  try {
    console.log("here");
    if (
      req.body.name == undefined ||
      req.body.dateDeb == undefined ||
      req.body.dateFin == undefined
    ) {
      message = "Veuillez Remplir le formulaire";
      data = { message };
      res.send({
        data,
      });
    } else {
      Tournament = await tournament.findOne({ name: req.body.name });
      if (Tournament) {
        message = "Tournoi deja Exist";
        data = { message };
        res.send({
          data,
        });
      } else {
        id = await decode.decode(req);
        req.body.addBy = id;
        req.body.dateDeb = new Date(req.body.dateDeb);
        req.body.dateFin = new Date(req.body.dateFin);
        console.log(req.body);
        const newt = await tournament.create(req.body);
        const message = "Tournoi Ajouté";
        data = {
          message,
        };
        res.status(201).json({
          status: "success",
          data,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addMatch = async (req, res) => {
  try {
    console.log(req.body)
    if (
      req.body.dateDeb == undefined ||
      req.body.id == undefined ||
      req.body.player1 == undefined||
      req.body.player2 == undefined
    ) {
      message = "Veuillez Remplir le formulaire";
      data = { message };
      res.send({ data });
    } else {
      Match = await mach.findOne({ id: req.body.id });
      if (Match) {
        message = "Match déja exist";
        data = { message };
        res.send({ data });
      } else {
        id = await decode.decode(req);
        req.body.addBy = id;
        req.body.dateDeb = new Date(req.body.dateDeb);
        Match = await mach.create(req.body);
        const message = "Match Ajouté";
const Tournament = await tournament.findById(req.body.tournament)
        console.log(Tournament,'dfdsf');
        await Tournament.matches.push(Match._id);
        console.log(Tournament.matches);
        await Tournament.save(function (err) {
          if (err) return res.status(500).json(err);
          res.status(201).json(message);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.addCoach = async (req, res) => {
  try {
    id = await decode.decode(req);
    req.body.addBy = id;
    Club = await club.findOne({ email: req.body.club.email });
    Coach = await coach.findOne({ email: req.body.email });
    if (!Coach) {
      Coach = await coach.create(req.body);
    }
    console.log(Coach);
    await Club.coaches.push(Coach._id);
    console.log(Club.coaches, "aa");
    await Club.save(function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json(Coach);
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
exports.addPlayer = async (req, res) => {
  try {
    console.log("here")
    Player = await player.findOne({ id: req.body.id });
    if (Player) {
      console.log(req.body, "here1");
      message = "player deja Exist";
      data = { message };
      res.send({ data });
    } else {
      console.log(req.body, "123thouraya");
      id = await decode.decode(req);
      req.body.addBy = id;
      console.log(req.body, "1");
      Player = await player.create(req.body);
      Club = await club.findById(req.body.club);
      Coach = await coach.findById(req.body.coach);
      console.log(Player);
      await Club.players.push(Player._id);
      console.log(Club.Players, "aa");
      await Club.save();
      await Coach.players.push(Player._id);
      console.log(Coach.players, "aa");
      await Coach.save();
      data={message:"joueur ajouté avec succé"}
      res.status(200).json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

exports.affectScore = async (req, res) => {
  try {
    id = await decode.decode(req);
    req.body.addBy = id;
    Match = await mach.findOne({ id: req.params.id });
    if (!Match) {
      message = "Match n'exist pas";
      data = { message };
      res.send({ data });
    } else {
      req.body.match = Match._id;
      for (i = 0; i < req.body.length; i++) {
        J = await player.findOne({ Name: req.body[i].player.Name });
        M = await mach.findOne({ _id: Match._id, player: J._id });
        if (M) {
          req.body[i].match = M._id;
          req.body[i].player = J._id;
          S = await score.create(req.body[i]);
          Match.score.push(S._id);
          message = "score affectée";
          data = {
            message,
          };
          await Match.save(function (err) {
            if (err) return res.status(500).json(err);
            res.status(201).json(data);
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getListTournament = async (req, res) => {
  try {
    
    const Tournament = await tournament.find();
    data = { Tournament };
    console.log(data)
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error,"aa");
  }
};
exports.getListMatch = async (req, res) => {
  try {
    
    const Matches = await mach.find();
    data = { Matches };
    console.log(data)
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error,"aa");
  }
};
exports.getplayer = async (req, res) => {
  try {
    
    const Player = await player.findById(req.params._id);
    data = { Player };
    console.log(data)
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error,"aa");
  }
};
exports.getListClubByt = async (req, res) => {
  try {
    Tournament = await tournament.findById(req.params._id);
    players_ = [];
    for (i = 0; i < Tournament.matches.length; i++) {
      console.log("........",Tournament.matches[i] )
      M = await mach.findOne({ _id: Tournament.matches[i] });
console.log(M,"__________________________________");
      players_.push(M.player1);
      players_.push(M.player2);
    }
    console.log(players_, "aheaa");
    p_=[]
    for (i = 0; i < players_.length; i++) {
      P = await player.findById(players_[i]);
      p_.push(P);
     
    }
    Club_=[]
    for (i = 0; i < players_.length; i++) {
      c = await club.findById(p_[i].club);
      Club_.push(c);
     
    }
    
    data = { Club_ };
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.getListmatchByt = async (req, res) => {
  try {
    Tournament = await tournament.findOne({ _id: req.params._id });
    Matches = [];
    for (i = 0; i < Tournament.matches.length; i++) {
      M = await mach.findOne({ _id: Tournament.matches[i] });
      Matches.push(M);
    }
    data = { Matches};
    console.log("dfd",data)
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
