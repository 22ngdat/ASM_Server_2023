var express = require('express');
var router = express.Router();
var homeController  = require('../controller/home.controller')
// tạo các trang 

//GET 
router.get('/index',homeController.getIndex);


//POST

//bắt buộc
module.exports = router;