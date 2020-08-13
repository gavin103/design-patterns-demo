# 模板模式

这是设计模式中为数不多的，紧靠继承就能完成的设计模式了

**意图**：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。
模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

## 冲咖啡和泡茶
冲咖啡的实现: 
(1) 把水煮沸
(2) 用沸水冲泡咖啡 
(3) 把咖啡倒进杯子 
(4) 加糖和牛奶
```js
class Coffee {
  boilWater() {
    console.log('把水煮沸')
  }
  brewCoffeeGriends() {
    console.log('用沸水冲泡咖啡')
  }
  pourInCup() {
    console.log('把咖啡倒进杯子')
  }
  addSugarAndMilk() {
    console.log('加糖和牛奶')
  }
  init() {
    this.boilWater()
    this.brewCoffeeGriends()
    this.pourInCup()
    this.addSugarAndMilk()
  }
}
const coffee = new Coffee();
coffee.init();
```
泡茶的实现:
(1) 把水煮沸
(2) 用沸水浸泡茶叶 
(3) 把茶水倒进杯子 
(4) 加柠檬
```js
class Tea {
  boilWater() {
    console.log('把水煮沸')
  }
  steepTeaBag() {
    console.log('用沸水浸泡茶叶')
  }
  pourInCup() {
    console.log('把茶水倒进杯子')
  }
  addLemon() {
    console.log('加柠檬')
  }
  init() {
    this.boilWater()
    this.steepTeaBag()
    this.pourInCup()
    this.addLemon()
  }
}
const tea = new Tea();
tea.init();
```

将两种饮料的冲泡过程，做一个抽象的分离：
- 原料不同。一个是咖啡，一个是茶，但我们可以把它们都抽象为“饮料”。
- 泡的方式不同。咖啡是冲泡，而茶叶是浸泡，我们可以把它们都抽象为“泡”。
- 加入的调料不同。一个是糖和牛奶，一个是柠檬，但我们可以把它们都抽象为“调料”。

抽象的实现：
(1) 把水煮沸
(2) 用沸水冲泡饮料
(3) 把饮料倒进杯子
(4) 加调料
```js
class Beverage {
  boilWater() {
    console.log('把水煮沸');
  };
  brew() { };
  pourInCup() { };
  addCondiments() { };
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup(); this.addCondiments();
  };
};

```
到底谁才是所谓的模板方法呢?答案是 Beverage.prototype.init,
该方法中封装了子类的算法框架，它作 为一个算法的模板，指导子类以何种顺序去执行哪些方法。


## 抽象类
在Typescript中模仿Java，设计了抽象类。抽象类只能被继承而不能被实例化。

## 使用场景
React中的生命周期，例如componentDidMound, componentDidUptate等。
是在父类React.Component中定义了这些函数的执行顺序和时机。
这就是模板方法的应用。
生命周期函数又可以称为钩子方法。

## 好莱坞原则
不知道大家有没有注意到，父类中规定了钩子函数的执行时机，也就是说控制权交给了父类，这不就是控制反转了吗。
对于设计模式来说，我们给它去了一个新名字叫 好莱坞原则。

为啥叫好莱坞原则呢？
一个小演员去找导演试镜，试镜后导演说，你回去吧，有结果了通知你。
如果接下来小演员隔三差五就去找导演问，选中我没啊？ 导演就烦了。
导演就会跟他说：  你不要一直来找我，我们有结果只会一定通知你。
这就是好莱坞原则。
也就是这句话“我们有结果了一定会通知你”。

好莱坞原则应用：
**回调函数**，回调函数的执行实际，是调用它的方法规定的。
**发布订阅模式**，发布者会把消息推送给订阅者，这取代了原先不断去 fetch 消息的形式。

