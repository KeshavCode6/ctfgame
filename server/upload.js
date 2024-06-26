const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
            callback(null, true);
        } else {
            callback(new Error('Only JPG or PNG allowed.'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 4
    }
});

module.exports = upload;
