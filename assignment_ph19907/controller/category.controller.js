var fs = require('fs');
const myModel = require('../models/productModel');


exports.getCategory = async (req, res, next) => {
  var listCategory = await myModel.categoryModel.find().sort({ name: 1 });
  console.log(listCategory);
  res.render("category/category", { listCategory: listCategory });
};


exports.addCategory = async (req, res, next) => {
  let msg = "";
  if (req.method === "POST") {
    let objCategory = new myModel.categoryModel();
    objCategory.name = req.body.name;
    objCategory.des = req.body.des;
    //
    try {
      let newCategory = await objCategory.save();
      console.log(newCategory);
      msg = "Thêm thành công"
    } catch (error) {
      msg = error.message;
      console.log(error);
    }
  }
  res.render("category/add_category", { msg: msg });
}
//
exports.getSearch = async (req, res, next) => {
  var listCategory = await myModel.categoryModel.find();
  const searchQuery = new RegExp(req.query.c, "i");
  try {
    let arrCategory = await myModel.categoryModel.find({
      $or: [{ name: searchQuery }]
    })
    res.render("category/category", { listCategory: arrCategory, searchQuery })
  } catch (error) {

  }

}
