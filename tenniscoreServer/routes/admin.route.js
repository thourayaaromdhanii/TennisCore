module.exports=(app)=> {
    const controller =require('../controllers/admin.controller')
    const middleWear=require('../utility/checkAuth.controller')
    
    app.post('/admin/addAdmin/:_id',middleWear.protect,middleWear.protectLayer2,middleWear.protectLayer3,controller.addAdmin);
    app.post('/admin/login',controller.loginAdmin);
    app.delete('/admin/delete/:id',middleWear.protect,middleWear.protectLayer2,middleWear.protectLayer3,controller.deleteAdmin);
    app.put('/admin/update/:id',middleWear.protect,middleWear.protectLayer2,middleWear.protectLayer3,controller.updateAdmin);
    app.put('/admin/updateProfile/:id',middleWear.protect,middleWear.protectLayer2,controller.updateProfile);
    app.delete('/admin/deleteMe/:id',middleWear.protect,middleWear.protectLayer2,controller.deleteProfile);
    app.get('/admin/list/:id',middleWear.protect,middleWear.protectLayer2,controller.getList ) ;
    app.get('/admin/:id',middleWear.protect,controller.getMe ) ;
    app.post('/admin/verifier/:id',middleWear.protect,middleWear.protectLayer2,controller.verify);
    
}