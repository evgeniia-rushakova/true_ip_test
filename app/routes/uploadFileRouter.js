let uploadFileController = require('../controllers/uploadFileController');
var multer  = require('multer')
var upload = multer({dest:'app/public/uploads'});
module.exports = function(app) {
    app.post('/upload',upload.single('file'), uploadFileController.index);
}