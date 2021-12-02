var formData = {},
    uploadImgSrc, imageName, uploadedImg, imageList, imageName, imageLists;

var formData = new FormData();
var uImgData = {}


var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function loadBody() {
    // window.location.reload()
    if (performance.navigation.type == 2) {
        location.reload(true);
        console.log(" in load body")
    }
    localStorage.clear();
    byId("downloadpage").style.display = "none";
    // location.reload();
    $.get('/js/fram.json', (response) => {
        // window.location.reload()

        // $.get('http://localhost/projects/wordtexercise/js/fram.json', (response) => {
        imageList = response.data;
        let frameListDiv = byId("frameListPage");
        frameListDiv.innerHTML = "";
        frameListDiv.innerHTML = `<p class="col-sm-12 col-lg-12 frameHeading">Choose a frame:</p><h6 style="color:#000">Click on this frame to make your video</h6>`
        let classList;
        if (window.matchMedia("(max-width: 1024px)").matches)
            classList = 'col-sm-6';
        else
            classList = 'col-sm-6 col-lg-2';

        imageList.map((el) => {
            frameListDiv.innerHTML += `<span class="${classList} ${el.image_type}" style="text-align: center;;margin-top: -182px;display: none;">
              <img class="thumbnail" src="${el.image}" onclick="selectFrame('${el.image}')" crossorigin="anonymous">
        </span>`
        });
        frameListDiv.style.display = 'none';
    });


    /*    $.get('js/seconfram.json', (response) => {
            imageLists = response.data;
            let frameListDivse = byId("frameListPagesecond");
            frameListDivse.innerHTML = "";
            frameListDivse.innerHTML = `<p class="col-sm-12 col-lg-12 frameHeading">Choose a frame:</p>`
            let classLists;
            if (window.matchMedia("(max-width: 1024px)").matches)
                classList = 'col-sm-6';
            else
                classList = 'col-sm-6 col-lg-2';
    
            imageLists.map((el) => {
                frameListDivse.innerHTML += `<span class="${classLists}" style="text-align: center;">
                  <img class="thumbnail" src="${el.image}" onclick="selectFramesecond('${el.image}')" crossorigin="anonymous">
            </span>`
            });
            frameListDivse.style.display = 'none';
        });*/


}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

toDataURL('/images/default.png', function (dataUrl) {
    // toDataURL('http://localhost/projects/wordtexercise/images/default.png', function(dataUrl) {
    uploadImgSrc = dataUrl;
})



function byId(id) {
    return document.getElementById(id);
}

function byClass(className) {
    return document.querySelector(`.${className}`);
}
var data = new FormData();

function submitForm(ev) {
    ev.preventDefault();
    window.scrollTo(0, 0);
    let formElements = byId("userForm").elements;
    // formData.emp_code = formElements[0].value;;
    // formData.mr_name = formElements[1].value;
    // formData.mobile = formElements[2].value;
    // formData.hq = formElements[3].value;
    // formData.zone = formElements[4].value;

    formData.set('division', formElements[0].value)
    formData.set('rbm_name', formElements[1].value)
    formData.set('abm_name', formElements[2].value)
    formData.set('bo_name', formElements[3].value)
    formData.set('hq_name', formElements[5].value);

    byId("userFormDiv").style.display = 'none';
    byId("frameListPage").style.display = 'none';
    byId("imageFormDiv").style.display = 'flex';
    byId("downloadpage").style.display = "none";

    idx++;
}

function idForm() {
    var selectvalue = $('input[name=choice]:checked', '#idForm').val();
    if (selectvalue == "dr") {
        byId("imageFormDiv").style.display = 'flex';
        byId("userFormDiv").style.display = 'none';
        byId("rdioscreen").style.display = 'none';
        $("#downloadpage").hide();
        idx++;
        console.log(idx);
        return true;
    } else {
        byId("userFormDiv").style.display = 'flex';
        byId("imageFormDiv").style.display = 'none';
        byId("rdioscreen").style.display = 'none';
        $("#downloadpage").hide();
        idx++;
        console.log(idx);
        return false;
    }
}

function readImgURL(input) {
    if (input.files && input.files[0]) {
        uploadedImg = input.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            uploadImgSrc = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$("#myfile").change(function () {
    readImgURL(this);
});
var test;
var main_id_update = '';
function imageFormSubmit(ev) {
    ev.preventDefault();
    window.scrollTo(0, 0);
    let formElements = byId("imageForm").elements;

    formData.language = language = formElements[0].value;
    formData.doctor_name = drName = formElements[1].value;
    formData.dr_email = addName = formElements[2].value;
    console.log("addName: " + addName)
    formData.address = locName = formElements[3].value;
    formData.dr_mobile = emailName = formElements[4].value;
    //formData.phone = phoneName = formElements[5].value;
    var file_image = document.getElementById("myfile").files[0];
    console.log("file_image : in dr page: " + file_image);
    console.log("befor data to be set , " + $("input[type=file]")[0].files[0]);
    formData.set("image", $("input[type=file]")[0].files[0]);
    formData.set("doctor_name", formElements[1].value);
    formData.set("hospital_name", formElements[2].value);
    formData.set("hospital_address", formElements[3].value);
    formData.set("city", formElements[4].value);
    formData.set("language", formElements[0].value);
    test = formElements[1].value;

    byId("imageFormDiv").style.display = 'none';
    byId("frameListPage").style.display = 'flex';
    idx++;

    console.log("formdata" + JSON.stringify(formData));

    $.ajax({
        type: "POST",
        url: "/addData",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (data) {
            console.log("in success");
            console.log("data: > ", data);
            main_id_update = data.body._id;
            uImgData.body = data.body;
            console.log("at tiome of choose: ", uImgData.body);
            console.log("filenaem in srcipt: " + uImgData.body.image);
            // uImgData.iw = data.iw;
            // uImgData.ih = data.ih;
        }
    });

    /*$.ajax({
        type: "POST",
        url: "https://cors-anywhere.herokuapp.com/https://parinfotech.com/poster/index.php/api/index/adduserdata",
        data: JSON.stringify(formData),
        dataType: 'json',
        processData: false,
        contentType: false,
        success:function(data){
            
        }
    });*/
}

function nextseconfram() {

    byId("firstprevediv").style.display = 'none';
    byId("frameListPagesecond").style.display = 'flex';
}

function chooselang() {

    var value = byId("lang").value;
    $("#frameListPage span").hide();
    $("." + value).show();

    //alert(value);

    localStorage.setItem('language', value);

    /*if(value =='hindi'){
 
     //document.getElementById('downloadvideo').onclick = "downloadvideohin()";
     document.getElementById('downloadvideo').setAttribute('onclick','downloadvideohin()');
 
 
    }else{
 
     //document.getElementById('downloadvideo').onclick = "downloadvideo()";
     document.getElementById('downloadvideo').setAttribute('onclick','downloadvideo()')
 
    }*/
}
var divisionData = {};

function getzsm() {
    console.log("hello10");

    var divisionval = byId("division").value;
    console.log(divisionval);
    if (divisionval == 'RPM') {
        console.log('aa')
        let zsm = document.getElementById("zsm");
        zsm.innerHTML = "";
        let rm = document.getElementById("rm");
        rm.innerHTML = "";
        let tm = document.getElementById("tm");
        tm.innerHTML = "";
        let hq = document.getElementById("hq");
        hq.innerHTML = "";
        hq.value = "";
        let hq1 = document.getElementById("hq1");
        hq1.value = "";
        document.getElementById("hq").disabled = true
        document.getElementById("hq1").disabled = true
        //console.log(imageList);
        zsm.innerHTML += zsm.innerHTML += `<option value="">Select  RPM</option>
        <option value="Lohith S">Lohith S</option>
        <option value="Nitin Khanna">Nitin Khanna</option>
        <option value="Raghuveer Gajendra">Raghuveer Gajendra</option>
        <option value="Mrityunjoy Bhattacharjee">Mrityunjoy Bhattacharjee</option>
        <option value="Sumit Vishwanathan">Sumit Vishwanathan</option>;
        <option value="Sarojini Parasuram">Sarojini Parasuram</option>`;
        // rm.innerHTML += `<option value="">Select RSM</option>`;
        // tm.innerHTML += `<option value="">Select TM</option>`;
        // hq.value += "";
        // hq1.value += "";
        // hq.innerHTML += `<option value="">Select HQ</option>`;
        document.getElementById("tm").required = false
        document.getElementById("rm").required = false
        // document.getElementById("zsm").required = false
        // document.getElementById("hq").required = false
        // document.getElementById("hq").disabled = true
        // document.getElementById("zsm").disabled = true
        document.getElementById("tm").disabled = true
        document.getElementById("rm").disabled = true
        document.getElementById("tm").style.display = "none";
        document.getElementById("mhq").style.display = "block";

        document.getElementById("rm").style.display = "none";
        document.getElementById("hq").style.display = "block";
        document.getElementById("hq1").style.display = "none";
        divisionData.division = division = divisionval;
    } else if (divisionval == 'HO') {
        let zsm = document.getElementById("zsm");
        zsm.innerHTML = "";
        zsm.innerHTML += zsm.innerHTML += `<option value="">Select  HO</option>
        <option value="LCS Sri Vishnu ">LCS Sri Vishnu </option>
        <option value="Vishwa Gaurav ">Vishwa Gaurav </option>
        <option value="Binny Phukan ">Binny Phukan </option>
        <option value="Priyanka Tyagi ">Priyanka Tyagi </option>
        <option value="Kandy S Kandasamy">Kandy S Kandasamy</option>
        <option value="Aditya Mahajan ">Aditya Mahajan </option>
        <option value="Mahendra Saggu ">Mahendra Saggu </option>
        <option value="Pradip Neog ">Pradip Neog </option>
        <option value="Sunil Kumar">Sunil Kumar</option>
        <option value="Jitendra Lade">Jitendra Lade</option>`;
        document.getElementById("zsm").required = true
        document.getElementById("tm").required = false
        document.getElementById("rm").required = false
        document.getElementById("hq").required = false
        document.getElementById("hq1").required = false
        document.getElementById("zsm").disabled = false
        document.getElementById("tm").disabled = true
        document.getElementById("rm").disabled = true
        document.getElementById("hq").disabled = true
        document.getElementById("hq1").disabled = true
        document.getElementById("tm").style.display = "none";
        document.getElementById("rm").style.display = "none";
        document.getElementById("hq").style.display = "none";
        document.getElementById("hq1").style.display = "none";
        document.getElementById("mrsm").style.display = "none";
        document.getElementById("mtm").style.display = "none";
        document.getElementById("mhq").style.display = "none";
    } else {
        document.getElementById("zsm").required = true
        document.getElementById("tm").required = true
        document.getElementById("rm").required = true
        document.getElementById("hq").required = true
        document.getElementById("hq1").required = true
        document.getElementById("zsm").disabled = false
        document.getElementById("tm").disabled = false
        document.getElementById("rm").disabled = false
        document.getElementById("hq").disabled = true
        document.getElementById("hq1").disabled = true
        document.getElementById("tm").style.display = "block";
        document.getElementById("rm").style.display = "block";
        document.getElementById("mrsm").style.display = "block";
        document.getElementById("mtm").style.display = "block";
        document.getElementById("mhq").style.display = "block";
        document.getElementById("hq").style.display = "block";

        document.getElementById("hq1").style.display = "none";
        divisionData.division = division = divisionval;


        $.ajax("/getzsm", {
            method: "POST",
            //   url: "http://52.66.231.200/videocreat/index.php/api/index/adduserdatasingle",
            // url: "http://localhost:3000/addData/",
            data: { division: divisionval },
            dataType: "json",
            //   processData: false,
            //   contentType: false,
            success: function (data) {
                console.log("in success: -> " + data.data);
                let empList = data.data;
                console.log(empList);

                let empListDiv = document.getElementById("zsm");
                empListDiv.innerHTML = "";
                let rm = document.getElementById("rm");
                rm.innerHTML = "";
                let tm = document.getElementById("tm");
                tm.innerHTML = "";
                let hq = document.getElementById("hq");
                hq.value = "";
                let hq1 = document.getElementById("hq1");
                hq1.value = "";
                //console.log(imageList);
                empListDiv.innerHTML += `<option value="">Select  ZSM</option>`;
                rm.innerHTML += `<option value="">Select RSM</option>`;
                tm.innerHTML += `<option value="">Select TM</option>`;
                hq.value = "";
                hq1.value = "";
                // empListDiv.innerHTML += `<option value="">Select RBM</option>`;
                // rm.innerHTML += `<option value="">Select ABM</option>`;
                // tm.innerHTML += `<option value="">Select BO</option>`;
                // hq.value += "";
                empList.map((el) => {
                    empListDiv.innerHTML += `</option><option  value="${el}" >${el}</option>`;
                });
            },
            error: function (error) {
                console.log("error in " + error);
            },
        });
    }
}

function getrm() {
    console.log("hello11");

    var zsmval = byId("zsm").value;
    if (document.getElementById("division").value === "RPM") {
        console.log("inside rpm")
        console.log(document.getElementById("division").value)
        if (zsmval == 'Lohith S') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `BANGALORE`;
            hq1.value = "";
            hq1.value = `BANGALORE`;
        } else if (zsmval == 'Nitin Khanna') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `DELHI`;
            hq1.value = "";
            hq1.value = `DELHI`;
        } else if (zsmval == 'Mrityunjoy Bhattacharjee') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `Kolkata`;
            hq1.value = "";
            hq1.value = `Kolkata`;
        } else if (zsmval == 'Raghuveer Gajendra') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `HYDERABAD`;
            hq1.value = "";
            hq1.value = `HYDERABAD`;
        } else if (zsmval == 'Sumit Viswanatham') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `MUMBAI`;
            hq1.value = "";
            hq1.value = `MUMBAI`;
        }
        else if (zsmval == 'Sarojini Parasuram') {
            let hq = document.getElementById("hq");
            let hq1 = document.getElementById("hq1");
            hq.value = "";
            hq.value = `CHENNAI`;
            hq1.value = "";
            hq1.value = `CHENNAI`;
        }
    } else if (document.getElementById("division").value === "HO") {
        console.log("HO")
    } else {
        divisionData.zsm = zsm = zsmval;

        $.ajax("/getrm", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(divisionData),
            success: function (data) {
                // console.log(response);

                let empList = data.data;
                console.log(empList);

                let empListDiv = document.getElementById("rm");
                empListDiv.innerHTML = "";
                let tm = document.getElementById("tm");
                tm.innerHTML = "";
                let hq = document.getElementById("hq");
                hq.value = "";
                let hq1 = document.getElementById("hq1");
                hq1.value = "";
                document.getElementById("hq").disabled = true
                document.getElementById("hq1").disabled = true
                //console.log(imageList);
                empListDiv.innerHTML += `<option value="">Select RSM</option>`;
                tm.innerHTML += `<option value="">Select TM</option>`;
                hq.value = "";
                hq1.value = "";
                // empListDiv.innerHTML += `<option value="">Select ABM</option>`;
                // tm.innerHTML += `<option value="">Select BO</option>`;
                // hq.value += "";
                empList.map((el) => {
                    empListDiv.innerHTML += `</option><option  value="${el}" >${el}</option>`;
                });
            },
        });
    }
}

function gettm() {
    console.log("hello12");

    var rmval = byId("rm").value;

    divisionData.rm = rm = rmval;

    //console.log(divisionData);

    $.ajax("/gettm", {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(divisionData),
        success: function (data) {
            let empList = data.data;
            console.log(empList)
            let empListDiv = document.getElementById("tm");
            empListDiv.innerHTML = "";
            let hq = document.getElementById("hq");
            hq.value = "";
            let hq1 = document.getElementById("hq1");
            hq1.value = "";
            document.getElementById("hq").disabled = true
            document.getElementById("hq1").disabled = true
            //console.log(imageList);
            empListDiv.innerHTML += `<option value="">Select TM</option>`;
            hq.value = "";
            hq1.value = "";
            // empListDiv.innerHTML += `<option value="">Select BO</option>`;
            // hq.value += "";
            empList.map((el) => {
                console.log('in el');
                console.log(el);
                empListDiv.innerHTML += `</option><option  value="${el}" >${el}</option>`;
            });
        },
    });
}

function gethq() {
    console.log("hello13");


    var tmval = byId("tm").value;
    document.getElementById("hq").disabled = true
    document.getElementById("hq1").disabled = true
    divisionData.tm = tm = tmval;
    $.ajax("/gethq", {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(divisionData),
        success: function (result) {
            let empList = result.data;
            console.log("hq list : ", empList)
            // data.append("HQ", empList[0]);
            let empListDiv = document.getElementById("hq");
            let empListDiv1 = document.getElementById("hq1");
            empListDiv.innerHTML = "";
            empListDiv1.innerHTML = "";
            //console.log(imageList);
            // empListDiv.innerHTML = empList ;
            empList.map((el) => {
                empListDiv.value = `${el}`;
                empListDiv1.value = `${el}`;
            });
        },
    });

}



function downloadvideo() {
    byId("firstprevediv").style.display = 'none';
    byId("loaderdiv").style.display = 'block';

    // alert('call');

    var imageData = {}

    /*imageData.start_base64Data = localStorage.getItem('firstimg');
    imageData.end_base64Data = localStorage.getItem('secondimg');*/

    // console.log("img",file)
    // imageData.set("img",file)
    imageData.uid = uImgData.body._id
    console.log("at time of gen video: ", imageData.uid);
    imageData.start_base64Data = localStorage.getItem('firstimg')
    if (localStorage.getItem('language') == null) {
        imageData.language = 'zyd_english';
        var language = 'zyd_english';
    } else {
        imageData.language = localStorage.getItem('language');
        var language = localStorage.getItem('language');
    }

    // var url ="http://52.66.231.200:8485/download";
    // var url_downlode ="http://52.66.231.200:8485/downloadvideo";
    //if(language =="hindi" || language =="bengali" || language =="gujarati" || language =="kannada"  || language =="malayalam"){

    // url ="http://52.66.231.200:8485/download";
    // url_downlode ="http://65.1.12.24:8485/downloadvideo";
    url = "/genVid";
    // url_downlode = "http://52.66.231.200:8485/downloadvideo";
    url_downlode = "/downloadvideo";

    //}


    // console.log(imageData)
    if (confirm('Are you want to download video?')) {

        $.ajax({
            type: "POST",
            // url: "http://13.232.95.61/videodemo/video.php",
            // url: "http://localhost:8485/download",
            url: url,
            data: JSON.stringify(imageData),
            dataType: 'json',
            // processData: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                // alert('Start');
                // $('#loader').show(); 
                //$('#loaderdiv').css('display', 'flex');
                byId("loaderdiv").style.display = 'block';

            },
            success: function (data) {
                console.log('in success of video');
                console.log(data);
                //$('#loader').hide(); 
                // byId("loaderdiv").style.display = 'none';
                //$('#loader').css('display', 'none');
                // alert('success');

                // alert(data);

                // var videoname = data.split("/")[1];

                // var url = window.location.href + data;
                //stream
                setTimeout(() => {
                    var videoname = data.name;
                    let slink = "/videos/" + videoname;
                    byId("strim").style.display = "block";
                    byId("loaderdiv").style.display = "none";
                    byId("videPlayer").src = slink;
                    byId("d-video").href = slink;
                    idx = 10;
                    // document.getElementById("s-video").href = slink;
                    // document.getElementById("s-video").click()
                }, 2000);
                // var url = "http://localhost:20000/MediaUploads/" + data;
                // https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/1622468269017_aud.mp4
                // console.log(`https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/${videoname}`);
                //download
                // setTimeout(() => {
                //     window.location = `https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/${videoname}`;
                //     byId("loaderdiv").style.display = 'none';
                //     byId("rdioscreen").style.display = 'block'
                //         // location.reload();
                // }, 3000);

                // window.location = url_downlode + "?file=https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/" + videoname;
                // videoname = `https://mr-promotion.s3.ap-south-1.amazonaws.com/company-video/${videoname}`
                // downloadFile(url, videoname);




            },
            complete: function (data) {
                // alert('Complete');

                //$('#loader').hide(); 
                // byId("loaderdiv").style.display = 'none';
                byId('downloadpage').style.display = 'none';
                byId('firstprevediv').style.display = 'none';
                // byId('firstprevediv').style.display = 'none';



                // alert(data);

                //var url = window.location.href+data.split("-strict -2")[1];

                // alert(url);
            }
        });

    } else {
        // Do nothing!
        byId("loaderdiv").style.display = 'none';
        console.log('Thing was not saved to the database.');
    }
    console.log(imageData);

}

function downloadvideohin() {

    byId("loaderdiv").style.display = 'block';

    // alert('call');

    var imageData = {};

    imageData.start_base64Data = localStorage.getItem('firstimg');
    imageData.end_base64Data = localStorage.getItem('secondimg');



    $.ajax({
        type: "POST",
        // url: "http://13.235.84.77/videodemo/video.php",
        // url: "http://103.232.124.170:8485/download",
        url: "http://52.66.231.200:8485/downloadhindi",
        data: JSON.stringify(imageData),
        dataType: 'json',
        // processData: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // alert('Start');
            // $('#loader').show(); 
            //$('#loaderdiv').css('display', 'flex');
            byId("loaderdiv").style.display = 'block';

        },
        success: function (data) {
            //$('#loader').hide(); 
            // byId("loaderdiv").style.display = 'none';
            //$('#loader').css('display', 'none');
            // alert('success');

            // alert(data);

            // var videoname = data.split("/")[1];

            // var url = window.location.href + data;


            var videoname = data.file;

            // var url = "http://localhost:20000/MediaUploads/" + data;
            window.location = "http://52.66.231.200:8485/downloadvideo?file=" + videoname

                ;
            // downloadFile(url, videoname);
            //

        },
        complete: function (data) {
            // alert('Complete');

            //$('#loader').hide(); 
            // byId("loaderdiv").style.display = 'none';

            // alert(data);

            //var url = window.location.href+data.split("-strict -2")[1];

            // alert(url);
        }
    });
    console.log(imageData);

}


function downloadFile(urlToSend, videoname) {
    var req = new XMLHttpRequest();
    req.open("GET", urlToSend, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var fileName = videoname //if you have the fileName header available
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    req.send();
}

function downloadFile(urlToSend, videoname) {
    var req = new XMLHttpRequest();
    req.open("GET", urlToSend, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var fileName = videoname //if you have the fileName header available
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    req.send();
}


function checkLengthAddress() {
    var textbox = document.getElementById("address");
    if (textbox.value.length <= 30) {
        $("#dr_address_vali").html('');
        $("#dr_address_vali").css("color", "");
        $("#address").css({
            "border-color": "",
            "border-width": "",
            "border-style": ""
        });
        $('#registerbtn').removeAttr("disabled");
    } else {
        $("#dr_address_vali").html('max 30 characters Limit');
        $("#dr_address_vali").css("color", "red");
        $("#address").css({
            "border-color": "red",
            "border-width": "1px",
            "border-style": "solid"
        });
        $('#registerbtn').prop('disabled', true);
    }
}

function checkLengthclinic() {
    var textbox = document.getElementById("clinic");
    if (textbox.value.length <= 30) {
        $("#dr_clinic_vali").html('');
        $("#dr_clinic_vali").css("color", "");
        $("#clinic").css({
            "border-color": "",
            "border-width": "",
            "border-style": ""
        });
        $('#registerbtn').removeAttr("disabled");
    } else {
        $("#dr_clinic_vali").html('max 30 characters Limit');
        $("#dr_clinic_vali").css("color", "red");
        $("#clinic").css({
            "border-color": "red",
            "border-width": "1px",
            "border-style": "solid"
        });
        $('#registerbtn').prop('disabled', true);
    }
}

function checkLengthdrname() {
    var textbox = document.getElementById("drname");
    if (textbox.value.length <= 20) {
        $("#dr_name_vali").html('');
        $("#dr_name_vali").css("color", "");
        $("#drname").css({
            "border-color": "",
            "border-width": "",
            "border-style": ""
        });
        $('#registerbtn').removeAttr("disabled");
    } else {
        $("#dr_name_vali").html('max 20 characters Limit');
        $("#dr_name_vali").css("color", "red");
        $("#drname").css({
            "border-color": "red",
            "border-width": "1px",
            "border-style": "solid"
        });
        $('#registerbtn').prop('disabled', true);
    }
}

function checkLengthcity() {
    var textbox = document.getElementById("drcity");
    if (textbox.value.length <= 15) {
        $("#dr_city_vali").html('');
        $("#dr_city_vali").css("color", "");
        $("#drcity").css({
            "border-color": "",
            "border-width": "",
            "border-style": ""
        });
        $('#registerbtn').removeAttr("disabled");
    } else {
        $("#dr_city_vali").html('max 15 characters Limit');
        $("#dr_city_vali").css("color", "red");
        $("#drcity").css({
            "border-color": "red",
            "border-width": "1px",
            "border-style": "solid"
        });
        $('#registerbtn').prop('disabled', true);
    }
}