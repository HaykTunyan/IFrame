var route = require('express').Router();
var save = require('../models/file_model');

route.post('/uploads', (req, res) => {
    var data = req.body;
    if (req.files.file) {
        var file = req.files.file,
            name = file.name;
        var uploadpath = __dirname + '/..' + '/uploads/' + name;
        file.mv(uploadpath, function (err) {
            if (err) {
                console.log(err);
            } else {
                save.insertMany({
                    file_url: uploadpath,
                    file_name: name,
                    name: data.name,
                    embed_url: data.embed_url,
                    iframe_code: data.iframe_code,
                    date: data.date,
                }, function (err, doc) {});
            }
        });
    } else console.log('error');
});


module.exports = route;