import React from 'react';
import { Component } from "react";
import { View, WebView,Image } from 'react-native';
var ReactNative = require('react-native');
import { TButton } from 'components';
export default class C extends Component {
    state={
        uri:''
    }
    save = () => {
        ReactNative.takeSnapshot(this.webview, { format: 'png', quality: 1 }).then(
            (uri) => this.setState({ uri: uri })
        ).catch(
            (error) => alert(error)
        );

    }
    render() {
        console.log(this.state,'--')
        return (
            <View style={{ flex: 1 }}>
                <WebView ref={e => this.webview = e} source={require('./canvas.html')} style={{ borderWidth: 1, borderColor: 'red', }} />
                <TButton onClick={this.save}>保存</TButton>
            <Image source={this.state} style={{flex:1}}/>
            </View>
        )
    }
}