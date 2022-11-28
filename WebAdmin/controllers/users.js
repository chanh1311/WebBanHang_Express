const user = require('../models/users');

exports.list = async (req, res, next) => {
    if(req.user){
        const data = await user.list();
        res.render('users/list', { data,user: req.user })
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.lock_list = async (req, res, next) => {
    if(req.user){
        const data = await user.list();
        res.render('users/lock_list', { data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
   
};

exports.lock = async (req, res, next) => {
    if(req.user){
        const id = req.params['id'];
        const detail = await user.detail(id);
        await user.addLock(detail);
        await user.delete(id);
        res.redirect('/users/lock_list');
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.unlock_list = async (req, res, next) => {
    if(req.user){
        const data = await user.listLock();
        res.render('users/unlock_list', { data,user: req.user })
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.unlock = async (req, res, next) => {
    if(req.user){
        const id = req.params['id'];
        const user_lock = await user.user_lock(id);
        await user.add(user_lock);
        await user.deleteLock(id);
        res.redirect('/users/unlock_list');
    }else{
        res.redirect('/admin/signIn');
    }
    
};