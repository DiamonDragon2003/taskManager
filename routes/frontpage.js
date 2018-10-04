var User = require('models/user').User;


exports.get = function (req, res) {

    User.findOne({
        _id: req.session.user
    }, function (err, result) {
        if (result)
            res.render('frontpage', {
                user: {
                    id: req.session.user,
                    name: result.username,
                    email: result.email
                }
            })
        else res.render('frontpage', {
            user: false
        })
    })
}