module.exports=(app)=> {
    const controller=require('../controllers/club.controller');
    const middleWear=require('../utility/checkAuth.controller')
    app.post('/club/singup' ,controller.singIn);
    app.post('/club/login',controller.login);
    app.post('/club/verifier',middleWear.protect,controller.verifer);
    
}