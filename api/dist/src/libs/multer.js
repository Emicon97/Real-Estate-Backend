"use strict";
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './api/src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
//validando archivo:
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb({ message: 'Formato de archivo no soportado' }, false);
    }
};
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
});
module.exports = upload;
