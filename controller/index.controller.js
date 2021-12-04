var sizeOf = require("image-size");
const videoshow = require("videoshow");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const fs = require("fs");
const { exec } = require("child_process");
// import model
const Doctor = require("../models/user.model");
const tojson = require("./tojson");
const csv = require("csvtojson");
const aws = require('aws-sdk')
const path = require('path')
const mime = require('mime');
const request = require('request')
var util = require('util');
const getM = (req, res) => {
  res.render("index");
  // res.render("home");
};
var videoList = {};
var del_img = [];
const addData = async (req, res) => {
  try {
    console.log("in addData" + req.body.language, req.body.doctor_name);
    console.log("file: >> " + req.file);
    console.log(req.body)
    const doctor = new Doctor(req.body);
    // {
    //   divsion: req.body.divsion,
    //   ZSM: req.body.ZSM,
    //   RM: req.body.RM,
    //   TM: req.body.TM,
    //   HQ: req.body.HQ,
    //   language: req.body.language,
    //   doctor_name: req.body.doctor_name,
    //   hospital_name: req.body.hospital_name,
    //   hospital_address: req.body.hospital_address,
    //   city: req.body.city,
    //   image: req.file.filename,
    // }
    console.log("before if");
    videoList.language = doctor.language;
    if (typeof req.file !== "undefined") {
      console.log(req.file);
      doctor.image = req.file.key;
    } else {
      // 1614069405443.jpeg
      console.log("in typeof file : eles > 1614069405443.jpeg");

      doctor.image = "yoga_day_default.png";

    }
    console.log("aftere if");
    // console.log("file name: > " + req.file.filename);
    // await doctor.save((err, docs) => {
    // if (err) throw new Error("error in save");
    // if (docs) {
    //  path.join(process.cwd(), "/public/uploads/");
    // var dimensions = sizeOf(
    //   process.cwd() + "/public/uploads/" + docs.image
    // );
    // console.log(dimensions.width, dimensions.height);

    // res.send({ok:true});

    // console.log("filenaem in file: " + docs.image);
    const docs = await doctor.save()
    console.log("docs: " + docs);
    res.send({
      ok: true,
      body: docs,
      //   image: docs.image,
      // iw: dimensions.width,
      // ih: dimensions.height,
      // });
      //   body: docs,
      //   file: docs.file,
      //   iw: dimensions.width,
      //   ih: dimensions.height,
      // }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};


const getTmDr = async (req, res) => {
  try {

  } catch (error) {

  }
}
const uploadImg = async (req, res) => {
  try {
    console.log("in upload img");
    console.log("req file  : " + JSON.stringify(req.file));
    let file_name;
    if (req.file === "undefined") {
      throw new Error("error in upload img");
    } else {
      file_name = req.file.filename;
      var del_img_path = process.cwd() + "/public/uploads/" + file_name;
      del_img.push(del_img_path);
    }
    setTimeout(() => {
      console.log("in setinterval")
      del_img.forEach((crop_img) => {
        console.log("in foreach");
        if (fs.existsSync(crop_img)) {
          fs.unlink(crop_img, (err) => {
            if (err) throw err;
            console.log(crop_img + " was deleted");
          });
        }
      });
      del_img.length = 0;
    }, 20000);
    // var doctor = new Doctor();
    console.log("while saving-->  " + file_name);
    // doctor.croped_file = file_name
    console.log("after saving-->  " + file_name);
    res.send({
      ok: true,
      result: "res",
      url: "/demo",
      croped_file: file_name,
    });
    // doctor.save((err, doc) => {
    //   console.log("in save");
    //   if (err) return console.log("{ success: false, msg: err.message }");
    //   console.log("success in upload: -->  " + doc);
    //   // res.json({ok:true});
    //   res.send({
    //     ok: true,
    //     result: "res",
    //     url: "/demo",
    //     croped_file: doc.croped_file,
    //     del_img : del_img
    //   });
    // });
  } catch (err) {
    // , data: doc.croped_file
    res.status(500).json({
      message: err.message,
    });
  }
}

const getData = async (req, res) => {
  try {
    var docs = await Doctor.find().select('-image');
    if (docs) {
      res.status(200).json({
        success: true,
        Data: docs,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getzsm = async (req, res) => {
  try {
    if (req.body.division == "Diabetes" || req.body.division == "Metabolic") {
      var csvFilePath = __dirname + "/" + req.body.division + ".csv";
      const jsonObj = await csv().fromFile(csvFilePath);
      var zsmdata = tojson.ZSM(jsonObj, "div");
      res.send({ ok: true, data: zsmdata });
    } else {
      res.send({ ok: true, data: null });
    }
  } catch (error) {
    console.log("error @GET ZSM ################################" + error.message);
  }
};

const getrm = async (req, res) => {
  try {
    if (req.body.division == "Diabetes" || req.body.division == "Metabolic") {
      var csvFilePath = __dirname + "/" + req.body.division + ".csv";
      const jsonObj = await csv().fromFile(csvFilePath);
      var rmdata = tojson.RM(jsonObj, req.body.zsm);
      res.send({ ok: true, data: rmdata });
    } else {
      res.send({ ok: true, data: null });
    }
  } catch (error) {
    console.log("error @GET RM ################################" + error.message);
  }
};

const gettm = async (req, res) => {
  try {
    if (req.body.division == "Diabetes" || req.body.division == "Metabolic") {
      var csvFilePath = __dirname + "/" + req.body.division + ".csv";
      const jsonObj = await csv().fromFile(csvFilePath);
      var tmdata = tojson.TM(jsonObj, req.body.zsm, req.body.rm);
      res.send({ ok: true, data: tmdata });
    } else {
      res.send({ ok: true, data: null });
    }
  } catch (error) {
    console.log("error @GET TM ################################" + error.message);
  }
};

const gethq = async (req, res) => {
  try {
    if (req.body.division == "Diabetes" || req.body.division == "Metabolic") {
      var csvFilePath = __dirname + "/" + req.body.division + ".csv";
      const jsonObj = await csv().fromFile(csvFilePath);
      var hqdata = tojson.HQ(jsonObj, req.body.zsm, req.body.rm, req.body.tm);
      res.send({ ok: true, data: hqdata });
    } else {
      res.send({ ok: true, data: null });
    }
  } catch (error) {
    console.log("error @GET HQ ################################" + error.message);
  }
};

// const gTTS = require('gtts');
const say = require('say')
const textToSpeech = require("@google-cloud/text-to-speech")
const client = new textToSpeech.TextToSpeechClient()
const genVid = async (req, res) => {
  try {

    // console.log("bpdy oin genvid: " + req.file);
    // console.log(req.body.start_base64Data)
    var matches = req.body.start_base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      response = {};
    console.log(req.body.language)
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    console.log(type)
    let extension = mime.getExtension(type);
    let fileName = Date.now() + ".png";
    try {
      fs.writeFileSync("./public/uploads/" + fileName, imageBuffer, 'utf8');
      // return res.send({"status":"success"});
    } catch (e) {
      next(e);
    }
    console.log("file name is" + fileName)


    var uid = req.body.uid;
    console.log("uiddddddddddddddddddddd : " + uid);
    let user_main_langauge = await Doctor.findOne({ _id: req.body.uid })
    console.log("hello, i am doctor ", user_main_langauge.doctor)
    // var gtts = new gTTS("hello, i am doctor " + user_main_langauge.doctor_name, 'en');


    console.log("uiddddddddddddddddddddd################ : ");
    console.log(user_main_langauge);
    var userImg = "./public/uploads/" + fileName;

    // console.log("user img is" + userImg)
    //file names:
    var dr_audio = "./public/videos/" + Date.now() + "_draud.mp3"
    var img_vid_path = Date.now() + "_img.mp4";
    var img_vid = "./public/videos/" + Date.now() + "_img.mp4";
    var vid_vid = "./public/videos/" + Date.now() + "_vid.mp4";
    var aud_vid = "./public/videos/" + Date.now() + "_aud.mp4";
    var fil_vid = "./public/videos/" + Date.now() + "_fil.txt";
    var def_vid = user_main_langauge.language + ".mp4";
    var def_aud = "./public/videos/" + user_main_langauge.language + ".mp3";
    var last_aud = "./public/videos/" + Date.now() + "_lastaud.mp3";
    var final_aud = "./public/videos/" + Date.now() + "_finalaud.mp3";
  

    const request = {
      input: { text: "hello, i am doctor " + user_main_langauge.doctor_name },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'pa-IN', name: "pa-IN-Wavenet-C" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };
    
    const [resp] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(dr_audio, resp.audioContent, 'binary');


    var del_vid = [];
    del_vid.push(fileName);
    del_vid.push(aud_vid);
    del_vid.push(vid_vid);
    del_vid.push(img_vid);
    del_vid.push(fil_vid);

    file_content = "file " + def_vid + "\nfile " + img_vid_path + "\n";
    fs.writeFileSync(fil_vid, file_content);

    var video_len;

    if (req.body.language === 'english') {
      video_len = 8
    }
    else if (req.body.language === 'gujarati') {
      video_len = 14
    }
    else if (req.body.language === 'hindi') {
      video_len = 8
    }
    else if (req.body.language === 'bengali') {
      video_len = 10
    }
    else if (req.body.language === 'marathi') {
      video_len = 10
    }
    else if (req.body.language === 'kannada') {
      video_len = 7
    }
    else if (req.body.language === 'oriya') {
      video_len = 9
    }
    else if (req.body.language === 'telugu') {
      video_len = 8
    }
    else if (req.body.language === 'tamil') {
      video_len = 8
    }
    else if (req.body.language === 'malayalam') {
      video_len = 7
    }

    var cmd_img = `ffmpeg -loop 1 -i ${userImg} -c:v libx264 -t ${video_len} -pix_fmt yuv420p -vf scale=1920:1080  ${img_vid}`;
    exec(cmd_img, (error, stdout, stderr) => {
      // console.log("img_vid " + img_vid)
      // console.log("Process started at cmd_img");
      if (error) {
        console.log("error occurs at cmd_img : " + error);
        // res.send("error: "+ error);
      }
      // console.log("success video of img.");
      var cmd_vid = `ffmpeg -safe 0 -f concat -i ${fil_vid} -c copy ${vid_vid}`;
      exec(cmd_vid, (error, stdout, stderr) => {
        // console.log("vid_vid " + vid_vid)
        // console.log("process started at cmd_vid");
        if (error) {
          console.log("error occurs at cmd_vid: " + error);
          // res.send("error: " + error);
        }

        var final_aud_aud = `ffmpeg -i ${dr_audio} -i ${def_aud} -filter_complex "[0:a]atrim=end=10,asetpts=N/SR/TB[begin];[0:a]atrim=start=10,asetpts=N/SR/TB[end];[begin][1:a][end]concat=n=3:v=0:a=1[a]" -map "[a]" ${final_aud}`

        exec(final_aud_aud, (error, stdout, stderr) => {
          // console.log("vid_vid " + vid_vid)
          // console.log("process started at cmd_vid");
          if (error) {
            console.log("error occurs at aud_aud " + error);
            // res.send("error: " + error);
          }
          var last_aud_aud = `ffmpeg -i ${final_aud} -vn -ar 44100 -ac 2 -b:a 128k ${last_aud}`

          exec(last_aud_aud, (error, stdout, stderr) => {
            // console.log("vid_vid " + vid_vid)
            // console.log("process started at cmd_vid");
            if (error) {
              console.log("error occurs at aud_aud " + error);
              // res.send("error: " + error);
            }

            console.log("success video without audio");

            var cmd_aud = `ffmpeg -i ${vid_vid} -i ${last_aud} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${aud_vid}`;
            exec(cmd_aud, (error, stdout, stderr) => {
              console.log("process started at smd_auth:" + aud_vid);
              if (error) {
                console.log("error occurs at cmd_aud: " + error);
                // res.send("error: "+ error);
              }
              console.log("aws key is " + aud_vid)
              // try {
              // const fileContent = fs.readFileSync(aud_vid)
              var aws_key = path.parse(aud_vid).base
              //   console.log("aws key is " + aws_key)
              //   var params = {
              //     Bucket: process.env.S3_BUCKET,
              //     Key: aws_key,
              //     Body: fileContent,
              //     ACL: 'public-read'
              //     //got buffer by reading file path
              //   };
              //   const bucket = new aws.S3({
              //     accessKeyId: process.env.AWS_ID,
              //     secretAccessKey: process.env.AWS_SECRET,
              //     // region: process.env.S3_REGION
              //   });
              //   bucket.putObject(params, function (err, data) {
              //     console.log(err, data);
              //   });
              // } catch (error) {

              // }
              // console.log("success video with audio -> deleting");
              //  fs.unlink(userImg, (err) => {
              //    if (err) throw new Error;
              //    console.log(userImg + "was deleted")
              //  })
              //  fs.unlink(img_vid, (err) => {
              //    if (err) throw err;
              //   console.log(img_vid + " was deleted");
              //  });
              //  fs.unlink(fil_vid, (err) => {
              //    if (err) throw err;
              //    console.log(fil_vid + " was deleted");
              //  });
              //  fs.unlink(vid_vid, (err) => {
              //    if (err) throw err;
              //    console.log(vid_vid + " was deleted");
              //  });

              // // res.redirect('/str')
              res.json({ ok: true, name: aws_key });
              setTimeout(() => {
                console.log("in setinterval video");
                del_vid.forEach(aud_vid => {
                  if (fs.existsSync(aud_vid)) {
                    fs.unlink(aud_vid, (err) => {
                      if (err) throw err;
                      console.log(aud_vid + " was deleted");
                    });
                  }
                });
                del_vid.length = 0;
              }, 600000);
            })
          })
        })
      })
    })


  } catch (error) {
    console.log("error @GEN VID ################################" + error.message);
  }
}
const str = async (req, res) => {
  const data = req.params.url
  res.render('str', { data })
}
const getStream = async (req, res) => {
  const data = req.params.url
  res.render('stream', { data })
}
const stream = async (req, res) => {
  try {
    console.log("insde this")
    console.log(req.params)
    const url = req.params.url
    var fileUrl = `https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/${url}`;

    var range = req.headers.range;
    var positions, start, end, total, chunksize;

    // HEAD request for file metadata
    request({
      url: fileUrl,
      method: 'HEAD'
    }, function (error, response, body) {
      setResponseHeaders(response.headers);
      pipeToResponse();
    });

    function setResponseHeaders(headers) {
      positions = range.replace(/bytes=/, "").split("-");
      start = parseInt(positions[0], 10);
      total = headers['content-length'];
      end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
    }

    function pipeToResponse() {
      var options = {
        url: fileUrl,
        headers: {
          range: "bytes=" + start + "-" + end,
          connection: 'keep-alive'
        }
      };

      request(options).pipe(res);
    }

  } catch (error) {
    res.send(error.message)
  }
}
const download = (req, res) => {
  const url = req.params.url

  // var url = "https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/output2.mp4"
  // res.
}
//export modules
module.exports = {
  getM,
  addData,
  getData,
  getzsm,
  getrm,
  gettm,
  gethq,
  uploadImg,
  genVid,
  str,
  getStream,
  stream,
  download
};

// VIDEO GENERATION METHOD 1  
// const genVid = (req, res) => {
//   console.log("in genVid");
//   console.log("image " + req.file.filename);
//   console.log("in video post");
//   console.log("file: > " + req.file.path);
//   var imgName = req.file.path;
//   var images = [imgName];

//   var videoOptions = {
//     // output : "./public/images/" + Date.now() + ".mp4",
//     fps: 25,
//     loop: 8,
//     transition: false,
//     videoBitrate: 1024,
//     videoCodec: "libx264",
//     size: "1920x?",
//     audioBitrate: "128k",
//     audioChannels: 2,
//     format: "mp4",
//     pixelFormat: "yuv420p",
//   };
//   var videoname = "./public/videos/" + Date.now() + ".mp4";
//   videoList.video1 = videoname;
//   videoshow(images, videoOptions)
//     .save(videoname)
//     .on("start", function (command) {
//       console.log("Process started for video 1.");
//     })
//     .on("error", function (err, stdout, stderr) {
//       console.error("Error:", err);
//     })
//     .on("end", function (output) {
//       console.error("Video 1 created in: > ", output);
//       console.log("video list" + JSON.stringify(videoList, null, 4));
//       videoList.video2 = "./public/D_videos/" + videoList.language + ".mp4";
//       videoList.audio = "./public/D_videos/" + videoList.language + ".mp3";
//       videoList.video3 = "./public/videos/" + Date.now() + ".mp4";
//       ffmpeg()
//         .addInput(videoList.video2)
//         .addInput(videoList.video1)
//         .on("start", function (command) {
//           console.log("Process started for video 2.");
//         })
//         .on("end", () => {
//           console.log("merge video 2 done: " + videoList.video3);
//           console.log("delete video 1 file");
//           // Assuming that 'path/file.txt' is a regular file.
//           fs.unlink(videoList.video1, (err) => {
//             if (err) throw err;
//             console.log(videoList.video1 + " was deleted");
//           });
//           videoList.video4 = "./public/videos/" + Date.now() + ".mp4";
//           ffmpeg()
//             .addInput(videoList.video3)
//             .addInput(videoList.audio)
//             .on("end", () => {
//               console.log("delete video 3 file");
//               // Assuming that 'path/file.txt' is a regular file.
//               fs.unlink(videoList.video3, (err) => {
//                 if (err) throw err;
//                 console.log(videoList.video3 + " was deleted");
//               });
//               console.log("merge video 3 done: " + videoList.video4);
//               res.json({ ok: true, name: videoList.video4 });
//             })
//             .on("start", function (command) {
//               console.log("Process started for video 3.");
//             })
//             .on("error", (err) =>
//               console.log("error in video 3 : " + err.message)
//             )
//             .saveToFile(videoList.video4);
//         })
//         .on("error", (err) => console.log("error in video 2 : " + err.message))
//         .mergeToFile(videoList.video3);

//       // res.json({ ok: true, name: output });
//     });
//   console.log("exist from video merge");
// };
