# 单例模式

定义:保证一个类仅有一个实例，并提供一个访问它的全局访问点。

应用场景：window对象，JQuery，登录浮窗等

实现方式：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象

## 简单实现（第一版）
```js
  var Singleton = function (name) {
    this.name = name;
    this.instance = null;
  };

  Singleton.prototype.getName = function () {
    alert(this.name);
  };
  Singleton.getInstance = function (name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  };
  var a = Singleton.getInstance('sven1');
  var b = Singleton.getInstance('sven2');

  alert(a === b); // true
```
> instances作为单例，私有方法getInstance可创建实例。

## 简单实现（第二版）
```js
var Singleton = function (name) {
  this.name = name;
};
Singleton.prototype.getName = function () {
  alert(this.name);
};
Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();
```
> 上一版instance与业务逻辑混杂在一起，改良后，利用闭包保存instance，代码更整洁

我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单。
但有一个问题，就是增加了这个类的“不透明性”。
Singleton 类的使用者必须知道这是一个单例类，
跟以往通过 new XXX 的方式来获取对象不同，
这里偏要使用 Singleton.getInstance 来获取对象。

## 透明的单例模式（第一版）
```js
var CreateDivFn = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
var a = new CreateDivFn('sven1');
var b = new CreateDivFn('sven2');
alert(a === b); // true
```
> 同样采用了闭包，但是单例的逻辑和业务逻辑混杂在一起，所以有了下一个版本的升级

## 透明的单例模式（第二版）
```js
var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b); // true
```
> 用代理实现了透明的单例，ProxySingletonCreateDiv 作为代理的类。这里还有一点耦合，我们继续优化

```js

var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var createProxy = function (Ctor) {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new Ctor(html);
    }
    return instance;
  }
}

var ProxySingletonCreateDiv = createProxy(CreateDiv)

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b); // true
```
> 这里用一个代理的工厂来生成代理函数

## 惰性单例（非常重要）
惰性单例指的是在需要的时候才创建对象实例。

*场景分析*： 
如果登录浮窗总是一开始就被创建好，那么很有可能将白白浪费一些 DOM 节点。
如果用户点击登录按钮的时候才开始创建该浮窗，虽然现在达到了惰性的目的，但失去了单例的效果。当我们每次点击登录按钮的时候，都会创建一个新的登录浮窗。虽然我们可以在点击浮窗上的关闭按钮时把这个浮窗从页面中删除掉，但这样频繁地创建和删除节点明显是不合理的，也是不必要的。
通用的惰性单例应该是这样的逻辑，用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象

具体实例，请查看本目录下index.html文件。其中核心代码：
```js
  var getSingle = function (fn) {
    var result;
    return function () {
      console.log('res', result)
      return result || (result = fn.apply(this, arguments));
    }
  };
```