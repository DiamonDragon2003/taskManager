var User = require('models/user').User;

exports.get = function (req, res) {
    if (!req.session.user) {
        res.render('registration', {
            user: false
        });
    } else {
        res.redirect('/cabinet');
    }
}

exports.post = function (req, res) {
    var email = req.body.user.email;
    var username = req.body.user.name;
    var password = req.body.user.password;
    User.registration(username, password, email, function (err, user) {
        if (err) {
            console.log(err);
            return err;
        } else
        if (user == 'email found') {
            res.status(405);
            res.send();
            return;
        } else {
            var dbx = new Dropbox({
                accessToken: 'NRpHaixP9bAAAAAAAAAAHE99yBOyOrrUoJ15npn96YuX2vkc8w3Q9oHWXAY1bnGb',
                fetch: fetch
            });
            dbx.filesGetTemporaryLink({
                    path: '/usersImg/' + user._id + '.jpg'
                })
                .then(function (response) {
                    req.session.userImg = response.link;
                    req.session.user = user._id;
                    res.send({});
                    res.end();
                })
                .catch(function () {
                    req.session.userImg = 'https://dl-web.dropbox.com/get/usersImg/user.svg?_download_id=25779125274392399892137259264535045543511261821216892061534216516&_notify_domain=www.dropbox.com&_subject_uid=683086518&dl=1&w=AAB6-VdeFnF2uAGeusXwRQJYcphBE79qWrbpJA9ZQP43zA';
                    req.session.user = user._id;
                    res.send({});
                    res.end();
                });
        }
    });
};