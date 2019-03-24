import Taro, { Component } from '@tarojs/taro';
export { default as Tip } from './tip';
export {default as MQTT} from './paho-mqtt.js';
export function scan(){
    // return new Promise((resolve,reject)=>{
    //     Taro.scanCode({
    //         onlyFromCamera:true
    //     })
    // })
    return Taro.scanCode({
        onlyFromCamera:true
    }).then(res=>JSON.parse(res.result))
}