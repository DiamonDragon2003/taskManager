var Dropbox = require('dropbox').Dropbox;
var fetch = require('isomorphic-fetch');
var dbx = new Dropbox({
    accessToken: 'NRpHaixP9bAAAAAAAAAAHE99yBOyOrrUoJ15npn96YuX2vkc8w3Q9oHWXAY1bnGb',
    fetch: fetch
});

exports.get = function (req, res) {
    require('routes/loadRout').load('cabinet', req, res);
}


exports.post = function (req, res) {
    var dataURI = req.body.user.imgData;
    var fileSize = req.body.user.fileSize;

    if(fileSize<=2097152)
    dbx.filesUpload({ path: '/usersImg/'+req.session.user+'.jpg', contents: new Buffer(dataURI, 'base64'), mode: 'overwrite' })
    
    res.status(200);
    res.send(dataURI);
    res.end()



};