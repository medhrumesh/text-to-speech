// ENV VARIABLES
require('dotenv').config();

// MULTER, MULTER-S3 
const multer = require("multer");
const multerS3 = require("multer-s3");

// AWS 
const aws = require("aws-sdk");
const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_ID,
    Bucket: process.env.AWS_BUCKET_NAME
    // region: "us-east-2",
});

// STORAGE OF USER
const storage = multerS3({
    acl: "public-read",
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: "image" });
    },
    key: function (req, file, cb) {
        console.log("in multer: ");
        console.log(file);
        cb(null, Date.now().toString() + ".png");
    }
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

// DEFINING UPLOAD FRAME
const upload = multer({ storage: storage, fileFilter: fileFilter });

// EXPORT UPLOAD FRAME
module.exports = upload;