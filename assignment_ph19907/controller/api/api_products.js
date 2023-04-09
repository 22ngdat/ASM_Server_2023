var objReturn = {
    //mẫu đối tượng trả về của api
    status: 1,
    msg: "Oke"
}
var myModel = require('../../models/productModel');
var multer = require('multer');




//List Products
exports.listProducts = async (req, res, next) => {
    //các thao tác xử lý ở đây
    let listProducts = [];
    try {
        listProducts = await myModel.productModel.find();
        if (listProducts.length > 0) {
            objReturn.data = listProducts;
        } else {
            objReturn.msg = "Không có dữ liệu"
            objReturn.status = 0
        }

    } catch (error) {
        objReturn.msg = error.message;
        objReturn.status = 0
    }
    res.json(objReturn);
}

exports.updateProduct = async (req, res, next) => {
    console.log(req.params.id)
    myModel.productModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
        }
    }).then(result => {
        res.status(200).json({
            updated_product: result
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.deleteProduct = async (req, res, next) => {
    var product = myModel.productModel.find();
    console.log(req.params.id);
    const result = await myModel.productModel.deleteOne({ _id: req.params.id })
    console.log(result);
    res.send("Xoa thanh cong")

};