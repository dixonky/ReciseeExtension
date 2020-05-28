//Strip JS Page
//Author: Kyle Dixon
//Gets relevant information from recipe site page via partial class name searches
    //Uses clean.js to manipulate strings
    //passes new html code to new window with download button

$(function() {
    var index, index2;
    var cleanArray = ["1","2","3","4","5","6","7","8","9","alt", "epper", "eggs", "cup","easpoon","pound","ablespoon","tsp","tbsp","Tbsp","c.","clove"," lb ", "whole","small", "medium", "large", "oz.","splash","Splash"];

    //Generic clean function
    function clean(str) {
        var cutAt = '\",\"';
        str = str.toString();
        str = str.substring(0, str.indexOf(cutAt));
        str = str.replace(/\\n|\\t|href|Hide Photos|<img[^>]*>|Advertisement|SCROLL FOR MORE CONTENT/g, '');
        str = str.replace(/Method|Methods|Directions|Preparation/g, 'Instructions');
        str = str.replace(/<ol/g, '<div');
        str = str.replace(/<\/ol/g, '</div');
        str = str.slice(6);
        return str;
    }

    //Clean function for ingredients
    function cleanIngr(str) {
        var cutAt = '\",\"';
        str = str.toString();
        str = str.substring(0, str.indexOf(cutAt));
        str = str.replace(/\\n|\\t|href|<img[^>]*>|Advertisement/g, '');
        str = str.slice(6);
        var fields = str.split("</div");
        str = fields[0];
        if(typeof fields[1] === 'undefined') {
        }
        else {
            //Get relevant divs from fields
            for(var i = 1; i < fields.length; i++) {
                var str2 = fields[i];
                var strTest = str2.toString();
                for(var j = 0; j<cleanArray.length;j++){
                    if (strTest.includes(cleanArray[j])) {
                        str += fields[i];
                        break;
                    }
                }
            }
        }
        for(var i =0; i < str.length;i++) {
            if(str.charAt(i-1) === ' ' && str.charAt(i) === '>' && str.charAt(i+1) === ' ') {
                str = str.substr(0, i-1) + str.substr(i+1);
                i = 0;
            }
            if(str.charAt(i-1) === '>' && str.charAt(i) === '>' && str.charAt(i+1) === '<') {
                str = str.substr(0, i-1) + str.substr(i+1);
                i = 0;
            }
            if(str.charAt(i-1) === '>' && str.charAt(i) === '>' && str.charAt(i+1) === ' ' && str.charAt(i+2) === '<') {
                str = str.substr(0, i-1) + str.substr(i+1);
                i = 0;
            }
        }
        str = str.replace(/\<li/g, '<li style="display:list;white-space:nowrap;" ');
        str = str.replace(/<button/g, '<button style="display:hidden;"');
        str = str.replace(/Save \$/g, '<br><br>');
        return str;
    }

    //Clean function for allrecipes site
    function cleanAll(str) {
        var cutAt = '\",\"';
        str = str.toString();
        str = str.substring(0, str.indexOf(cutAt));
        //Remove input links
        for(var i =1; i < str.length;i++) {
            if(str.charAt(i-1) === '<' && str.charAt(i) === 'i' && str.charAt(i+1) === 'n') {
                index = (i-1);
                index2 = null;
            }
            if(str.charAt(i) === '>') {
                index2 = (i);
            }
            if (index && index2 ) {
                str = str.substr(0, index) + str.substr(index2);
                index = null;
                index2 = null;
                i = 1;
            }
        }
        str = str.replace(/\\n|\\t|href|<img[^>]*>|Advertisement|Add a note|Print/g, '');
        str = str.replace(/                                          >                                          |                                  >                                  |                                >                            /g, '');
        str = str.replace(/Method|Directions/g, 'Instructions');
        str = str.slice(6);
        var fields = str.split("</div");
        str = fields[0];
        if(typeof fields[1] === 'undefined') {
        }
        else {
            //Get relevant divs from fields
            for(var i = 1; i < fields.length; i++) {
                var str2 = fields[i];
                var strTest = str2.toString();
                for(var j = 0; j<cleanArray.length;j++){
                    if (strTest.includes(cleanArray[j])) {
                        str += fields[i];
                        break;
                    }
                }
            }
        }
        index = null;
        index2 = null;
        for(var i =1; i < str.length;i++) {
            if(str.charAt(i-1) === '<' && str.charAt(i) === 'a' && str.charAt(i+1) === ' ') {
                index = (i);
                index2 = null;
            }
            if(str.charAt(i-1) === '/' && str.charAt(i) === 'a' && str.charAt(i+1) === '>') {
                index2 = (i);
            }
            if (index && index2 ) {
                str = str.substr(0, index-2) + str.substr(index2+2);
                index = null;
                index2 = null;
                i = 1;
            }
        }
        return str;
    }

    
    var titleSearch = ["itle","recipe-title","recipe-hed","eadline","name","eading","summary"];
    var ingrSearch = ["ngredients","ngredients-container","ngredient-group"];
    var instSearch = ["nstructions","StepsList","irection","Method","Method__m-Body","teps"];
    //DOCUMENT SEARCH FUNCTIONS
    //When searching for class names via partials, put the more specific searches first and the general searches last
        //if speed is an issue, makes the if statements nested
    //Get the URL of the page
    var url = document.URL;
    url = "<h5>"+ url.toString()+ "<h5>";


    //Get the Title of the page
    var title;
    if (url.includes("allrecipes")){
        title = $("h1[class*='eadline']").map(function() {
            return $(this).html();
        });
        title = JSON.stringify(title);
        title = clean(title);
        if (title.substr(7, 10) === "prevObject") {
            title = $("h1[class*='main']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("h1[id*='main']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("[class*='itle']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
    }
    else {
        for(var i=0; i<=titleSearch.length;i++){
            title = $('h1[class*='+titleSearch[i]+']').map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
            if(title.substr(7, 10) === "prevObject"){
                continue;
            }
            else{
                break;
            }
        }
        if(title.substr(7, 10) === "prevObject"){
            for(var i=0; i<=titleSearch.length;i++){
                title = $('h2[class*='+titleSearch[i]+']').map(function() {
                    return $(this).html();
                });
                title = JSON.stringify(title);
                title = clean(title);
                if(title.substr(7, 10) === "prevObject"){
                    continue;
                }
                else{
                    break;
                }
            }
        }
        if(title.substr(7, 10) === "prevObject"){
            for(var i=0; i<=titleSearch.length;i++){
                title = $('h3[class*='+titleSearch[i]+']').map(function() {
                    return $(this).html();
                });
                title = JSON.stringify(title);
                title = clean(title);
                if(title.substr(7, 10) === "prevObject"){
                    continue;
                }
                else{
                    break;
                }
            }
        }
        if(title.substr(7, 10) === "prevObject"){
            for(var i=0; i<=titleSearch.length;i++){
                title = $('[class*='+titleSearch[i]+']').map(function() {
                    return $(this).html();
                });
                title = JSON.stringify(title);
                title = clean(title);
                if(title.substr(7, 10) === "prevObject"){
                    continue;
                }
                else{
                    break;
                }
            }
        }
        if (title.substr(7, 10) === "prevObject") {
            title = "TITLE NOT FOUND<br>"      
        }           
    }

    //Get the Ingredient List of the page
    //AllRecipes requires unique manipulation
    var ingr;
    if (url.includes("allrecipes")){
        ingr = $("[class*='ingredients-section']").map(function() {
            return $(this).html();
        });
        ingr = JSON.stringify(ingr);
        ingr = cleanAll(ingr);
        if (ingr.substr(7, 10) === "prevObject") {
            ingr = $("[class*='list-ingredient']").map(function() {
                return $(this).html();
            });
            ingr = JSON.stringify(ingr);
            ingr = cleanAll(ingr);
        }
    }
    else {
        for(var i=0; i<=ingrSearch.length;i++){
            ingr = $('ul[class*='+ingrSearch[i]+']').map(function() {
                return $(this).html();
            });
            ingr = JSON.stringify(ingr);
            ingr = cleanIngr(ingr);
            if(ingr.substr(7, 10) === "prevObject"){
                continue;
            }
            else{
                break;
            }
        }
        if(ingr.substr(7, 10) === "prevObject"){
            for(var i=0; i<=ingrSearch.length;i++){
                ingr = $('[class*='+ingrSearch[i]+']').map(function() {
                    return $(this).html();
                });
                ingr = JSON.stringify(ingr);
                ingr = cleanIngr(ingr);
                if(ingr.substr(7, 10) === "prevObject"){
                    continue;
                }
                else{
                    break;
                }
            }
        }
        if (ingr.substr(7, 10) === "prevObject") {
            ingr="INGREDIENTS NOT FOUND<br>"
        }
    }


    //Get the Instructions of the page
    var inst;
    //AllRecipes requires unique manipulation
    if (url.includes("allrecipes")){
        inst = $("[class*='instructions-section']").map(function() {
            return $(this).html();
        });
        inst = JSON.stringify(inst);
        inst = cleanAll(inst);
        if (inst.substr(7, 10) === "prevObject") {
            inst = $("[class*='irection']").map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = cleanAll(inst);
        }
    }
    else{
        for(var i=0; i<=instSearch.length;i++){
            inst = $('ul[class*='+instSearch[i]+']').map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = clean(inst);
            if(inst.substr(7, 10) === "prevObject"){
                continue;
            }
            else{
                break;
            }
        }
        if(inst.substr(7, 10) === "prevObject"){
            for(var i=0; i<=instSearch.length;i++){
                inst = $('[class*='+instSearch[i]+']').map(function() {
                    return $(this).html();
                });
                inst = JSON.stringify(inst);
                inst = clean(inst);
                if(inst.substr(7, 10) === "prevObject"){
                    continue;
                }
                else{
                    break;
                }
            }
        }
        if (inst.substr(7, 10) === "prevObject") {
            inst = "INSTRUCTIONS NOT FOUND<br>";
        }
    }


    //Add formatting changes to specific sections
    //Remove link for title if present
    index = null;
    index2 = null;  
    for(var i =1; i < title.length;i++) {
        if(title.charAt(i-1) === '"' && title.charAt(i) === '>') {
            index = (i+1);
            index2 = null;
        }
        if(title.charAt(i) === '<' && title.charAt(i+1) === '/') {
            index2 = (i);
        }
        if (index && index2 ) {
            title = title.substr(index, index2);
            index = null;
            index2 = null;
            i = 1;
        }
    }
    index = null;
    index2 = null;
    for(var i =1; i < title.length;i++) {
        if(title.charAt(i) === '<') {
            index = (i);
            index2 = null;
        }
        if(title.charAt(i) === '>') {
            index2 = (i);
        }
        if (index && index2 ) {
            title = title.substr(0, index) + title.substr(index2+1);
            index = null;
            index2 = null;
            i = 1;
        }
    }

    //Check if there is a label for the ingredient section
    if(!ingr.includes("Ingredients") && !ingr.includes("INGREDIENTS")) {
        ingr = "<h3>Ingredients</h3>" +ingr;
    }

    //Check if there is a label for the instruction section
    if(!inst.includes("Instructions") && !inst.includes("Directions") && !inst.includes("Method") && !inst.includes("DIRECTIONS") && !inst.includes("INSTRUCTIONS")) {
        inst = "<h3>Instructions</h3>" +inst;
    }

    //Check if the article doesnt use labels or divs
    if(inst.includes("NOT FOUND") && ingr.includes("NOT FOUND")) {
        inst = " ";
        ingr = "<br><br>SITE DOES NOT USE HTML LABELS :\(<br><br>";
    }


    //Put it all together
    var total;
    ingr = ingr;
    total= '<h3>' + title + '</h3>' + url + ingr + inst;
    total = total.replace(/h2|h4/g, 'h3');
    //Remove svg links
    for(var i =1; i < total.length;i++) {
        if(total.charAt(i-1) === '<' && total.charAt(i) === 's' && total.charAt(i+1) === 'v') {
            index = (i-1);
            index2 = null;
        }
        if(total.charAt(i) === '>') {
            index2 = (i);
        }
        if (index && index2 ) {
            total = total.substr(0, index) + total.substr(index2);
            index = null;
            index2 = null;
            i = 1;
        }
    }
    //Add a download link at the bottom of the new page
    var dwnld = '<a onclick='+'"this.href=' +"'data:text;charset=UTF-8,'"+'+encodeURIComponent(document.documentElement.innerText)'+'" href="#" download="'+title+'.txt"'+'style="text-decoration: none;width:150px;height:auto;border-radius:5px;display: block;font-size:125%;margin-top: 20px;"'+'>Download Recipe</a>'
    total = total + dwnld;
    var newWindow = window.open();
    //Remove blank or empty nodes
    let doc = new DOMParser().parseFromString(total, 'text/html');
    doc.querySelectorAll('*').forEach(function(node) {
        if (node.innerText == null || node.innerText ==""){
            node.remove();
        }
    });
    //Send doc to new window
    newWindow.document.write(new XMLSerializer().serializeToString(doc));
});

