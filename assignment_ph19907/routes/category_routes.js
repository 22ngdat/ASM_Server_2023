var express = require('express');
var router = express.Router();
var categoryCtrler = require('../controller/category.controller')
const myModel = require('../models/productModel');
var checkLogin = require('../middleware/checkLogin');

// tạo các trang 

//GET 
let idUpdate = ""

router.get('/search-category', checkLogin.yeu_cau_login, categoryCtrler.getSearch);
router.get('/category', checkLogin.yeu_cau_login, categoryCtrler.getCategory);
router.get('/add_category', checkLogin.yeu_cau_login, categoryCtrler.addCategory);

router.get("/update-category/:idsp", checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";
    let product = await myModel.categoryModel.findById(req.params.idsp)
    idUpdate = product._id;
    res.render('category/update-category', { msg: msg, product: product })
})

//POST
router.post('/add_category', checkLogin.yeu_cau_login, categoryCtrler.addCategory)

router.post("/update-category/:idsp", checkLogin.yeu_cau_login, async (req, res, next) => {
    let msg = "";
    const { name, des } = req.body;
    const tempCategory = {
        name,
        des
    }
    try {
        var log = await myModel.categoryModel.updateOne({ _id: idUpdate }, tempCategory)
        msg = "Sửa thành công"
        console.log(log);
    } catch (error) {
        msg = "Lỗi"
        console.log(error);
    }
    let product = await myModel.categoryModel.findById(req.params.idsp)
    res.render('category/update-category', { msg: msg, product: product })

});

//delete category
router.get("/delete-category/:id", checkLogin.yeu_cau_login, async (req, res) => {
    try {
        await myModel.categoryModel.findByIdAndDelete(req.params.id);

    } catch (error) {
        console.log(error);
    }
    res.redirect("/dat/category")
})

//bắt buộc
module.exports = router;