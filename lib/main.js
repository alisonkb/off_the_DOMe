const DomeWorthyFunctions = require ('./dome_worthy_functions.js');
const SNACKTIME = require('./snacktime.js');


function $l(arg, ...callbacks) {
  var whenLoaded = function(){
    callbacks.forEach ( (func) => {
      func();
    });
  };

  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    whenLoaded();
  } else {
    document.addEventListener("DOMContentLoaded", whenLoaded);
  }

  if (arg instanceof (HTMLElement) ) {
    return new DomeWorthyFunctions([arg]);
  } else if (arg instanceof Function) {
    const root = $l('.GAME-TIME');
    new SNACKTIME(root);
   } else {
    const elementList = document.querySelectorAll(arg);
    const elementArr = Array.from(elementList);
    return new DomeWorthyFunctions(elementArr);
  }
}



$l.ajax = function(optionsArg) {
  const defaults = {
    url: document.URL,
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function () {
      alert ('this is a success');
    },
    error: function () {
      alert ('this is a error');
    }
  };

  $l.extend(defaults, optionsArg);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      defaults.success();
    }
  };
  xhr.open(`${defaults.method}`, `${defaults.url}`);

  xhr.onload = function () {

    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response); 
  };

  const optionalData = {};
  xhr.send(optionalData);

};


$l(function () {
  let snackgame;
});

window.$l = $l;
