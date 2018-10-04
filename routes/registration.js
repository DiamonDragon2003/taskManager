var User = require('models/user').User;

exports.get = function (req, res) {
    if(!req.session.user){
    res.render('registration', {
        user : false
    });}
    else{
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
        }        
        if(user=='email found'){
            res.status(405);
            res.send();
            return;
        }

        req.session.user = user._id;
        res.send({});
        res.end();
    });
};