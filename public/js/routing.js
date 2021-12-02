let pages = {
    "FirstPage": FirstPage,
    "landingPage": landingPage,
    "uploadPage": uploadPage,
    "framelistPage": framelistPage,
    "framedownloadPage": framedownloadPage,
    "frameListPagesecond": frameListPagesecond,
    "firstprevediv": firstprevediv,
    "strim": strim,
}
let pageSectionMap = {
    "FirstPage": "rdioscreen",
    "landingPage": "userFormDiv",
    "uploadPage": "imageFormDiv",
    "framelistPage": "frameListPage",
    "framedownloadPage": "downloadFramePage",
    "frameListPagesecond": "frameListPagesecond",
    "firstprevediv": "firstprevediv",
    "strim": "strim"
}
let sectionDisplay = {
    "rdioscreen": "inherit",
    "userFormDiv": "inherit",
    "imageFormDiv": "flex",
    "frameListPage": "flex",
    "frameListPagesecond": "flex",
    "downloadFramePage": "inherit",
    "firstprevediv": "flex",
    "strim": "block"
}
let routeArray = ["FirstPage", "landingPage", "uploadPage", "framelistPage", "framedownloadPage", "strim"];
let idx = 0;

function strim() {
    // location = location
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.strim).style.display = 'block';
}
function FirstPage() {
    // location = location
    byId(pageSectionMap.FirstPage).style.display = sectionDisplay[pageSectionMap.FirstPage];
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.strim).style.display = 'none';
}

function landingPage() {
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = sectionDisplay[pageSectionMap.landingPage];
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.strim).style.display = 'none';
}

function uploadPage() {
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = sectionDisplay[pageSectionMap.uploadPage];
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.strim).style.display = 'none';
}

function framelistPage() {
    document.querySelector("body").style.overflow = 'auto';
    removeListeners(byId("draggableDiv"));
    removeListeners(byId("draggableText"));
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = sectionDisplay[pageSectionMap.framelistPage];
    byId(pageSectionMap.framedownloadPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.strim).style.display = 'none';
}

function framedownloadPage() {
    document.querySelector("body").style.overflow = 'hidden';
    byId(pageSectionMap.FirstPage).style.display = 'none';
    byId(pageSectionMap.landingPage).style.display = 'none';
    byId(pageSectionMap.uploadPage).style.display = 'none';
    byId(pageSectionMap.framelistPage).style.display = 'none';
    byId(pageSectionMap.firstprevediv).style.display = 'none';
    byId(pageSectionMap.framedownloadPage).style.display = sectionDisplay[pageSectionMap.framedownloadPage];
    byId(pageSectionMap.strim).style.display = 'none';
    removeListeners(byId("draggableDiv"));
    removeListeners(byId("draggableText"));
}

var CapturePopStateHandler = function (e) {
    if (e.state && e.state._fileexplorer) {
        // if (idx == 0) {
        //     for (i = 0; i < 1; i++) {
        //         location.reload();
        //         break;
        //     }
        // }
        if (e.state._fileexplorer === 'back') {
            window.history.forward();
            console.log("b1")
            if (idx == 10) {
                idx = 2
                byId("videPlayer").src = ""
                pages[routeArray[idx]]();
            }
            else if (idx > 0) {
                console.log(idx);
                idx--;
                pages[routeArray[idx]]();
                console.log(idx);
                console.log("b2")
                // if (idx == 0) {
                //     console.log("reload");
                //     location.reload();
                // }
            } else if (idx == 0) {
                console.log(idx);
                window.history.go(-3);
                console.log("b3")
            }
        } else if (e.state._fileexplorer === 'forward') {
            window.history.back();
            console.log("f1")
            if (idx < routeArray.length - 1) {
                idx++;
                pages[routeArray[idx]]();
                console.log("f2")
            }
        }
    }
};

// Sets up three history items and places the user in the middle of those three.
window.history.pushState({ _fileexplorer: 'back' }, document.title);
window.history.pushState({ _fileexplorer: 'main' }, document.title);
window.history.pushState({ _fileexplorer: 'forward' }, document.title);
window.history.back();

window.addEventListener('popstate', CapturePopStateHandler, true);