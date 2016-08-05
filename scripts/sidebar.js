//ALWAYS IMPORT JQUERY FIRST.
$(document).ready(function() {
	$('#extensions').click(navToExtensions);
    $('#settings').click(navToSettings);
    $('#history').click(navToHistory);
    $('#about').click(navToAbout);
    $('#credits').click(navToCredits);
});

//Functions that link to other `chrome://` urls
function navToHistory() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "chrome://history"});
    });

}
function navToExtensions() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "chrome://extensions"});
    });

}
function navToSettings() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "chrome://settings"});
    });

}
function navToAbout() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "chrome://version"});
    });
}
function navToCredits() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "credits.html"});
    });
}