// const usernameInput = document.querySelector("#username");
// const passwordInput = document.querySelector("#password");
const upload_button = document.querySelector("#upload");
/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    authCredentials: {
      username: usernameInput.value,
      password: passwordInput.value
    }
  });
}
function upload(){
  const fileList = this.files;
  const usernameInput = document.querySelector("#file");
  const upload_status = document.querySelector("#upload_status");
  console.log(usernameInput.files)
  upload_status.innerHTML ="uploaded"
  const reader = new FileReader();
  let constent = ""
  reader.onload = (eve)=>{
    console.log(eve.target.result)
    constent+=eve.target.result
  };
  reader.onloadend = ()=>{
    let lines = constent.split('\r\n')
    console.log(lines.length)
    browser.storage.local.set({'pdflines': lines.length})
    lines.forEach((value, key)=>{
      // console.log("Items: ", items)
      let key_store = "pdfprinter_"+key;
      browser.storage.local.set({[key_store]: value})
    })
    
  }
  reader.readAsText(usernameInput.files[0]);
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  console.log(restoredSettings)
  let i = 0
  const gettingStoredSettings = browser.storage.local.get('pdfprinter_'+0);
  gettingStoredSettings.then(store=>{
    console.log(store['pdfprinter_'+0])
    var creating = browser.tabs.create({
      url: store['pdfprinter_'+0]
    });
    creating.then(onCreated, onError);
  })
  
}

function onError(e) {
  console.error(e);
}
function logOnCompleted(details) {
  console.debug(`onCompleted: ${details.url}`);
}

browser.webNavigation.onCompleted.addListener(logOnCompleted);
// /*
// On opening the options page, fetch stored settings and update the UI with them.
// */
const gettingStoredSettings = browser.storage.local.get('pdflines');
gettingStoredSettings.then(updateUI, onError);

// /*
// On blur, save the currently selected settings.
// */
upload_button.addEventListener("click", upload);
// passwordInput.addEventListener("blur", storeSettings);

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(function() {
  
});
