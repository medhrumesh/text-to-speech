const express = require("express");
const indexR = express.Router();

const path = require("path");
//import modules
const indexC = require("../controller/index.controller");

//multer
const upload = require("../services/index.user");
 
// const upload = multer({ storage: storage, fileFilter : fileFilter});

//upload.single('image')

//apis
indexR.get("/wockhardt", indexC.getM);
indexR.post('/addData', upload.single('image'), indexC.addData);
indexR.get("/getData", indexC.getData); 
indexR.post("/getzsm", indexC.getzsm);
indexR.post("/getrm", indexC.getrm);
indexR.post("/gettm", indexC.gettm);
indexR.post("/gethq", indexC.gethq);
indexR.post("/uploadImg",upload.single("croppedImage"), indexC.uploadImg);
indexR.post("/genVid",upload.single("img"), indexC.genVid);
indexR.get('/str/:url', indexC.str)
indexR.get('/getStream/:url', indexC.getStream)
indexR.get('/stream/:url', indexC.stream)
// indexR.get('/download/:url', indexC.download);
indexR.get('/downloadvideo/:url', function(req, res) {
  try {
    res.header("Content-Type", "video/mp4");
    const file = `./public/videos/${req.params.url}`;
    if(!file) return res.send({status : false, message : "Your session expired. Please create again to download video."})
    res.download(file);
  } catch (error) {
    res.send(error.message)
  }

    /*res.download(file,req.query.file, () => {
         console.log('test')
       fs.unlinkSync(file);
    });*/
});


//export modules
module.exports = indexR;