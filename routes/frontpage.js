exports.get = function (req, res) {
    require('routes/loadRout').load('frontpage', req, res);
}