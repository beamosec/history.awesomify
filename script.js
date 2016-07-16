//Functions that link to other `chrome://` urls
function navToExtensions() {
    console.log('running');
    window.location = "chrome://extensions";
}
$(document).ready(function() {
    $('#extensions').click(navToExtensions);
});