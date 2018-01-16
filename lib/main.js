const DomeWorthyFunctions = require ('./dome_worthy_functions.js');


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

  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      defaults.success();
    }
  };
  // step 2 - specify path and verb
  xhr.open(`${defaults.method}`, `${defaults.url}`);

  // step 3 - register a callback
  xhr.onload = function () {

    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For json api calls, this will be a json string
  };

  // step 4 - send off the request with optional data
  const optionalData = {};
  xhr.send(optionalData);

};


window.$l = $l;
