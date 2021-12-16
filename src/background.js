function onCaptured(imageUri) {
    console.log(imageUri);
    var downloadUrl = "https://example.org/image.png";
    var blob = b64toBlob(imageUri);
    var url = window.URL.createObjectURL(blob);
    var downloading = browser.downloads.download({
        url: url,
        filename: 'my-image-again.jpeg',
        conflictAction: 'uniquify'
    });
    downloading.then(onStartedDownload, onFailed);
}

function onError(error) {
    console.log(`Error: ${error}`);
}
function onStartedDownload(id) {
    console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
    console.log(`Download failed: ${error}`);
}


function b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}



function logOnCompleted(details) {
    setTimeout(()=>{
        var capturing = browser.tabs.captureTab();
    capturing.then(onCaptured, onError);
    },10000)
    // console.log("ss")
    // browser.tabs.print();
    // browser.tabs.saveAsPDF({})
    // .then((status) => {
    //   console.log(status);
    // });
}
browser.webNavigation.onCompleted.addListener(logOnCompleted);