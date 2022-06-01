module.exports=(app)=> {
    const controller=require('../controllers/user.controller');
    const middleWare=require('../utility/checkAuth.controller')

    app.post('/Tournament/add',middleWare.protect,controller.addTournament);
    app.post('/match/add',middleWare.protect,middleWare.protectLayer4,controller.addMatch);
    app.get('/match/list',middleWare.protect,middleWare.protectLayer4,controller.getListMatch);
    app.post('/player/add',middleWare.protect,controller.addPlayer);
    app.post('/match/:id/affectScore',middleWare.protect,controller.affectScore);
    app.get('/Tournament/:_id/club',middleWare.protect,controller.getListClubByt);
    app.get('/Tournament/:_id/matches',middleWare.protect,controller.getListmatchByt);
    app.get('/Tournament/list',middleWare.protect,controller.getListTournament);
    app.get('/player/:_id',middleWare.protect,controller.getplayer);
    
}