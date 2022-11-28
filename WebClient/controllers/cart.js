const cart = require('../models/cart');
const order = require('../models/order');
const product = require('../models/product');

exports.add = async(req, res, next) => {
    const idProduct = req.params['id'];
    const USER = req.user;
    var productId = [];
    if (USER) {
        productId = await cart.detailCart(idProduct);
        var PRODUCT = await product.detail(idProduct);
        if(PRODUCT.soLuong > 0){
            if(productId === undefined || productId.length == 0) {
                // console.log(productId)
                await cart.add(USER.email, idProduct);
            }else{
                await cart.addSl(idProduct);
            }
        }
        res.redirect('back');
    } else {
        res.redirect('../../users/login');
    }

};

exports.delete = async(req, res, next) => {
    const idProduct = req.params['id'];
    const USER = req.user;
    if (USER) {
        await cart.delete(idProduct);
    }
    res.redirect('/cart/list_update'); //redirect chuyen url đến trang nào đó, render thì render ra 1 trang!
};

exports.list = async(req, res, next) => {
    const USER = req.user;
    var data = []; //Danh sách chi tiết các sản phẩm trong giỏ hàng
    if (USER) {
        const LIST = await cart.list(USER.email); //Lấy ra danh sách các sản phẩm trong giỏ hàng của user
        const count = LIST.length;
        for (var i = 0; i < count; i++) {
            const PRODUCT = await product.detail(LIST[i].idProduct)
            data.push(PRODUCT);
        }
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }
    }
    res.render('cart/list', { data, user: USER });
};
//
exports.listUpdate = async(req, res, next) => {
    const USER = req.user;
    var data = []; //Danh sách chi tiết các sản phẩm trong giỏ hàng
    if (USER) {
        const LIST = await cart.list(USER.email); //Lấy ra danh sách các sản phẩm trong giỏ hàng của user
        const count = LIST.length;
        for (var i = 0; i < count; i++) {
            const PRODUCT = await product.detail(LIST[i].idProduct)
            PRODUCT.soLuongMua = LIST[i].soLuongMua;
            data.push(PRODUCT);
            // console.log(PRODUCT)
        }
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }
    }
   res.render('cart/listUpdate',{data, user: USER});
};

exports.checkout = async(req, res, next) => {
    const USER = req.user;
    var data = []; //Danh sách chi tiết các sản phẩm trong giỏ hàng
    var total = 0; //Tổng tiền
    if (USER) {
        const LIST = await cart.list(USER.email);//Lấy ra danh sách các sản phẩm trong giỏ hàng của user
        if (LIST === undefined || LIST.length == 0) {
            res.redirect('back');
        }
        const count = LIST.length;
        for (var i = 0; i < count; i++) {
            const PRODUCT = await product.detail(LIST[i].idProduct)
            const PRODUCTCART = await cart.detailCart(LIST[i].idProduct)
            PRODUCT.soLuongMua = PRODUCTCART.soLuongMua;
            PRODUCT.tongTien = PRODUCT.soLuongMua * PRODUCT.gia;
            data.push(PRODUCT);
            total = total + (PRODUCT.tongTien);
            var totalVnd = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
        }
        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            var tongTien = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].tongTien);
            data[i].giaVnd = gia;
            data[i].tongTienVnd = tongTien;
        }
    }else{
        res.redirect('/users/login');
    }
    res.render('cart/checkout', { data, totalVnd, user: USER });
};

exports.checkoutPost = async(req, res, next) => {
    const USER = req.user;
    if (USER) {
        const arrIdProduct = []; //Mảng chứa id các sản phẩm sẽ được đưa vào đơn hàng
        const LIST = await cart.list(USER.email);
        console.log(LIST)
        const count = LIST.length;
        var id,sl,proDuct,giaSanPham;
        var total = 0;
        for (var i = 0; i < count; i++) {
            id = LIST[i].idProduct;
            proDuct = await product.detail(LIST[i].idProduct);
            giaSanPham = proDuct.gia;
            sl = LIST[i].soLuongMua;
            total += giaSanPham * sl;
            
            arrIdProduct.push({'id': id,'sl': sl})
            await product.updateSoLuong(id,sl);
        }
        
        // console.log(total)

        const currentdate = new Date(); //Lấy ngày giờ mua hàng
        const datetime = currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();

        const data = { //Đơn hàng
            email: USER.email,
            nguoiNhan: req.body.ten,
            sdtNguoiNhan: req.body.sdt,
            diaChiNhan: req.body.diaChi,
            listIdProduct: arrIdProduct,
            time: datetime,
            trangThai: false,
            tongTien: total
        }
        await order.add(data);

        for (var i = 0; i < count; i++) { //Xóa các sản phẩm khỏi giỏ hàng
            await cart.delete(LIST[i].idProduct);
        }
    }
    res.redirect('/cart/orders');
};

exports.orders = async(req, res, next) => {
    const USER = req.user;
    var value = Number(req.query.value); 
    var data = [];
    var ORDER;
    if (USER) {
        switch(value){
            case 1: {
                ORDER = await order.listChuaXacNhan(USER.email)
                break;

            }
            case 2: {
                ORDER = await order.listDaXacNhan(USER.email)
                break;
            }
            case 3: {
                ORDER = await order.listDaGiaoHang(USER.email)
                break;
            }
            case 4: {
                ORDER = await order.listHuy(USER.email)
                break;
            }
            default: ORDER = await order.list(USER.email)
        }
        data = ORDER;
        for (var i = 0; i < data.length; i++) {
            
            var LISTPRODUCT = [];
            for (var j = 0; j < data[i].listIdProduct.length; j++) {
                var sl = data[i].listIdProduct[j].sl
                var PRODUCT = await product.detail(data[i].listIdProduct[j].id)
                PRODUCT.soLuongMua = sl;
                LISTPRODUCT.push(PRODUCT);
            }
            data[i].listProduct = LISTPRODUCT;
            data[i].soLuongSanPham = data[i].listProduct.length;

            var tongTien = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].tongTien);
            data[i].tongTienVnd = tongTien;
        }
        
    }
    
    res.render('cart/orders', { data, user: USER });
};

exports.detail_orders = async(req, res, next) => {
    const USER = req.user;
    const id = req.params['id'];
    const data = await order.detail(id);
    var LISTPRODUCT = [];
    for (var i = 0; i < data.listIdProduct.length; i++) {
        var sl = data.listIdProduct[i].sl
        var PRODUCT = await product.detail(data.listIdProduct[i].id)
        PRODUCT.soLuongMua = sl;
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.gia);
        PRODUCT.giaVnd = gia;
        LISTPRODUCT.push(PRODUCT);
    }
    data.listProduct = LISTPRODUCT;
    
    var tongTien = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.tongTien);
    data.tongTienVnd = tongTien;
   

    res.render('cart/orders-detail', { data, user: USER });
};



exports.deleteOrders = async(req, res, next) => {
    const id = req.params['id'];
    await order.delete(id);

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
   

    res.redirect('/cart/orders');
};

exports.editAddress = async(req, res, next) => {
    const USER = req.user;
    const id = req.params['id'];
    const data = await order.detail(id);

   
    res.render('cart/editAddress', { data, user: USER });
};

exports.editAddressPost = async(req, res, next) => {
    const id = req.params['id'];
    await order.updateAddress(id, req.body.nguoiNhan, req.body.sdtNguoiNhan, req.body.diaChiNhan);
    res.redirect('../orders');
};


// cong tru soluong

exports.addquantity = async(req, res, next) => {

    const USER = req.user;
    const id = req.params['id'];
    var productId = [];
    var productCart = [];
    var soLuongMua = 1

    productId = await product.detail(id);
    productCart = await cart.detailCart(id);
    soLuongMua = productCart.soLuongMua;

    // console.log(productId);
    // console.log(productCart);
    if(soLuongMua >= productId.soLuong){
        
        // const message = 'Số lượng mua đã đạt mức tối đa!'
        res.redirect('back');
        
    }else{
        await cart.addSl(id);
        res.redirect('back');
    }
    
};


exports.subquantity = async(req, res, next) => {

    const USER = req.user;
    const id = req.params['id'];
    var productCart = [];
    var check = 1;
    productCart = await cart.detailCart(id);
    if(productCart.soLuongMua == check){
        res.redirect('back');
        // const message = 'Số lượng mua không được nhỏ hơn 1!'
        // res.render('cart/listUpdate',{user: USER,message: "Số lượng sản phẩm có thể mua không thể nhỏ hơn 1!"});
       
    }else{
    
    await cart.subSl(id);
    res.redirect('back');
    }

};