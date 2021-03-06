var express = require('express');
var router = express.Router();
const wrap = require('express-async-wrap');
var authController = require('../controllers/AuthController/AuthController');
var registerController = require('../controllers/AuthController/RegisterController');
var TransactionController = require('../controllers/TransactionController');
router.post('/login', function (req, res, next) {
    authController.doLogin(req, res, next);
});

router.get('/logout', function (req, res, next) {
    authController.doLogout(req, res, next)
})

router.post('/register', function (req, res, next) {
    registerController.doRegister(req, res, next)
})

router.get('/verify/:code', function (req, res, next) {
    registerController.doActivate(req, res, next)
})

router.get('/transaction/:activateCode', TransactionController.ConfirmTransaction);

router.get('/forgot/:email', function (req, res, next) {
    authController.sendForgotPasswordMail(req, res, next);
})

router.post('/changepassword/:code', function (req, res, next) {
    authController.changePassword(req, res, next)
})
module.exports = router;