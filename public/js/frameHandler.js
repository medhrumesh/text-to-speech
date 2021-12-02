var imgSrc, imgSrcs;

function selectFrame(src) {
    imgSrc = imageList.filter((el) => src === el.image);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    byId("frameListPage").style.display = 'none';
    byId("frameListPagesecond").style.display = 'none';
    byId("downloadFramePage").style.display = 'inherit';
    byId("frameDiv").style.display = 'flex';
    document.querySelector("body").style.overflowX = 'hidden';
    byClass("frameImg").style.opacity = 0.9;

    $(".frameImg").attr('src', src);
    $('#uploadImg').attr('src', uploadImgSrc);
    idx++;
    imageUpload();
}

/*function selectFramesecond(src) {
    imgSrc = imageLists.filter((el) => src === el.image);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    byId("frameListPagesecond").style.display = 'none';
    byId("downloadFramePage").style.display = 'inherit';
    byId("frameDiv").style.display = 'flex';
    document.querySelector("body").style.overflow = 'hidden';
    byClass("frameImg").style.opacity = 0.9;

    $(".frameImg").attr('src', src);
    $('#uploadImg').attr('src', uploadImgSrc);
    $("#btnchange").attr("onclick", "secondmergeImgs()");
    $("#btnchange").attr("ontouchstart", "secondmergeImgs()");
    idx++;
    secondimageUpload();
}*/

function secondimageUpload() {
    let uploadImg = byId("uploadImg");
    let slider = byId("mySlider");
    let frameImg = byClass("frameImg");
    let imgTxt = byId("imgTxt");
    let addTxt = byId("addTxt");
    let locTxt = byId("locTxt");
    let emailTxt = byId("emailTxt");
    let webTxt = byId("webTxt");
    let mobileTxt = byId("mobileTxt");
    let width = frameImg.offsetWidth;

    if (window.matchMedia("(max-width: 768px)").matches) {
        byId("sliderDiv").style.display = 'none';
    } else {
        byClass("container").style.padding = '0px';
        byId("sliderDiv").style.display = 'flex';
        slider.style.width = width + 'px';
        slider.style.bottom = (width - (window.outerHeight - width) / 2 - 5) + 'px';
    }

    // console.log(imgSrc);

    let maxLetters = Math.ceil(width / (parseInt(imgSrc[0]['name-font-size'].replace('px', '')) / 2));
    if (drName.length < maxLetters) {
        imgTxt.innerHTML = drName;
    } else {
        imgTxt.innerHTML = wordWrap(drName, maxLetters);
    }
    console.log("in second image: " + drName, addName)
    imgTxt.style.color = imgSrc[0]['name-font-color'];
    imgTxt.style['font-size'] = imgSrc[0]['name-font-size'];
    imgTxt.style['font-family'] = imgSrc[0]['name-font-type'];
    imgTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //imgTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos[0])/100)) + 'px';
    imgTxt.style.left = imgSrc[0]['name-left']
    imgTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['name-top']) / 100)) + 'px';


    let maxLettersadd = Math.ceil(width / (parseInt(imgSrc[0]['name-font-size'].replace('px', '')) / 2));
    console.log("****")
    console.log(addName)
    console.log("****")
    if (addName.length < maxLettersadd) {
        addTxt.innerHTML = addName;
    } else {
        addTxt.innerHTML = wordWrap(addName, maxLettersadd);
    }
    addTxt.style.color = imgSrc[0]['name-font-color'];;
    addTxt.style['font-size'] = imgSrc[0]['name-font-size'];
    addTxt.style['font-family'] = imgSrc[0]['name-font-type'];
    addTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    addTxt.style.left = imgSrc[0]['name-left']
    addTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['name-top']) / 100)) + 'px';


    let maxLettersloc = Math.ceil(width / (parseInt(imgSrc[0]['loc-font-size'].replace('px', '')) / 2));
    if (locName.length < maxLettersloc) {
        locTxt.innerHTML = locName;
    } else {
        locTxt.innerHTML = wordWrap(locName, maxLettersloc);
    }
    locTxt.style.color = imgSrc[0]['loc-font-color'];
    locTxt.style['font-size'] = imgSrc[0]['loc-font-size'];
    locTxt.style['font-family'] = imgSrc[0]['loc-font-type'];
    locTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    locTxt.style.left = imgSrc[0]['loc-left']
    locTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['loc-top']) / 100)) + 'px';


    let maxLettersemail = Math.ceil(width / (parseInt(imgSrc[0]['email-font-size'].replace('px', '')) / 2));
    if (emailName.length < maxLettersemail) {
        emailTxt.innerHTML = emailName;
    } else {
        emailTxt.innerHTML = wordWrap(emailName, maxLettersemail);
    }
    emailTxt.style.color = imgSrc[0]['email-font-color'];
    emailTxt.style['font-size'] = imgSrc[0]['email-font-size'];
    emailTxt.style['font-family'] = imgSrc[0]['email-font-type'];
    emailTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    emailTxt.style.left = imgSrc[0]['email-left']
    emailTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['email-top']) / 100)) + 'px';



    let maxLettersweb = Math.ceil(width / (parseInt(imgSrc[0]['web-font-size'].replace('px', '')) / 2));
    if (webName.length < maxLettersweb) {
        webTxt.innerHTML = webName;
    } else {
        webTxt.innerHTML = wordWrap(webName, maxLettersweb);
    }
    webTxt.style.color = imgSrc[0]['web-font-color'];
    webTxt.style['font-size'] = imgSrc[0]['web-font-size'];
    webTxt.style['font-family'] = imgSrc[0]['web-font-type'];
    webTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    webTxt.style.left = imgSrc[0]['web-left']
    webTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['web-top']) / 100)) + 'px';


    let maxLettersmobile = Math.ceil(width / (parseInt(imgSrc[0]['mobile-font-size'].replace('px', '')) / 2));
    if (phoneName.length < maxLettersmobile) {
        mobileTxt.innerHTML = phoneName;
    } else {
        mobileTxt.innerHTML = wordWrap(phoneName, maxLettersmobile);
    }
    mobileTxt.style.color = imgSrc[0]['mobile-font-color'];
    mobileTxt.style['font-size'] = imgSrc[0]['mobile-font-size'];
    mobileTxt.style['font-family'] = imgSrc[0]['mobile-font-type'];
    mobileTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    mobileTxt.style.left = imgSrc[0]['mobile-left']
    mobileTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['mobile-top']) / 100)) + 'px';


    let initScale = 0;
    var handleTouchyPinch = function(e, $target, data) {
        if (initScale !== 0)
            initScale += data.scale - data.previousScale;
        else
            initScale = data.scale;
        setTimeout(() => {
            $('#uploadImg').css({ 'webkitTransform': 'scale(' + initScale + ',' + initScale + ')' });
        }, 50);
    };
    $('#frameImg').bind('touchy-pinch', handleTouchyPinch);

    dragElement(imgTxt, byId("draggableText"));
    dragElement(addTxt, byId("draggableText"));

}

dragElement(uploadImg, byId("draggableDiv"));

function imageUpload() {
    console.log("in image upload");
    let uploadImg = byId("uploadImg");
    let slider = byId("mySlider");
    let frameImg = byClass("frameImg");
    let imgTxt = byId("imgTxt");
    // let addTxt = byId("addTxt");
    let addTxt = byId("addTxt");
    let locTxt = byId("locTxt");
    let emailTxt = byId("emailTxt");
    // console.log(uploadImg, slider, frameImg, imgTxt, addTxt, locTxt, emailTxt);
    let width = frameImg.offsetWidth;

    if (window.matchMedia("(max-width: 768px)").matches) {
        byId("sliderDiv").style.display = 'none';
    } else {
        byClass("container").style.padding = '0px';
        byId("sliderDiv").style.display = 'flex';
        slider.style.width = width + 'px';
        slider.style.bottom = (width - (window.outerHeight - width) / 2 - 5) + 'px';
    }

    // console.log(imgSrc);

    let maxLetters = Math.ceil(width / (parseInt(imgSrc[0]['name-font-size'].replace('px', '')) / 2));
    if (drName.length < maxLetters) {
        imgTxt.innerHTML = drName;
    } else {
        imgTxt.innerHTML = wordWrap(drName, maxLetters);
    }
    console.log(addName, drName)
    addTxt.innerHTML = addName;
    locTxt.innerHTML = locName;
    emailTxt.innerHTML = emailName;
    imgTxt.style.color = imgSrc[0]['name-font-color'];
    imgTxt.style['font-size'] = imgSrc[0]['name-font-size'];
    imgTxt.style['font-family'] = imgSrc[0]['name-font-type'];
    imgTxt.style['max-width'] = (width) + 'px';

    /*alert(frameImg.offsetTop);
    alert(frameImg.offsetHeight);
    alert(parseInt(imgSrc[0]['name-top']) / 100);*/
    //let textPos = imgSrc[0]['other-css'].split(",");
    //imgTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos[0])/100)) + 'px';
    //imgTxt.style.left = imgSrc[0]['name-left']
    //imgTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['name-top']) / 100)) + 'px';
    imgTxt.style.left = imgSrc[0]['name-left'];
    imgTxt.style.top = imgSrc[0]['name-top'];

    console.log("****")
    console.log(addName)
    console.log("****")
    let maxLettersadd = Math.ceil(width / (parseInt(imgSrc[0]['add-font-size'].replace('px', '')) / 2));
    if (addName.length < maxLettersadd) {
        addTxt.innerHTML = addName;
    } else {
        addTxt.innerHTML = wordWrap(addName, maxLettersadd);
    }
    addTxt.style.color = imgSrc[0]['add-font-color'];
    addTxt.style['font-size'] = imgSrc[0]['add-font-size'];
    addTxt.style['font-family'] = imgSrc[0]['add-font-type'];
    addTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    //addTxt.style.left = imgSrc[0]['add-left']
    //addTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['add-top']) / 100)) + 'px';
    addTxt.style.left = imgSrc[0]['add-left'];
    addTxt.style.top = imgSrc[0]['add-top'];

    let maxLettersloc = Math.ceil(width / (parseInt(imgSrc[0]['loc-font-size'].replace('px', '')) / 2));
    if (locName.length < maxLettersloc) {
        locTxt.innerHTML = locName;
    } else {
        locTxt.innerHTML = wordWrap(locName, maxLettersloc);
    }
    locTxt.style.color = imgSrc[0]['loc-font-color'];
    locTxt.style['font-size'] = imgSrc[0]['loc-font-size'];
    locTxt.style['font-family'] = imgSrc[0]['loc-font-type'];
    locTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    //locTxt.style.left = imgSrc[0]['loc-left']
    //locTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['loc-top']) / 100)) + 'px';

    locTxt.style.left = imgSrc[0]['loc-left'];
    locTxt.style.top = imgSrc[0]['loc-top'];

    let maxLettersemail = Math.ceil(width / (parseInt(imgSrc[0]['email-font-size'].replace('px', '')) / 2));
    if (emailName.length < maxLettersemail) {
        emailTxt.innerHTML = emailName;
    } else {
        emailTxt.innerHTML = wordWrap(emailName, maxLettersemail);
    }
    emailTxt.style.color = imgSrc[0]['email-font-color'];
    emailTxt.style['font-size'] = imgSrc[0]['email-font-size'];
    emailTxt.style['font-family'] = imgSrc[0]['email-font-type'];
    emailTxt.style['max-width'] = (width) + 'px';
    //let textPos = imgSrc[0]['other-css'].split(",");
    //addTxt.style.left = (frameImg.offsetLeft) + (frameImg.offsetWidth*(parseInt(textPos['add-left'])/100)) + 'px';
    //emailTxt.style.left = imgSrc[0]['email-left']
    //emailTxt.style.top = (frameImg.offsetTop) + (frameImg.offsetHeight * (parseInt(imgSrc[0]['email-top']) / 100)) + 'px';
    emailTxt.style.left = imgSrc[0]['email-left'];
    emailTxt.style.top = imgSrc[0]['email-top'];



    let initScale = 0;
    var handleTouchyPinch = function(e, $target, data) {
        if (initScale !== 0)
            initScale += data.scale - data.previousScale;
        else
            initScale = data.scale;
        setTimeout(() => {
            $('#uploadImg').css({ 'webkitTransform': 'scale(' + initScale + ',' + initScale + ')' });
        }, 50);
    };
    $('#frameImg').bind('touchy-pinch', handleTouchyPinch);

    dragElement(uploadImg, byId("draggableDiv"));
    //dragElement(imgTxt, byId("draggableText"));  
}

function wordWrap(text, maxLetters) {
    var strArr = text.split(' ');
    var str = ''
    if (strArr.length === 1) {
        var i = 0;
        while (i < text.length) {
            if (i > 0 && i % (maxLetters) === 0) {
                str += '<br/>';
            }
            str += text.charAt(i);
            i++;
        }
    } else {
        var temp = '';
        for (var x = 0; x < strArr.length; x++) {
            temp += strArr[x] + ' ';
            if (temp.length > maxLetters) {
                str += '<br/>' + strArr[x] + ' ';
                temp = '';
            } else {
                str += strArr[x] + ' ';
            }
        }
    }
    return str;
}

function resizeImage() {
    var ranger = byId('mySlider');
    $('#uploadImg').css({ 'webkitTransform': 'scale(' + ranger.value / 2 + ',' + ranger.value / 2 + ')' });
}

function dragElement(elmnt, dragContainer) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    dragContainer.addEventListener("mousedown", dragMouseDown, false);
    dragContainer.addEventListener("touchstart", dragMouseDown, false);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.type === "touchstart") {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        dragContainer.addEventListener("mouseup", closeDragElement, false);
        dragContainer.addEventListener("touchend", closeDragElement, false);
        dragContainer.addEventListener("mousemove", elementDrag, false);
        dragContainer.addEventListener("touchmove", elementDrag, false);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.type === "touchmove") {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        dragContainer.removeEventListener("mouseup", closeDragElement);
        dragContainer.removeEventListener("touchend", closeDragElement);
        dragContainer.removeEventListener("mousemove", elementDrag);
        dragContainer.removeEventListener("touchmove", elementDrag);
    }
}

function isStylePresent(elem, property) {
    return elem.style[property] && elem.style[property] !== "auto"
}

function mergeImgs() {
    let imgResolution = {
        width: 1920,
        height: 1080
    }
    byId("mergedImage").style.display = 'block';
    var canvas = byId('canvas');
    var context = canvas.getContext('2d');

    var img1, img1Ht, img1Wdth, img1Top, img1Left, posLeftImg1, posTopImg1;
    var img2, img2Ht, img2Wdth, img2Top, img2Left;
    var imgTxt, imgTxtHt, imgTxtWdth, imgTxtTop, imgTxtLeft, posLeftImgTxt, posTopImgTxt;
    var addTxt, addTxtHt, addTxtWdth, addTxtTop, addTxtLeft, posLeftAddTxt, posTopAddTxt;

    var locTxt, locTxtHt, locTxtWdth, locTxtTop, locTxtLeft, posLeftLocTxt, posTopLocTxt;
    var emailTxt, emailTxtHt, emailTxtWdth, emailTxtTop, emailTxtLeft, posLeftEmailTxt, posTopEmailTxt;

    img1 = byId('uploadImg');
    img1Ht = img1.getBoundingClientRect().height;
    img1Wdth = img1.getBoundingClientRect().width;
    img1Top = img1.getBoundingClientRect().top;
    img1Left = img1.getBoundingClientRect().left;

    img2 = byId('frameImg');
    img2Ht = img2.getBoundingClientRect().height;
    img2Wdth = img2.getBoundingClientRect().width;
    img2Top = img2.getBoundingClientRect().top;
    img2Left = img2.getBoundingClientRect().left;

    imgTxt = byId("imgTxt");
    imgTxtHt = imgTxt.getBoundingClientRect().height;
    imgTxtWdth = imgTxt.getBoundingClientRect().width;
    imgTxtTop = imgTxt.getBoundingClientRect().top;
    imgTxtLeft = imgTxt.getBoundingClientRect().left;

    addTxt = byId("addTxt");
    addTxtHt = addTxt.getBoundingClientRect().height;
    addTxtWdth = addTxt.getBoundingClientRect().width;
    addTxtTop = addTxt.getBoundingClientRect().top;
    addTxtLeft = addTxt.getBoundingClientRect().left;

    locTxt = byId("locTxt");
    locTxtHt = locTxt.getBoundingClientRect().height;
    locTxtWdth = locTxt.getBoundingClientRect().width;
    locTxtTop = locTxt.getBoundingClientRect().top;
    locTxtLeft = locTxt.getBoundingClientRect().left;

    emailTxt = byId("emailTxt");
    emailTxtHt = emailTxt.getBoundingClientRect().height;
    emailTxtWdth = emailTxt.getBoundingClientRect().width;
    emailTxtTop = emailTxt.getBoundingClientRect().top;
    emailTxtLeft = emailTxt.getBoundingClientRect().left;

    img2.style.opacity = 1;
    canvas.width = imgResolution.width;
    canvas.height = imgResolution.height;
    let fontSize = parseInt(imgSrc[0]['name-font-size'].replace('px', ''));
    let fontSizeadd = parseInt(imgSrc[0]['add-font-size'].replace('px', ''));

    let fontSizeloc = parseInt(imgSrc[0]['loc-font-size'].replace('px', ''));
    let fontSizeemail = parseInt(imgSrc[0]['email-font-size'].replace('px', ''));

    posLeftImg1 = img1Left - img2Left;
    posTopImg1 = img1Top - img2Top;

    posLeftImgTxt = imgTxtLeft - img2Left;
    posTopImgTxt = imgTxtTop - img2Top + fontSize;

    posLeftAddTxt = addTxtLeft - img2Left;
    posTopAddTxt = addTxtTop - img2Top + fontSizeadd;

    posLeftLocTxt = locTxtLeft - img2Left;
    posTopLocTxt = locTxtTop - img2Top + fontSizeloc;

    posLeftEmailTxt = emailTxtLeft - img2Left;
    posTopEmailTxt = emailTxtTop - img2Top + fontSizeemail;

    let horizontalResFactor = (imgResolution.width / img2Wdth);
    let verticalResFactor = (imgResolution.height / img2Ht);

    context.drawImage(img1, posLeftImg1 * horizontalResFactor, posTopImg1 * verticalResFactor, img1Wdth * horizontalResFactor, img1Ht * verticalResFactor);
    context.drawImage(img2, 0, 0, imgResolution.width, imgResolution.height);

    context.font = 'bold ' + parseInt(fontSize * horizontalResFactor) + 'px ' + imgSrc[0]['name-font-type'];
    context.fillStyle = imgSrc[0]['name-font-color'];

    var lines = imgTxt.innerHTML.split('<br>');
    var lineBrkFactor = imgTxt.offsetHeight / lines.length;
    for (var j = 0; j < lines.length; j++) {
        context.fillText(lines[j], posLeftImgTxt * horizontalResFactor, (posTopImgTxt + (j * (lineBrkFactor))) * verticalResFactor, imgTxt.offsetWidth * horizontalResFactor,
            imgTxt.offsetHeight * verticalResFactor);
    }


    context.font = 'bold ' + parseInt(fontSizeadd * horizontalResFactor) + 'px ' + imgSrc[0]['add-font-type'];
    context.fillStyle = imgSrc[0]['add-font-color'];

    var linesadd = addTxt.innerHTML.split('<br>');
    var lineBrkFactoradd = addTxt.offsetHeight / linesadd.length;
    for (var j = 0; j < linesadd.length; j++) {
        context.fillText(linesadd[j], posLeftAddTxt * horizontalResFactor, (posTopAddTxt + (j * (lineBrkFactoradd))) * verticalResFactor, addTxt.offsetWidth * horizontalResFactor,
            addTxt.offsetHeight * verticalResFactor);
    }

    context.font = 'bold ' + parseInt(fontSizeloc * horizontalResFactor) + 'px ' + imgSrc[0]['loc-font-type'];
    context.fillStyle = imgSrc[0]['loc-font-color'];

    var linesloc = locTxt.innerHTML.split('<br>');
    var lineBrkFactorloc = locTxt.offsetHeight / linesloc.length;
    for (var j = 0; j < linesloc.length; j++) {
        context.fillText(linesloc[j], posLeftLocTxt * horizontalResFactor, (posTopLocTxt + (j * (lineBrkFactorloc))) * verticalResFactor, locTxt.offsetWidth * horizontalResFactor,
            locTxt.offsetHeight * verticalResFactor);
    }


    context.font = 'bold ' + parseInt(fontSizeemail * horizontalResFactor) + 'px ' + imgSrc[0]['email-font-type'];
    context.fillStyle = imgSrc[0]['email-font-color'];

    var linesemail = emailTxt.innerHTML.split('<br>');
    var lineBrkFactoremail = emailTxt.offsetHeight / linesemail.length;
    for (var j = 0; j < linesemail.length; j++) {
        context.fillText(linesemail[j], posLeftEmailTxt * horizontalResFactor, (posTopEmailTxt + (j * (lineBrkFactoremail))) * verticalResFactor, emailTxt.offsetWidth * horizontalResFactor,
            emailTxt.offsetHeight * verticalResFactor);
    }

    var button = byId('generateImg');
    //var dataURL = canvas.toDataURL('image/jpg', 0.5);
    var dataURL = canvas.toDataURL('image/jpeg', 0.8);
    //console.log(dataURL);
    //button.href = dataURL;
    //button.click();
    $('#firstpreve').attr('src', dataURL);
    byId("mergedImage").style.display = 'none';
    byId("frameDiv").style.display = 'none';
    byId("downloadFramePage").style.display = 'none';
    byId("firstprevediv").style.display = 'flex';

    console.log("*************************************************", dataURL)
    localStorage.setItem('firstimg', dataURL);

    //idx = 1;
    //pages[routeArray[idx]]();
}



function secondmergeImgs() {
    let imgResolution = {
        width: 1920,
        height: 1080
    }
    byId("mergedImage").style.display = 'block';
    var canvas = byId('canvas');
    var context = canvas.getContext('2d');

    var img1, img1Ht, img1Wdth, img1Top, img1Left, posLeftImg1, posTopImg1;
    var img2, img2Ht, img2Wdth, img2Top, img2Left;
    var imgTxt, imgTxtHt, imgTxtWdth, imgTxtTop, imgTxtLeft, posLeftImgTxt, posTopImgTxt;
    var addTxt, addTxtHt, addTxtWdth, addTxtTop, addTxtLeft, posLeftAddTxt, posTopAddTxt;

    var locTxt, locTxtHt, locTxtWdth, locTxtTop, locTxtLeft, posLeftLocTxt, posTopLocTxt;
    var emailTxt, emailTxtHt, emailTxtWdth, emailTxtTop, emailTxtLeft, posLeftEmailTxt, posTopEmailTxt;
    var webTxt, webTxtHt, webTxtWdth, webTxtTop, webTxtLeft, posLeftWebTxt, posTopWebTxt;
    var mobileTxt, mobileTxtHt, mobileTxtWdth, mobileTxtTop, mobileTxtLeft, posLeftMobileTxt, posTopMobileTxt;

    img1 = byId('uploadImg');
    img1Ht = img1.getBoundingClientRect().height;
    img1Wdth = img1.getBoundingClientRect().width;
    img1Top = img1.getBoundingClientRect().top;
    img1Left = img1.getBoundingClientRect().left;

    img2 = byId('frameImg');
    img2Ht = img2.getBoundingClientRect().height;
    img2Wdth = img2.getBoundingClientRect().width;
    img2Top = img2.getBoundingClientRect().top;
    img2Left = img2.getBoundingClientRect().left;

    imgTxt = byId("imgTxt");
    imgTxtHt = imgTxt.getBoundingClientRect().height;
    imgTxtWdth = imgTxt.getBoundingClientRect().width;
    imgTxtTop = imgTxt.getBoundingClientRect().top;
    imgTxtLeft = imgTxt.getBoundingClientRect().left;

    addTxt = byId("addTxt");
    addTxtHt = addTxt.getBoundingClientRect().height;
    addTxtWdth = addTxt.getBoundingClientRect().width;
    addTxtTop = addTxt.getBoundingClientRect().top;
    addTxtLeft = addTxt.getBoundingClientRect().left;

    locTxt = byId("locTxt");
    locTxtHt = locTxt.getBoundingClientRect().height;
    locTxtWdth = locTxt.getBoundingClientRect().width;
    locTxtTop = locTxt.getBoundingClientRect().top;
    locTxtLeft = locTxt.getBoundingClientRect().left;

    emailTxt = byId("emailTxt");
    emailTxtHt = emailTxt.getBoundingClientRect().height;
    emailTxtWdth = emailTxt.getBoundingClientRect().width;
    emailTxtTop = emailTxt.getBoundingClientRect().top;
    emailTxtLeft = emailTxt.getBoundingClientRect().left;

    webTxt = byId("webTxt");
    webTxtHt = webTxt.getBoundingClientRect().height;
    webTxtWdth = webTxt.getBoundingClientRect().width;
    webTxtTop = webTxt.getBoundingClientRect().top;
    webTxtLeft = webTxt.getBoundingClientRect().left;

    mobileTxt = byId("mobileTxt");
    mobileTxtHt = mobileTxt.getBoundingClientRect().height;
    mobileTxtWdth = mobileTxt.getBoundingClientRect().width;
    mobileTxtTop = mobileTxt.getBoundingClientRect().top;
    mobileTxtLeft = mobileTxt.getBoundingClientRect().left;




    img2.style.opacity = 1;
    canvas.width = imgResolution.width;
    canvas.height = imgResolution.height;
    let fontSize = parseInt(imgSrc[0]['name-font-size'].replace('px', ''));
    let fontSizeadd = parseInt(imgSrc[0]['add-font-size'].replace('px', ''));

    let fontSizeloc = parseInt(imgSrc[0]['loc-font-size'].replace('px', ''));
    let fontSizeemail = parseInt(imgSrc[0]['email-font-size'].replace('px', ''));
    let fontSizeweb = parseInt(imgSrc[0]['web-font-size'].replace('px', ''));
    let fontSizemobile = parseInt(imgSrc[0]['mobile-font-size'].replace('px', ''));

    posLeftImg1 = img1Left - img2Left;
    posTopImg1 = img1Top - img2Top;

    posLeftImgTxt = imgTxtLeft - img2Left;
    posTopImgTxt = imgTxtTop - img2Top + fontSize;

    posLeftAddTxt = addTxtLeft - img2Left;
    posTopAddTxt = addTxtTop - img2Top + fontSizeadd;

    posLeftLocTxt = locTxtLeft - img2Left;
    posTopLocTxt = locTxtTop - img2Top + fontSizeloc;

    posLeftEmailTxt = emailTxtLeft - img2Left;
    posTopEmailTxt = emailTxtTop - img2Top + fontSizeemail;

    posLeftWebTxt = webTxtLeft - img2Left;
    posTopWebTxt = webTxtTop - img2Top + fontSizeweb;

    posLeftMobileTxt = mobileTxtLeft - img2Left;
    posTopMobileTxt = mobileTxtTop - img2Top + fontSizemobile;

    let horizontalResFactor = (imgResolution.width / img2Wdth);
    let verticalResFactor = (imgResolution.height / img2Ht);

    context.drawImage(img1, posLeftImg1 * horizontalResFactor, posTopImg1 * verticalResFactor, img1Wdth * horizontalResFactor, img1Ht * verticalResFactor);
    context.drawImage(img2, 0, 0, imgResolution.width, imgResolution.height);

    context.font = 'bold ' + parseInt(fontSize * horizontalResFactor) + 'px ' + imgSrc[0]['name-font-type'];
    context.fillStyle = imgSrc[0]['name-font-color'];

    var lines = imgTxt.innerHTML.split('<br>');
    var lineBrkFactor = imgTxt.offsetHeight / lines.length;
    for (var j = 0; j < lines.length; j++) {
        context.fillText(lines[j], posLeftImgTxt * horizontalResFactor, (posTopImgTxt + (j * (lineBrkFactor))) * verticalResFactor, imgTxt.offsetWidth * horizontalResFactor,
            imgTxt.offsetHeight * verticalResFactor);
    }


    context.font = 'bold ' + parseInt(fontSizeadd * horizontalResFactor) + 'px ' + imgSrc[0]['add-font-type'];
    context.fillStyle = imgSrc[0]['add-font-color'];

    var linesadd = addTxt.innerHTML.split('<br>');
    var lineBrkFactoradd = addTxt.offsetHeight / linesadd.length;
    for (var j = 0; j < linesadd.length; j++) {
        context.fillText(linesadd[j], posLeftAddTxt * horizontalResFactor, (posTopAddTxt + (j * (lineBrkFactoradd))) * verticalResFactor, addTxt.offsetWidth * horizontalResFactor,
            addTxt.offsetHeight * verticalResFactor);
    }

    context.font = 'bold ' + parseInt(fontSizeloc * horizontalResFactor) + 'px ' + imgSrc[0]['loc-font-type'];
    context.fillStyle = imgSrc[0]['loc-font-color'];

    var linesloc = locTxt.innerHTML.split('<br>');
    var lineBrkFactorloc = locTxt.offsetHeight / linesloc.length;
    for (var j = 0; j < linesloc.length; j++) {
        context.fillText(linesloc[j], posLeftLocTxt * horizontalResFactor, (posTopLocTxt + (j * (lineBrkFactorloc))) * verticalResFactor, locTxt.offsetWidth * horizontalResFactor,
            locTxt.offsetHeight * verticalResFactor);
    }


    context.font = 'bold ' + parseInt(fontSizeemail * horizontalResFactor) + 'px ' + imgSrc[0]['email-font-type'];
    context.fillStyle = imgSrc[0]['email-font-color'];

    var linesemail = emailTxt.innerHTML.split('<br>');
    var lineBrkFactoremail = emailTxt.offsetHeight / linesemail.length;
    for (var j = 0; j < linesemail.length; j++) {
        context.fillText(linesemail[j], posLeftEmailTxt * horizontalResFactor, (posTopEmailTxt + (j * (lineBrkFactoremail))) * verticalResFactor, emailTxt.offsetWidth * horizontalResFactor,
            emailTxt.offsetHeight * verticalResFactor);
    }



    context.font = 'bold ' + parseInt(fontSizeweb * horizontalResFactor) + 'px ' + imgSrc[0]['web-font-type'];
    context.fillStyle = imgSrc[0]['web-font-color'];

    var linesweb = webTxt.innerHTML.split('<br>');
    var lineBrkFactorweb = webTxt.offsetHeight / linesweb.length;
    for (var j = 0; j < linesweb.length; j++) {
        context.fillText(linesweb[j], posLeftWebTxt * horizontalResFactor, (posTopWebTxt + (j * (lineBrkFactorweb))) * verticalResFactor, webTxt.offsetWidth * horizontalResFactor,
            webTxt.offsetHeight * verticalResFactor);
    }



    context.font = 'bold ' + parseInt(fontSizemobile * horizontalResFactor) + 'px ' + imgSrc[0]['mobile-font-type'];
    context.fillStyle = imgSrc[0]['mobile-font-color'];

    var linesmobile = mobileTxt.innerHTML.split('<br>');
    var lineBrkFactormobile = mobileTxt.offsetHeight / linesmobile.length;
    for (var j = 0; j < linesmobile.length; j++) {
        context.fillText(linesmobile[j], posLeftMobileTxt * horizontalResFactor, (posTopMobileTxt + (j * (lineBrkFactormobile))) * verticalResFactor, mobileTxt.offsetWidth * horizontalResFactor,
            mobileTxt.offsetHeight * verticalResFactor);
    }







    var button = byId('generateImg');
    var dataURL = canvas.toDataURL('image/jpeg', 0.8);
    // console.log(dataURL);
    //button.href = dataURL;
    //button.click();
    $('#secondpreve').attr('src', dataURL);
    byId("mergedImage").style.display = 'none';
    byId("frameDiv").style.display = 'none';
    byId("downloadFramePage").style.display = 'none';
    byId("secondprevediv").style.display = 'flex';

    localStorage.setItem('secondimg', dataURL);



    //idx = 1;
    //pages[routeArray[idx]]();
}

function removeListeners(elem) {
    var old_element = elem;
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}