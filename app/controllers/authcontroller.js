var exports = module.exports = {}

exports.signup = function (req, res) {
    res.render('signup');
}
exports.signin = function (req, res) {
    res.render('signin');
}

exports.uploadpage = function (req, res) {
    res.render('uploadpage');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}