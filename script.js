//Functions that link to other `chrome://` urls
function navToExtensions() {
    console.log('extensions!');
    chrome.tabs.create({url:"chrome://extensions"});
}
function navToSettings() {
  console.log('settings!');
  chrome.tabs.create({url:"chrome://settings"});
}
function navToBookmarks() {
  console.log('bookmarks!');
  chrome.tabs.create({url:"chrome://bookmarks"});
}
$(document).ready(function() {
    $('#extensions').click(navToExtensions);
    $('#settings').click(navToSettings);
    $('#bookmarks').click(navToBookmarks);
});
