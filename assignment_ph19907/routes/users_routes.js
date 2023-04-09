var express = require('express');
var router = express.Router();
var usersController = require('../controller/users.controller')
const myModel = require('../models/userModel');
var checkLogin = require('../middleware/checkLogin');


let idUpdate = ""
router.use((req, res, next) => {
    console.log("Đã gọi middleware");
    next()
})
//GET
router.get('/search_users', checkLogin.yeu_cau_login, usersController.getSearch);
router.get('/list_users', checkLogin.yeu_cau_login, usersController.getListUsers);
router.get('/add_users', checkLogin.yeu_cau_login, async (req, res, next) => {
    let msg = "";

    res.render('users/add_users', { msg: msg })
})
//GetUpdate
router.get("/update-users/:iduser", checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";
    let user = await myModel.usersModel.findById(req.params.iduser)
    idUpdate = user._id;
    res.render('users/update-users', { msg: msg, user: user })
})
//GetDelete
router.get("/delete-users/:id", checkLogin.yeu_cau_login, async (req, res) => {
    try {
        await myModel.usersModel.findByIdAndDelete(req.params.id);

    } catch (error) {
        console.log(error);
    }
    res.redirect("/dat/list_users")
})

//POST
router.post('/add_users', checkLogin.yeu_cau_login, async (req, res) => {
    let msg = "";
    const { fullname, username, phone, role, email, pwd } = req.body;
    const tempUser = {
        fullname,
        username,
        phone,
        role,
        email,
        pwd
    }

    if (await myModel.usersModel.collection.insertOne(tempUser)) {
        msg = "Thêm thành công"
    }
    res.render('users/add_users', { msg: msg })

});
//Update

router.post("/update-users/:iduser", checkLogin.yeu_cau_login, async (req, res, next) => {
    let msg = "";
    const { fullname, username, phone, role, email, pwd } = req.body;
    const tempUser = {
        fullname,
        username,
        phone,
        role,
        email,
        pwd
    }

    try {
        var log = await myModel.usersModel.updateOne({ _id: idUpdate }, tempUser)
        msg = "Sửa thành công"
        console.log(log);
    } catch (error) {
        msg = "Lỗi"
        console.log(error);
    }
    let user = await myModel.usersModel.findById(req.params.iduser)
    res.render('users/update-users', { msg: msg, user: user })

});
//Register 
router.get('/reg', usersController.Register);
router.post('/reg', usersController.Register);
//Login
router.get('/login', usersController.Login);
router.post('/login', usersController.Login);

router.get('/logout', usersController.Logout);


// bat buoc
module.exports = router;