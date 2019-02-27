import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'
import MQTT from "./paho-mqtt.js";


var username = "312312";
var client = new MQTT.Client("ws://120.78.176.129:8083/mqtt", "clientId_" + Math.random().toString(36).substr(2));//建立客户端实例 
console.log(client, 'MQTT');
client.connect({ onSuccess: onConnect });//连接服务器并注册连接成功处理事件  
function onConnect() {
  console.log("onConnected  Client");
  client.subscribe("/topic");//订阅主题  

  //发送消息给服务器 
  var message = new MQTT.Message("hello");
  message.destinationName = "/topic";
  client.send(message);
}
client.onConnectionLost = onConnectionLost;//注册连接断开处理事件  
client.onMessageArrived = onMessageArrived;//注册消息接收处理事件  
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
    console.log("与服务器断开连接");
  }
}
function onMessageArrived(message) {
  console.log("收到服务器消息:" + message.payloadString);
}
export default class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    return <Main />
  }
}

