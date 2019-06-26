# 项目目标
    基于taro源码编译成小程序、h5的目标下，复用编译输出的rn代码。

# 为什么不采用taro自带的React Native 端开发流程开发流程
   
   [React Native 端开发流程](https://nervjs.github.io/taro/docs/react-native.html)它是基于`Expo`的实现,不支持原生的 SDK。所以没法发挥rn的能力。复用taro编译输出的rn端代码,集成到我们自己搭建的rn依赖环境，来实现90%以上的代码服用了。


# 需要你在rn端处理什么

    1.涉及到与运行环境有关的代码，需要自己判断调用不同的实现。
    2.准守我们制定的准则（组件结构、不能使用的css语法）来确保多端渲染一致。

## 准则

    1.使用我们提供的基础组件来开发业务组件。

## 已有基础组件
    
    1.View
    2.Button
    3.Text
    4.Image
    5.Tag
    5.Input

## bugs

    1.PickerView 设置value无效
    2.componentWillReceiveProps 在android在组件挂载后不会立即触发
    