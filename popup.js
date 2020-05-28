//Popup Function
//Author: Kyle Dixon

var checkPageButton = document.getElementById('getRecipe');
checkPageButton.addEventListener("click", function() {
  chrome.tabs.executeScript({
    file: 'jquery-3.5.1.min.js'
  });
  chrome.tabs.executeScript({
    file: 'strip.js'  //Get the content on the current page
  });
  /*
  chrome.tabs.executeScript(tab.ib, {
    file: 'clean.js'  //serves as a psuedo module as modules are not allowed on content scripts
  });
  */
}, false);
