const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');

router.get('/add/:id', cart.add);

router.get('/delete/:id', cart.delete);

router.get('/list', cart.list);//danh sách sản phẩm trong giỏ hàng
// List update
router.get('/list_update', cart.listUpdate);//danh sách sản phẩm trong giỏ hàng

router.get('/checkout', cart.checkout);//Vào trang mua hàng
router.post('/checkout', cart.checkoutPost);//Xác nhận mua hàng

router.get('/orders', cart.orders);//Danh sách đơn hàng
router.get('/orders/:id', cart.detail_orders);//Danh sách đơn hàng


router.get('/deleteOrders/:id', cart.deleteOrders);//Hủy đơn hàng
router.get('/editAddress/:id', cart.editAddress);//Thay đổi địa chỉ nhận hàng
router.post('/editAddress/:id', cart.editAddressPost);//Xác nhận thay đổi địa chỉ nhận hàng


// cong tru so luong
router.get('/:id/add', cart.addquantity);
router.get('/:id/sub', cart.subquantity);

module.exports = router;