var User = require('models/user').User;


module.exports.load = function (nameLoad, req, res) {
    User.findOne({
        _id: req.session.user
    }, function (err, result) {
        if (result)
            res.render(nameLoad, {
                user: {
                    id: req.session.user,
                    name: result.username,
                    email: result.email,
                    img: req.session.userImg
                }
            })
        else res.render(nameLoad, {
            user: false
        })
    })
};