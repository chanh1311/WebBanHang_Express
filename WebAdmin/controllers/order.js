const order = require('../models/order');
const product = require('../models/product');
const users = require('../models/users');
// chua xác nhận
exports.detail_delivery = async (req, res, next) => {
    if(req.user){
        const data = await order.delivery();
        res.render('order/delivery',{data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
    
};






exports.deliverer = async (req, res, next) => { //xác nhận đơn hàng
    if(req.user){
        const id = req.params['id'];
        await order.update(id);
        res.redirect('/order/delivery')
    }else{
        res.redirect('/admin/signIn');
    }
    
};



// lấy đơn hàng đã xác nhận
exports.detail_deliverer = async (req, res, next) => {

    if(req.user){
        const data = await order.get_deliverer();
        res.render('order/deliverer',{data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }
    
};



// Xác nhận đã giao
exports.delivered = async (req, res, next) => {

    if(req.user){
        const id = req.params['id'];
        await order.update_delivered(id);
        // console.log(id);
        res.redirect('back');
    }else{
        res.redirect('/admin/signIn');
    }
    
};

// Hien thi don hang đã giao
exports.delivered_detail = async (req, res, next) => {
    if(req.user){
        const data = await order.get_delivered();
     // console.log(data)
        res.render('order/delivered',{data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }


    
};







// chi tiet san pham cho cac don hang
exports.detail_product_delivery = async (req, res, next) => {
    const id = req.params['id'];
    const ORDER = await order.detail(id);
    const data =[];
    const listId = ORDER.listIdProduct;
    for(var i=0;i<listId.length;i++){
        var PRODUCT = await product.detail(ORDER.listIdProduct[i].id);
        PRODUCT.soLuongMua = ORDER.listIdProduct[i].sl;
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.gia);
        PRODUCT.giaVnd = gia;
        data.push(PRODUCT);
    }
    var tongTienVnd = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ORDER.tongTien); 
    // console.log(data)
    res.render('order/detail',{data,tongTienVnd,user: req.user})
};
exports.detail_product_deliverer = async (req, res, next) => {
    const id = req.params['id'];
    const ORDER = await order.detail(id);
    const data =[];
    const listId = ORDER.listIdProduct;
    for(var i=0;i<listId.length;i++){
        var PRODUCT = await product.detail(ORDER.listIdProduct[i].id);
        PRODUCT.soLuongMua = ORDER.listIdProduct[i].sl;
        PRODUCT.tongTien = ORDER.tongTien;
        
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.gia);
        PRODUCT.giaVnd = gia;

        data.push(PRODUCT);

    }
    var tongTienVnd = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ORDER.tongTien); 
    res.render('order/detail',{data,tongTienVnd,user: req.user})
};

exports.detail_product_delivered = async (req, res, next) => {
    const id = req.params['id'];
    const ORDER = await order.detail(id);
    const data =[];
    const listId = ORDER.listIdProduct;
    for(var i=0;i<listId.length;i++){
        var PRODUCT = await product.detail(ORDER.listIdProduct[i].id);
        PRODUCT.soLuongMua = ORDER.listIdProduct[i].sl;
        PRODUCT.tongTien = ORDER.tongTien;
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.gia);
        PRODUCT.giaVnd = gia;
        await product.updateSoLuongBan(ORDER.listIdProduct[i].id,ORDER.listIdProduct[i].sl);
        await users.updateSoDonHang(ORDER.email);
        data.push(PRODUCT);
    }
    var tongTienVnd = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ORDER.tongTien); 
   
    res.render('order/detail',{data,tongTienVnd,user: req.user})
};



// hủy đơn hàng
exports.delete_product_delivery = async (req, res, next) => {
    const id = req.params['id'];
    await order.delete_order(id);


        // console.log(id);
        const ORDER = await order.detail(id);
        // console.log(ORDER);
        const listProduct = ORDER.listIdProduct;
    
        if(listProduct){
            for (var i = 0; i < listProduct.length; i++) {
                const id = listProduct[i].id;
                const sl = listProduct[i].sl;
                await product.updateSoLuongHuy(id,sl);
            }
        }
       
   
    // console.log(data)
    res.redirect('back');
};

// show đơn hàng bị hủy
exports.show_delete_order = async (req, res, next) => {
    if(req.user){
        const data = await order.get_delete_order();
        res.render('order/deleted',{data,user: req.user})
    }else{
        res.redirect('/admin/signIn');
    }

};