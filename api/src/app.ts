import express from "express";
import morgan from "morgan";
// import cors from 'cors';
const { CORS_URL } = process.env;
const routes = require("./routes/index");

//Para subir múltiples imágenes a cloudinary:
const upload =require('./libs/multer')
const cloudinary = require('./libs/cloudinary')
const fs = require('fs')

const app = express();

app.use(morgan("dev"));
// app.use(cors('*'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token, refresh-token, id"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// app.use((req, res, next) => {
//   next()
// }, cors({ maxAge: 84600 }))
app.use(express.json());

//upload post request:
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

//ruta upload: 
app.use("/uploadimages", upload.array('image'), async (req, res) => {

  const uploader = async (path: string) => await cloudinary.uploads(path, 'Images')

  if (req.method === 'POST') {
    const urls = []
    const files = req.files

    for (const file of files) {
      const { path }= file
      try {
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      } catch (error) {
        console.log(error)        
      }
    }
    res.status(200).json({ message: 'Imágenes subidas correctamente.', data: urls })
  } else {
    res.status(405).json({ err: "No se pudo subir las imágenes." })
  }
})

export default app;
