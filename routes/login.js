var User = require('models/user').User;

exports.get = function (req, res) {
    if (!req.session.user) {
        res.render('login', {
            user: false
        });
    } else {
        res.redirect('/cabinet');
    }
}

exports.post = function (req, res) {
    var email = req.body.user.email;
    var password = req.body.user.password;

    User.auth(email, password, function (err, user) {
        if (err) {
            console.log(err);
            return err;
        }
        if (user == 'email not found') {
            res.status(405);
            res.send();
            return;
        }
        if (user == 'err password') {
            res.status(406);
            res.send();
            return;
        }

        req.session.user = user._id;
        res.send({});
        res.end();
    });
};