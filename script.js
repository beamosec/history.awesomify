var open = true;
$(document).ready(function() {
    checkWinSize();
    $('#extensions').click(navToExtensions);
    $('#settings').click(navToSettings);
    $('#history').click(navToHistory);
    $('#about').click(navToAbout);
    $('#credits').click(navToCredits);
    $('.slider').draggable({
        axis: 'x',
        scroll: "false",
        containment: ".slider-track",
        cursor: 'grab'
    });
    $('.expand').click(toggleMenu);
    $(window).on('resize', checkWinSize);
});
function toggleMenu() {
    console.log('functional');
    $('.collapsible').css('display', open ? 'block' : 'none');
    $('.collapsible > *').css('display', open ? 'block': 'none');
    open = !open;
}
function checkWinSize() {
    var bool = window.innerWidth < 1100;
    $('.expand').css('display', bool ? 'inline' : 'none');
    $('#menu-icon').css('display', bool ? 'inline' : 'none');
    $('.collapsible').css('display', bool ? 'none' : 'inline');
    $('.collapsible > *').css('display', bool ? 'none' : 'inline');
}
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
