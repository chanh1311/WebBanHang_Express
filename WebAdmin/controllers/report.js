const report = require('../models/report');
const product = require('../models/product');

exports.top = async (req, res, next) => {
    if(req.user){
        const PRODUCT = await product.list();
        // console.log(PRODUCT)
        for(var i = 0; i < PRODUCT.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT[i].gia);
            PRODUCT[i].giaVnd = gia;
        }
        res.render('report/top',{list: PRODUCT,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
    
};     


exports.product = async (req, res, next) => {
    if(req.user){
        const PRODUCT = await product.list();
        // console.log(PRODUCT)
        for(var i = 0; i < PRODUCT.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT[i].gia);
            PRODUCT[i].giaVnd = gia;
        }
        res.render('report/product',{list: PRODUCT,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
    
};    


 