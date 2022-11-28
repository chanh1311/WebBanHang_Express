const product = require('../models/product');
const comment = require('../models/comment');
const productInPage = 12;

exports.list = async(req, res, next) => {
    const data = await product.list();
    for(var i = 0; i < data.length; i++){
      var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
      data[i].giaVnd = gia;
    }
    res.render('product/list', { data, title: "Cửa hàng", user: req.user });
};
// get
exports.category = async(req, res, next) => {
    const loai = req.params['loai'];
    var value = req.query.sort;
   

    var index = Number(req.query.Page);
    if (isNaN(index))
        index = 1;
      
    var data = [];
    var count = 0;
    var title = "";


    if (loai == "All") {
        switch(value) {
            case '1':
                data = await product.list1Date(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Mới nhất";
              
              break;
            case '2':
                data = await product.list1Asc(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Giá tăng dần";
         
              break;
            case '3':
                data = await product.list1Desc(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Giá giảm dần";
              
              break;
            default:
                data = await product.list1(productInPage, index - 1);
                count = await product.count();
                 title = "Cửa hàng / Mới nhất";
          }

    }

    if (loai == "Apple" || loai == "Samsung" || loai == "Oppo" || loai == "Xiaomi") {
        switch(value) {
            case '1':
                data = await product.categoryDate(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Mới nhất`;
              break;
            case '2':
                data = await product.categoryAsc(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Giá tăng dần`;
              break;
            case '3':
                data = await product.categoryDesc(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Giá giảm dần`; 
              break;
            default:
                data = await product.category(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = loai;
                
          }
        
    }

    for(var i = 0; i < data.length; i++){
      var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
      data[i].giaVnd = gia;
    }
    
    const data1 = [{
        NumOfPage: Number,
        cate: String,
        value: String
    }];
    for (var i = 0; i < count / productInPage; i++) {
        data1[i] = {
            NumOfPage: i + 1,
            cate: req.params['loai'],
            value
        }
    }
    res.render('product/list', { data, data1, index, title, user: req.user,loai});
};


//post
exports.categorypost = async(req, res, next) => {
    const loai = req.params['loai'];
    var value = req.body.sort;
   

    var index = Number(req.query.Page);
    if (isNaN(index))
        index = 1;
      
    var data = [];
    var count = 0;
    var title = "";


    if (loai == "All") {
        switch(value) {
            case '1':
                data = await product.list1Date(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Mới nhất";
              break;
            case '2':
                data = await product.list1Asc(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Giá tăng dần";
              break;
            case '3':
                data = await product.list1Desc(productInPage, index - 1);
                count = await product.count();
                title = "Cửa hàng / Giá giảm dần";
              break;
            default:
                data = await product.list1(productInPage, index - 1);
                count = await product.count();
                 title = "Cửa hàng";
                
          }

    }

    if (loai == "Apple" || loai == "Samsung" || loai == "Oppo" || loai == "Xiaomi") {
        switch(value) {
            case '1':
                data = await product.categoryDate(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Mới nhất`; 
              break;
            case '2':
                data = await product.categoryAsc(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Giá tăng dần`; 
              break;
            case '3':
                data = await product.categoryDesc(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = `${loai} / Giá giảm dần`;  
              break;
            default:
                data = await product.category(loai, productInPage, index - 1);
                count = await product.count1(loai);
                title = loai;
                
          }
        
    }
    for(var i = 0; i < data.length; i++){
      var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
      data[i].giaVnd = gia;
    }
    
    const data1 = [{
        NumOfPage: Number,
        cate: String,
        value: String
    }];
    for (var i = 0; i < count / productInPage; i++) {
        data1[i] = {
            NumOfPage: i + 1,
            cate: req.params['loai'],
            value
        }
    }
    res.render('product/list', { data, data1, index, title, user: req.user,loai});
};

exports.info = async(req, res, next) => {
    const id = req.params['id'];
    const data = await product.detail(id); //Chi tiết sản phẩm
    const data1 = await product.category1(data.loai); //Các sản phẩm liên quan
    const COMMENTS = await comment.list(id);
    const COUNT = await comment.count(id);
    for(var i = 0; i < data.length; i++){
      var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
      data[i].giaVnd = gia;
    }
    res.render('product/info', { data, data1, COMMENTS, COUNT, user: req.user});
};

exports.search = async(req, res, next) => {
    var data;
    const key = req.query.key;
    // console.log(key);
    if(key === ""){
      res.redirect('back');
    }else{

        // const select = Number(req.query.select);
        const sort = req.query.sort;
        
        var index = Number(req.query.Page);
        if(isNaN(index)) index = 1;

        switch(sort) {
            case '1':
                data = await product.searchDate(key, productInPage, index - 1);
                count = await product.countSearchDate(key);
                title = "Tìm kiếm sản phẩm mới nhất";
              break;
            case '2':
                data = await product.searchAsc(key, productInPage, index - 1);
                count = await product.countSearchAsc(key);
                title = "Tìm kiếm giá tăng dần";
              break;
            case '3':
                data = await product.searchDesc(key, productInPage, index - 1);
                count = await product.countSearchDesc(key);
                title = "Tìm kiếm giá giảm dần";
              break;
            default:
                data = await product.search(key, productInPage, index - 1);
                count = await product.countSearch(key);
                title = "Cửa hàng";     
          }

        for(var i = 0; i < data.length; i++){
            var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
            data[i].giaVnd = gia;
        }


        const data1 = [{
            NumOfPage: Number,
            key: String,
            sort: String
        }];
        for (var i = 0; i < count / productInPage; i++) {
            data1[i] = {
                NumOfPage: i + 1,
                key: key,
                sort
            }
        }
        res.render('product/list', { data, data1, index, title: "Tất cả", user: req.user });
        
    };


    }
    


exports.searchPost = async(req, res, next) => {
    const key = req.query.key; //Lấy key từ input
    const sort = req.body.sort;
    var index = Number(req.query.Page);
    if(isNaN(index)) index = 1;
    
    var data = [];
    var count = 0;
    var title = "";


    switch(sort) {
        case '1':
            data = await product.searchDate(key, productInPage, index - 1);
            count = await product.countSearchDate(key);
            title = "Tìm kiếm sản phẩm mới nhất";
          break;
        case '2':
            data = await product.searchAsc(key, productInPage, index - 1);
            count = await product.countSearchAsc(key);
            title = "Tìm kiếm giá tăng dần";
          break;
        case '3':
            data = await product.searchDesc(key, productInPage, index - 1);
            count = await product.countSearchDesc(key);
            title = "Tìm kiếm giá giảm dần";
          break;
        default:
            data = await product.search(key, productInPage, index - 1);
            count = await product.countSearch(key);
            title = "Cửa hàng";
            
      }


      for(var i = 0; i < data.length; i++){
        var gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data[i].gia);
        data[i].giaVnd = gia;
      }
  
    const data1 = [{
        NumOfPage: Number, //chỉ số trang
        key: String //từ khóa cần tìm
    }];
    for (var i = 0; i < count / productInPage; i++) {
        data1[i] = {
            NumOfPage: i + 1,
            key: key,
            sort
        }
    }
    res.render('product/list', { data, data1, index, title, user: req.user});

     // res.send('Hello');
};


