/*!
*
 */
(function(){
"use strict";
    console.log("working");
    
    var obj = document.getElementsByTagName('gd-appbar');
    var options = JSON.parse(obj[0].innerText);
    
    console.log(options);
})();