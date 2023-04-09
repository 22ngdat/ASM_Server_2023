const myModel = require('../models/userModel');

let msg = ""

exports.getListUsers = async (req, res, next) => {

  var listUsers = await myModel.usersModel.find().sort({ name: 1 });
  console.log(listUsers);
  res.render("users/list_users", { listUsers: listUsers, msg: msg });
};


exports.getFormAddUser = (req, res, next) => {
  res.render("users/add_users");
}

exports.getSearch = async (req, res, next) => {
  var listUsers = await myModel.usersModel.find();
  const searchQuery = new RegExp(req.query.u, "i");
  try {
    let arrUsers = await myModel.usersModel.find({
      $or: [{ username: searchQuery }]
    })
    res.render("users/list_users", { listUsers: arrUsers, searchQuery })
  } catch (error) {

  }

}

exports.Register = async (req, res, next) => {
  let msg = '';

  if (req.method === 'POST') {
    console.log(req.body);
    //kiem tra hop le
    if (req.body.passwd != req.body.passwd2) {
      msg = "Xác nhận password không đúng"
      return res.render('orther/signup', { msg: msg });
    }
    //
    //lưu cơ sở dữ liệu
    try {
      let objU = new myModel.usersModel();
      objU.fullname = req.body.fullname;
      objU.username = req.body.username;
      objU.phone = req.body.phone;
      objU.email = req.body.email;
      objU.pwd = req.body.passwd;
      objU.role = "Người dùng"
      await objU.save();
      msg = "Đăng kí thành công";
    } catch (error) {
      msg = "Lỗi: " + error.message;
    }
  }
  res.render('other/reg', { msg: msg });
};

exports.Login = async (req, res, next) => {
  let msg = '';
  if (req.method === 'POST') {
    try {
      let objU = await myModel.usersModel.findOne({ username: req.body.username });
      console.log(objU);
      if (objU._id != null) {
        if (objU.pwd == req.body.pwd) {
          // nếu đúng thông tin lưu vào session
          req.session.userLogin = objU;
          // chuyển về trang quản trị
          return res.redirect('/dat/list_products');
        } else {
          msg = "Mật khẩu không đúng"
        }
      } else {
        msg = "Không tồn tại tài khoản " + req.body.username;
      }
    } catch (error) {
      msg = "Không tồn tại tài khoản " + req.body.username;
    }

  };
  res.render('other/login', { msg: msg });
};

exports.Logout = (req, res, next) => {

};