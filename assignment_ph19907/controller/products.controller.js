const fs = require('fs');
const myModel = require('../models/productModel');

//lấy ra danh sách sản phẩm
let msg = ""
exports.getListProducts = async (req, res, next) => {
  let DieuKienLoc = null;
  if (typeof (req.query.price) != 'undefined') {
    DieuKienLoc = { price: { $gte: req.query.price } }
    // req.query.price }
  }

  var listProducts = await myModel.productModel.find(DieuKienLoc).populate('category', '_id, name').limit(10);
  //Tất cả loại sản phẩm
  var listCategory = await myModel.categoryModel.find();
  //Lấy ra danh sách
  res.render("products/list_products", { listProducts: listProducts, msg: msg, listCategory: listCategory });
};
//search 
exports.getSearch = async (req, res, next) => {
  let listCategory = await myModel.categoryModel.find();
  var listProducts = await myModel.productModel.find().populate('category', '_id, name');
  const searchQuery = new RegExp(req.query.s, "i");
  try {
    let arrProduct = await myModel.productModel.find({
      $or: [{ name: searchQuery }]
    })
    res.render("products/list_products", { listProducts: arrProduct, searchQuery, listCategory: listCategory })
  } catch (error) {

  }

}

//xem chi tiết
exports.getProduct = async (req, res, next) => {
  var product = await myModel.productModel.findById(req.params.id)
    .populate('category', '_id, name');
  res.render("products/detail", { product: product, msg: msg });
};

//thêm sản phẩm
exports.getFormAddProducts = async (req, res, next) => {
  // load list category
  let listCategory = await myModel.categoryModel.find();

  res.render("products/add_product", { listCategory: listCategory });
}


