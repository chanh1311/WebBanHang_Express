const admin = require('../models/admin');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
    if(req.user){
        res.render('admin/signUp',{user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
};

exports.signUpPost = async (req, res, next) => {
    const body=req.body;
    const account = await admin.get(body.username);
    if (account)
        return res.render('admin/signUp', { message: 'Tài khoản đã tồn tại!' });
    const hashPassword = bcrypt.hashSync(body.password, 10); 
    const data = {
        ten:body.ten,
        diaChi:body.diaChi,
        sdt:body.sdt,
        username:body.username,
        password:hashPassword,
        image: body.image
    }
    await admin.add(data);
    res.render('admin/signUpM',{layout: false});
};

exports.signIn = async (req, res, next) => {
    res.render('admin/signIn',{layout: false,user: req.user})
};

exports.signInPost = async (req, res, next) => {
    const body=req.body;
    const data = await admin.list();
    var count=0;
    for(var i=0;i<data.length;i++){
        if(body.username === data[i].username && bcrypt.compareSync(body.password, data[i].password)) {
            count++;         
            res.redirect('/admin/SignIn');
            return;
        }
    }  
    
    if(count==0){    
        const thongBao="Tên đăng nhập hoặc mật khẩu không chính xác";
        res.render('admin/signIn',{thongBao,user: req.user});
    }   
};


exports.loginPost = async(req, res, next) => {
    var username = req.body.username;
   var password = req.body.password;
//    login empty
   if(username == '' || password == '') res.render('admin/login',{message: 'Account or password cannot be empty!!!'});
   else
    next();
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/signIn');
};


exports.info = async(req, res, next) => {
    // console.log(req.user);
    if(req.user){
        res.render('admin/info', { user: req.user });
    }else{
        res.redirect('/admin/signIn');
    }
};

exports.list = async(req, res, next) => {
    if(req.user){
        const data = await admin.list();
        res.render('admin/list', {data, user: req.user });
    }else{
        res.redirect('/admin/signIn');
    }
    
};



exports.delete_username = async(req, res, next) => {
    if(req.user){
        const id = req.params.id;
        await admin.remove(id);
        res.redirect('back');
    }else{
        res.redirect('/admin/signIn');
    }
    
};



exports.edit_Admin = async(req, res, next) => {
    if(req.user){
        res.render('admin/edit',{user: req.user});
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.change_info = async(req, res, next) => {
    if(req.user){
        const username = req.user.username;

        if(username){
            await admin.update(username, req.body);
            res.redirect('/admin/info');
        }
    }else{
        res.redirect('/');
    }
    
};


