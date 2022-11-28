const product = require('../models/product');

exports.index = async (req, res, next) => {
    // console.log(req.user);
    const data = await product.list();
    for(var i = 0; i < data.length; i++){
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
        data[i].giaVnd = gia;
    }
    res.render('index', {data,user: req.user});
};