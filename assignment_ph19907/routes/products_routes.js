var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
const myModel = require('../models/productModel');
var productsController = require('../controller/products.controller');
var checkLogin = require('../middleware/checkLogin');


// tạo lưu trữ ảnh 
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage }).single("imageProduct");
// hêt lưu trữ ảnh

let idUpdate = "";
//GET 
//Get list of products
router.get('/list_products', checkLogin.yeu_cau_login, productsController.getListProducts);
router.get('/detail/:id', productsController.getProduct);


//get add product
router.get('/add_product', checkLogin.yeu_cau_login, async (req, res, next) => {
    let msg = "";
    var listCategory = await myModel.categoryModel.find();
    res.render('products/add_product', { msg: msg, listCategory: listCategory })
})

//get update product
router.get("/update_product/:id", checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";
    let product = await myModel.productModel.findById(req.params.id)
    var listCategory = await myModel.categoryModel.find();
    idUpdate = product._id;
    res.render('products/update_product', { msg: msg, product: product, listCategory: listCategory })
})
//get delete product
router.get("/delete/:id", checkLogin.yeu_cau_login, async (req, res) => {
    try {
        await myModel.productModel.findByIdAndDelete(req.params.id);

    } catch (error) {
        console.log(error);
    }
    res.redirect("/dat/list_products")

})

// // get theo thể loại
router.get("/filter", checkLogin.yeu_cau_login, async (req, res, next) => {
    var listCategory = await myModel.categoryModel.find();

    const category = req.params.category;
    let listProducts = await myModel.productModel.find({ category: category })
    res.render('products/list_products', { listProducts: listProducts, listCategory: listCategory })
})



//Tìm kiếm sản phẩm 
router.get('/search', checkLogin.yeu_cau_login, productsController.getSearch);



//Thêm sản phẩm

//POST
router.post('/add_product', upload, checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";

    const { name, desc, price, category } = req.body;
    const file = req.file;
    const imageData = fs.readFileSync(file.path);
    const base64Image = imageData.toString("base64");
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    const tempProduct = {
        name,
        desc,
        price,
        category,
        imageProduct: base64
    }

    if (await myModel.productModel.collection.insertOne(tempProduct)) {
        msg = "Thêm thành công"
        console.log("Thêm thành công");
    }

    var listCategory = await myModel.categoryModel.find();

    // console.log(tempProduct);
    res.render('products/add_product', { msg: msg, listCategory: listCategory })

});


//update product
router.post("/update_product/:id", upload, checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";

    const { name, desc, price, category } = req.body;
    const file = req.file;
    const imageData = fs.readFileSync(file.path);
    const base64Image = imageData.toString("base64");
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    const tempProduct = {
        name,
        desc,
        price,
        category,
        imageProduct: base64
    }
    try {
        var log = await myModel.productModel.updateOne({ _id: idUpdate }, tempProduct)
        msg = "Sửa thành công"
        console.log(log);
    } catch (error) {
        msg = "Lỗi"
        console.log(error);
    }

    //
    let product = await myModel.productModel.findById(req.params.id)
    var listCategory = await myModel.categoryModel.find();
    res.render('products/update_product', { msg: msg, product: product, listCategory: listCategory })
    // console.log(tempProduct);
    // res.redirect('/dat/update_product');
});

// DELETE PRODUCT

//bắt buộc
module.exports = router;