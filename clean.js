//CLEAN FUNCTIONS
//Author: Kyle Dixon
    //Used in strip.js to manipulate the page html (as a string)

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