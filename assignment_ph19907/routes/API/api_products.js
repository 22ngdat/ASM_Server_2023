var express = require('express');
var router = express.Router();
var apiProducts = require('../../controller/api/api_products');
var multer = require('multer');
var fs = require('fs');
var myModel = require('../../models/productModel');
var objReturn = {
    //mẫu đối tượng trả về của api
    status: 1,
    msg: "Oke"
}

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage }).single("imageProduct");

//PRODUCTS 
router.get('/list_products', apiProducts.listProducts);
router.post('/add', async (req, res, next) => {
    // const file = req.file;
    // const imageData = fs.readFileSync(file.path);
    // const base64Image = imageData.toString("base64");
    // const mimeType = file.mimetype;
    // const base64 = `data:${mimeType};base64,${base64Image}`;
    // //các thao tác xử lý ở đây
    const { name, desc, price, category } = req.body;
    const newProduct = new myModel.productModel({
        name,
        desc,
        price,
        category,
        imageProduct: req.body.imageProduct
    });

    try {
        const saveProduct = await newProduct.save();
        objReturn.data = saveProduct;
    } catch (error) {
        objReturn.msg = error.message;
        objReturn.status = 0
    }
    res.json(objReturn);

});
router.put('/update/:id', apiProducts.updateProduct);
router.delete('/del/:id', apiProducts.deleteProduct);

module.exports = router;
