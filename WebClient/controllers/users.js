const user = require('../models/users');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

exports.signUp = async(req, res, next) => {
    res.render('users/signUp');
};

exports.signUpPost = async(req, res, next) => {
    const account = await user.get(req.body.email);
    const email = req.body.email;
    const password = req.body.password;
    if (email === '' || password === ''){
        return res.render('users/signUp', { message: 'Tài khoản hoặc mật khẩu không được để trống!' });
    }
    if (account)
        return res.render('users/signUp', { message: 'Tài khoản đã tồn tại!' });
    const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    const data = {
        ho: req.body.ho,
        ten: req.body.ten,
        diaChi: req.body.diaChi,
        tp: req.body.tp,
        sdt: req.body.sdt,
        email: req.body.email,
        imageUrl: req.body.imageurl,
        password: hashPassword
    }
    await user.add(data);
    res.render('users/sinhUpM');
};

exports.loginGet = async(req, res, next) => {
    var message = req.flash('message')
    res.render('users/login', { message });
};


exports.loginPost = async(req, res, next) => {
    var email = req.body.email;
   var password = req.body.password;
//    login empty
   if(email == '' || password == '') res.render('users/login',{message: 'Account or password cannot be empty!!!'});
   else
    next();
}









exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.info = async(req, res, next) => {
    res.render('users/info', { user: req.user });
};

exports.edit = async(req, res, next) => {
    res.render('users/edit', { user: req.user });
};

exports.editPost = async(req, res, next) => {
    const email = req.user.email;
    if(email){
        await user.update(email, req.body);
        res.redirect('info');
    }
};

exports.changepass = async(req, res, next) => {
    const user = req.user;
    var message = req.flash('message')
    // await user.changepass(req.user.email,req.body.password);
    res.render('users/changepass',{user,message});
};

exports.changepassPost = async(req, res, next) => {
    var email = req.body.email;
    var pass =  req.body.password;
    var newpass = req.body.newpassword;
    var repass =  req.body.repassword;
   
    if(email == '' || pass == '' || newpass == '' || repass == null)
        res.render('users/changepass',{message: 'Hãy nhập đầy đủ thông tin!!!'})
    else if(newpass != repass){
        res.render('users/changepass',{message: 'Mật khẩu mới không trùng nhau!!!'})
    }else{
      next();
    }
};


exports.changepassPostDB = async(req, res) => {
    // console.log(req.body.email)
    // console.log(req.body.newpassword)
    await user.updatePass(req.body.email, req.body.newpassword);
    res.redirect('/users/thongbao_doimatkhau');
};

exports.changepassmess = async(req, res,next) => {
    res.render('users/passmessage');
};