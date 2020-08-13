# 装饰器模式

装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。

**主要解决问题**：一般的，我们为了扩展一个类经常使用继承方式实现。
由于继承为类引入静态特征，并且随着扩展功能的增多，子类会很膨胀。

**意图**：动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。

**现实中的例子**：
纯粹的咖啡，不加糖不加奶，就是美式。
纯粹的咖啡加多点的牛奶和少点的奶沫就是拿铁。
纯粹的咖啡加少点牛奶，多点奶沫就是卡布奇诺。
加牛奶和奶沫的动作就可以在装饰器中实现

**ES6中的装饰器**
```js
  class MyClass {
    //...
  }
  function testable(target) {
    target.isTestable = true
  }
  testable(MyClass)
  MyClass.isTestable // true
```
使用@操作符（语法糖）
```js
  function testable(target) {
    target.isTestable = true
  }

  @testable
  class MyClass {
    //...
  }
  MyClass.isTestable // true
```
装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

**用AOP装饰函数**

AOP即面向切面编程

首先给出 Function.prototype.before 方法和 Function.prototype.after 方法:
```js
Function.prototype.before = function (beforefn) {
  // 保存原函数的引用
  var __self = this;
  // 返回包含了原函数和新函数的"代理"函数
  return function () {
    // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    beforefn.apply(this, arguments);
    // 执行原函数并返回原函数的执行结果，
    // 并且保证 this 不被劫持
    return __self.apply(this, arguments);
  }
}

Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}
```
因为before和after返回的也是函数，所以可以链式调用，例如：
```js
window.onload = (
  window.onload || function () {
  }).after(function () {
    alert(2);
  }).after(function () {
    alert(3);
  }).after(function () {
    alert(4);
  });
```

用 AOP 装饰函数的技巧在实际开发中非常有用。
不论是业务代码的编写，还是在框架层面， 我们都可以把行为依照职责分成粒度更细的函数，
随后通过装饰把它们合并到一起，这有助于我们编写一个松耦合和高复用性的系统。

例子1：
用after实现埋点解耦合
```js
<html>
<button tag="login" id="button">点击打开登录浮层</button> 
<script>
  Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
      var ret = __self.apply(this, arguments);
      afterfn.apply(this, arguments);
      return ret;
    }
  };
  var showLogin = function () {
    console.log('打开登录浮层');
  }
  var log = function () {
    console.log('上报标签为: ' + this.getAttribute('tag'));
  }
  showLogin = showLogin.after(log); // 打开登录浮层之后上报数据
  document.getElementById('button').onclick = showLogin;
</script> 
</html>
```
>showLogin 函数里，负责打开登录浮层，log赋值数据上报

例子2：
用before做表单校验
```js
<html> 
<body>
用户名:<input id="username" type="text"/>
密码: <input id="password" type="password"/>
<input id="submitBtn" type="button" value="提交"> 
</body>
<script>
  Function.prototype.before = function (beforefn) {
    var __self = this;
    return function () {
      if (beforefn.apply(this, arguments) === false) {
        // beforefn 返回 false 的情况直接 return，不再执行后面的原函数 
        return;
      }
      return __self.apply(this, arguments);
    }
  }
  var validata = function () {
    if (username.value === '') {
      alert('用户名不能为空');
      return false;
    }
    if (password.value === '') {
      alert('密码不能为空');
      return false;
    }
  }
  var formSubmit = function () {
    var param = {
      username: username.value,
      password: password.value
    }
    ajax('http:// xxx.com/login', param);
  }

  submitBtn.onclick = formSubmit.before(validata);
</script>
</html>