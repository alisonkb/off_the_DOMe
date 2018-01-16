class DomWorthyFunctions {
  constructor(arrayOfHtmlElements) {
    this.arrayOfHtmlElements = arrayOfHtmlElements;
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
