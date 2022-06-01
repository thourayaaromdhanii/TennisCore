module.exports=(app)=> {
    const controller=require('../controllers/spectator.controller')
    app.post('/spectator/singIn' ,controller.singIn);
    app.post('/spectator/login',controller.login)
}