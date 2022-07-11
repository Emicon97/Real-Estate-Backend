const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req: any, res: any, cb: any) {
        cb (null, './api/src/uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
        cb (null, Date.now() + '-' + file.originalname)
    }
})

//validando archivo:
const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)        
    } else {
        cb ({message: 'Formato de archivo no soportado'}, false)
    }
}

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

module.exports = upload