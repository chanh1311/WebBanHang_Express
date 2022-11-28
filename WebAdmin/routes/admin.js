const express = require('express');
const passport = require('passport');
const router = express.Router();
const admin = require('../controllers/admin');

router.get('/signUp', admin.signUp);
router.post('/signUp', admin.signUpPost);

router.get('/signIn', admin.signIn);
router.post('/signIn', admin.loginPost,passport.authenticate('local', { failureRedirect: '/admin/signIn'}),
    function(req, res) {
        res.redirect('/');
    });

module.exports = router;


router.get('/logout', admin.logout);

router.get('/info', admin.info);
router.get('/edit', admin.edit_Admin);
router.post('/edit', admin.change_info);
router.get('/list', admin.list);
router.get('/delete/:id', admin.delete_username);