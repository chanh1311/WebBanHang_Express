const product = require('../models/product');

exports.index =  async (req, res, next) => {
    if(req.user){
        const data = await product.list();
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }
        res.render('product/index', { data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.add = (req, res, next) => {
    if(req.user){
        res.render('product/add',{user: req.user});
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.addPost = async (req, res, next) => {
    const data = {
        ten:req.body.ten,
        loai:req.body.loai,
        ma:req.body.ma,
        soLuong:Number(req.body.soLuong),
        gia:Number(req.body.gia),
        manHinh:req.body.manHinh,
        cpu:req.body.cpu,
        cameraTruoc:req.body.cameraTruoc,
        cameraSau:req.body.cameraSau,
        ram:req.body.ram,
        rom:req.body.rom,
        theNho:req.body.theNho,
        sim:req.body.sim,
        hinhAnh:req.body.hinhAnh,
        moTa:req.body.description,
        soLuongBan: 0
    }
    await product.add(data);
    res.redirect('./');
};

exports.delete = async (req, res, next) => {
    if(req.user){
        const data = await product.list();
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }
        res.render('product/delete',{ data,user: req.user});
    }else{
        res.redirect('/admin/signIn');
    }
    
   
};

exports.deleteProduct = async (req, res, next) => {
    if(req.user){
        const id = req.params['id'];
        await product.delete(id);
        res.redirect('../delete');
    }else{
        res.redirect('/admin/signIn');
    }

  
};

exports.update = async (req, res, next) => {
    if(req.user){
        const data = await product.list();
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }
         res.render('product/update',{ data,user: req.user});
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.edit = async (req, res, next) => {
    if(req.user){
        const id = req.params['id'];
        const data = await product.detail(id);
        res.render('product/edit',{ data,user: req.user});
    }else{
        res.redirect('/admin/signIn');
    }
    
};

exports.updatePost = async (req, res, next) => {
    const id = req.params['id'];
    const data = {
        ten:req.body.ten,
        loai:req.body.loai,
        ma:req.body.ma,
        soLuong:Number(req.body.soLuong),
        gia:Number(req.body.gia),
        manHinh:req.body.manHinh,
        cpu:req.body.cpu,
        cameraTruoc:req.body.cameraTruoc,
        cameraSau:req.body.cameraSau,
        ram:req.body.ram,
        rom:req.body.rom,
        theNho:req.body.theNho,
        sim:req.body.sim,
        hinhAnh:req.body.hinhAnh
    }
    await product.update(id,data);
    res.redirect('../update');
};

