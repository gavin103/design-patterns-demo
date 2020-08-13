# 适配器模式

生活中的适配器：
- 电源适配器 220v-12v
- 视频转接头 hdmi转vga

适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁。

**解决问题** 适配器模式主要用来解决两个已有接口之间不匹配的问题。
它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。
适配器模式不需要改变已有的接口，就能够使它们协同作用。

这是在代码中随处可见的，举个例子：

1. 百度地图SDK中，将google坐标或者原始坐标转成百度坐标的方法
   > http://lbsyun.baidu.com/jsdemo.htm#a5_2

   ![18.jpg](https://i.loli.net/2020/08/13/UDBQaNLnytsm9wT.jpg)
   ![20.jpg](https://i.loli.net/2020/08/13/OhM9FXgroPqiDmp.jpg)
  
2. query-string 模块
   > https://www.npmjs.com/package/query-string

   它有parse和stringify方法，parse就是将请求参数字符串，转为对象。stringify就是将对象转为请求参数字符串。
   ![27.jpg](https://i.loli.net/2020/08/13/zIok8E64spQ3Pry.jpg)