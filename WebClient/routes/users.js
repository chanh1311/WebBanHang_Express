var express = require('express');
const passport = require('passport');
var router = express.Router();
const users = require('../controllers/users');

router.get('/signUp', users.signUp);
router.post('/signUp', users.signUpPost);

router.get('/login', users.loginGet);
router.post('/login', users.loginPost,passport.authenticate('local', { failureRedirect: '/users/login', failureMessage: true, failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    });



router.get('/logout', users.logout);

router.get('/info', users.info);

router.get('/edit', users.edit);
router.post('/edit', users.editPost);


router.get('/thongbao_doimatkhau',users.changepassmess);

router.get('/changepass',users.changepass);



router.post('/changepass',users.changepassPost
  ,passport.authenticate('local', { failureRedirect: '/users/changepass', failureMessage: true, failureFlash: true }),
   users.changepassPostDB);


module.exports = router;