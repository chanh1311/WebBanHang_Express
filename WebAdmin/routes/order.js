const express = require('express');
const router = express.Router();
const order = require('../controllers/order');



router.get('/delivery/detail/:id', order.detail_product_delivery);// xem danh sach sản phẩm trong đơn hàng chưa xác nhận
router.get('/delivery', order.detail_delivery);//Các đươn hàng chưa xác nhận
router.get('/delivery/delete/:id', order.delete_product_delivery); // hủy đơn hàng

router.get('/deliverer/detail/:id', order.detail_product_deliverer);//chi tiết sản phẩm của đơn hàng đã xác nhận
router.get('/deliverer/:id', order.deliverer);//Xác nhận đơn hàng
router.get('/deliverer', order.detail_deliverer);//Lấy các đơn hàng đã xác nhận


router.get('/delivered/detail/:id', order.detail_product_delivered);//chi tiết sản phẩm của đơn hàng đã xác nhận
router.get('/delivered/:id', order.delivered); // xác nhận đã giao hàng
router.get('/delivered', order.delivered_detail);// lấy đơn hàng đã giao


router.get('/show-delete', order.show_delete_order); // Xem đơn hàng hủy

module.exports = router;