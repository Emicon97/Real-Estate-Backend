"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// import cors from 'cors';
const { CORS_URL } = process.env;
const routes = require("./routes/index");
//Para subir múltiples imágenes a cloudinary:
const upload = require('./libs/multer');
const cloudinary = require('./libs/cloudinary');
const fs = require('fs');
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
// app.use(cors('*'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token, refresh-token, id");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// app.use((req, res, next) => {
//   next()
// }, cors({ maxAge: 84600 }))
app.use(express_1.default.json());
//upload post request:
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", routes);
//ruta upload: 
app.use("/uploadimages", upload.array('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploader = (path) => __awaiter(void 0, void 0, void 0, function* () { return yield cloudinary.uploads(path, 'Images'); });
    if (req.method === 'POST') {
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            try {
                const newPath = yield uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path);
            }
            catch (error) {
                console.log(error);
            }
        }
        res.status(200).json({ message: 'Imágenes subidas correctamente.', data: urls });
    }
    else {
        res.status(405).json({ err: "No se pudo subir las imágenes." });
    }
}));
exports.default = app;
