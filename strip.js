//Strip JS Page
//Author: Kyle Dixon
//Gets relevant information from recipe site page via partial class name searches
    //Uses clean.js to manipulate strings
    //passes new html code to new window with download button

$(function() {
    var index, index2;

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
        title = $("h1[class*='itle']").map(function() {
            return $(this).html();
        });
        title = JSON.stringify(title);
        title = clean(title);
        if (title.substr(7, 10) === "prevObject") {
            title = $("[class*='recipe-title']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("[class*='recipe-hed']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("h1[class*='eadline']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("h2[class*='itle']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("h3[class*='itle']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        if (title.substr(7, 10) === "prevObject") {
            title = $("[class*='name']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        //look for heading
        if (title.substr(7, 10) === "prevObject") {
            title = $("h1[class*='eading']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        //look for summary
        if (title.substr(7, 10) === "prevObject") {
            title = $("h1[class*='summary']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
        }
        //look for non-header title (most generic search)
        if (title.substr(7, 10) === "prevObject") {
            title = $("[class*='itle']").map(function() {
                return $(this).html();
            });
            title = JSON.stringify(title);
            title = clean(title);
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
        ingr = $("ul[class*='ngredients']").map(function() {
            return $(this).html();
        });
        ingr = JSON.stringify(ingr);
        ingr = cleanIngr(ingr);
        if (ingr.substr(7, 10) === "prevObject") {
            ingr = $("[class*='ngredients-container']").map(function() {     
                return $(this).html();
            });
            ingr = JSON.stringify(ingr);
            ingr = cleanIngr(ingr);
        }
        if (ingr.substr(7, 10) === "prevObject") {
            ingr = $("[class*='ngredient-group']").map(function() {
                return $(this).html();
            });
            ingr = JSON.stringify(ingr);
            ingr = cleanIngr(ingr);
        }
        if (ingr.substr(7, 10) === "prevObject") {
            ingr = $("[class*='ngredients']").map(function() {
                return $(this).html();
            });
            ingr = JSON.stringify(ingr);
            ingr = cleanIngr(ingr);
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
        inst = $("[class*='nstructions']").map(function() {
            return $(this).html();
        });
        inst = JSON.stringify(inst);
        inst = clean(inst);
        //Look for directions
        if (inst.substr(7, 10) === "prevObject") {
            inst = $("ul[class*='StepsList']").map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = clean(inst);
        }
        //Look for directions
        if (inst.substr(7, 10) === "prevObject") {
            inst = $("[class*='irection']").map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = clean(inst);
        }
        //look for method (2 parter)
        if (inst.substr(7, 10) === "prevObject") {
            var instLab = $("[class*='Method']").map(function() {
                return $(this).html();
            });
            instLabString = JSON.stringify(instLab);
            instLab = clean(instLabString);
            inst = $("[class*='Method__m-Body']").map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = instLab + clean(inst);
        }
        //legacy right now
        if (inst.substr(7, 10) === "prevObject") {
            var inst = $("[class*='teps']").map(function() {
                return $(this).html();
            });
            inst = JSON.stringify(inst);
            inst = clean(inst);
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

