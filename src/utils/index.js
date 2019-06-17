import Taro, { Component } from '@tarojs/taro';
export { default as Tip } from './tip';
export { default as MQTT } from './paho-mqtt.js';
export { default as Public } from './public';
export { default as Storage } from './Storage';
export function scan() {
    return Taro.scanCode({
        onlyFromCamera: true
    }).then(res => JSON.parse(res.result))
}
const createdClientId = function () {
    var timestamp = Date.parse(new Date());
    //获取n位随机数,随机来源chars
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    var client_id = generateMixed(6) + timestamp;
    return client_id;
}

const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
const clientId = createdClientId();
export function split(s = '', n) {
    if (s.length < n) {
        return s;
    } else {
        return s.substring(0, n) + '...';
    }
}
export { clientId, windowWidth, windowHeight }