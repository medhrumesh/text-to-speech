// MULTER, PATH
const path = require("path");
const multer = require("multer");


// STORAGE OF FRAME
const storageframe = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'public/frame/'));
    },
    filename: (req, file, cb) => {
        if (path.extname(file.originalname)) {
            cb(null, Date.now() + path.extname(file.originalname));
        } else {
            cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
        }
    },
});

// FILE FILTER
const fileFilterframe = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// DEFINING UPLOAD FRAME
const uploadframe = multer({ storage: storageframe, fileFilter: fileFilterframe });

// EXPORT UPLOAD FRAME
module.exports = uploadframe;