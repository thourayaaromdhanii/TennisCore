module.exports=(app)=> {
    const controller=require('../controllers/coach.controller')
    app.post('/coach/singup' ,controller.singIn);
    app.post('/coach/login',controller.login)
}