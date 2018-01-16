/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomWorthyFunctions = __webpack_require__ (1);

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
    return new DomWorthyFunctions([arg]);
  } else {
  const elementList = document.querySelectorAll(arg);
  const elementArr = Array.from(elementList);
  return new DomWorthyFunctions(elementArr);
}
}

$l.extend = function(mainObj, ...otherObjs) {
  otherObjs.forEach ((obj) => {
    Object.keys(obj).forEach ((key) => {
      mainObj[key] = obj[key];
    });
  });
};

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

//const a = window.$l('li');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomWorthyFunctions {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }
}

DomWorthyFunctions.prototype.html = function (str) {
  if (str !== undefined) {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].innerHTML = str;
    }
  } else {
    return this.htmlArr[0].innerHTML;
  }
};

DomWorthyFunctions.prototype.empty = function () {
  for (let i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i].innerHTML = "";
  }
};

DomWorthyFunctions.prototype.append = function (arg) {
  if (typeof arg === "string") {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].innerHTML += arg;
    }
  } else if (arg instanceof (HTMLElement)) {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].innerHTML += arg.outerHTML;
    }
  } else {
    for (let i = 0; i < this.htmlArr.length; i++) {
      for (let j = 0; j < arg.htmlArr.length; j++) {
        this.htmlArr[i].innerHTML += arg.htmlArr[j].outerHTML;
      }
    }
  }
};

DomWorthyFunctions.prototype.attr = function (attrName) {
  return this.htmlArr[0].getAttribute(attrName);
};

DomWorthyFunctions.prototype.addClass = function (newClass) {
  for (let i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i].classList.add(newClass);
  }
};

DomWorthyFunctions.prototype.removeClass = function (oldClass) {
  for (let i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i].classList.remove(oldClass);
  }
};

DomWorthyFunctions.prototype.children = function () {
  let newCollection = [];

  for (let i = 0; i < this.htmlArr.length; i++) {
    newCollection.push(Array.from(this.htmlArr[i].children));
  }

  return new DomWorthyFunctions(newCollection);
};

DomWorthyFunctions.prototype.parent = function () {
  let parentArr = [];

  for (let i = 0; i < this.htmlArr.length; i++) {
    parentArr.push(this.htmlArr[i].parentElement);
  }

  return new DomWorthyFunctions(parentArr);
};

DomWorthyFunctions.prototype.find = function (selector) {
  let findCollection = [];

  for (let i = 0; i < this.htmlArr.length; i++) {
    findCollection.push(this.htmlArr[i].querySelectorAll(selector));
  }

  return new DomWorthyFunctions(findCollection);
};

DomWorthyFunctions.prototype.remove = function () {
  this.empty();
  this.htmlArr = [];
};

DomWorthyFunctions.prototype.on = function (method, callback) {
  for (let i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i].method = callback;
    this.htmlArr[i].addEventListener(method, callback);
  }
};

DomWorthyFunctions.prototype.off = function (method) {
  for (let i = 0; i < this.htmlArr.length; i++) {
    this.htmlArr[i].removeEventListener(method, this.htmlArr[i].method);
    delete this.htmlArr[i].method;
  }
};

module.exports = DomWorthyFunctions;

/***/ })
/******/ ]);
