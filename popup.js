//Popup Function
//Author: Kyle Dixon
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('btn');
  checkPageButton.addEventListener('click', function(tab) {
    chrome.tabs.executeScript(tab.ib, {
      file: 'jquery-3.5.1.min.js'
    });
    chrome.tabs.executeScript(tab.ib, {
      file: 'strip.js'  //Get the content on the current page
    });
    chrome.tabs.executeScript(tab.ib, {
      file: 'clean.js'  //serves as a psuedo module as modules are not allowed on content scripts
    });
  }, false);
}, false);