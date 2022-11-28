const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

router.get('/', product.list);

router.post('/:loai', product.categorypost);
router.get('/:loai', product.category);


router.get('/info/:id', product.info);

router.post('/search/All', product.searchPost);
router.get('/search/:key', product.search);




module.exports = router;