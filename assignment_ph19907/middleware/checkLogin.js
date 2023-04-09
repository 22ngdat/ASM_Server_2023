exports.yeu_cau_login = (req, res, next) => {
    if (req.session.userLogin) {
        // có tồn tại sesion login
        next();
    } else {
        return res.redirect('/dat/login')
    }
};

exports.no_yeu_cau_login = (req, res, next) => {
    if (!req.session.userLogin) {
        next();
    } else {
        return res.redirect('/dat/list_products')
    }
};