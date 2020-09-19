console.log("Loaded extension");

var unblock = false;

function blockRequest(details) {
   return {cancel: true};
}

function updateFilters(urls) {
   chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: ["*://*.facebook.com/*","*://*.youtube.com/*", "*://*.facebook.net/*","*://*.chegg.com/*"]}, ['blocking']);
}

updateFilters();

chrome.runtime.onInstalled.addListener(function(request) {    
    setInterval(function () {
        chrome.tabs.onCreated.addListener(
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => { 
                url = tabs[0].url;
                if (url == "http://localhost:3000/submit"){
                    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
                }
                console.log(url);}));
    }, 500);

});