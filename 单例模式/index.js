
var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxyCreater = function (Ctor) {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new Ctor(html);
    }
    return instance;
  }
}

var ProxySingletonCreateDiv = ProxyCreater(CreateDiv)
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b); // true