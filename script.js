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
function navToBookmarks() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: "chrome://bookmarks/#1"});
  });

}
function navToAbout() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: "chrome://version"});
  });

}
$(document).ready(function() {
    $('#extensions').click(navToExtensions);
    $('#settings').click(navToSettings);
    $('#bookmarks').click(navToBookmarks);
    $('#history').click(navToHistory);
    $('#about').click(navToAbout);
});
