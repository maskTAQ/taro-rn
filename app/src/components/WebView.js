import React, { Component } from "react";
import { View, WebView, Platform } from "react-native";
import PropTypes from "prop-types";

//import WebViewAndroid from "react-native-webview-android";
import { Page } from "src/components";
//import styles from "./style";
export default class Wv extends Component {
  static defaultProps = {};
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func
  };
  state = {};
  sendMessage = (message) => {
    this.webview.postMessage(message);
  }
  render() {
    const { source, onMessage = () => { }, ...others } = this.props;
    /* eslint-disable */
    const patchPostMessageFunction = function () {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };

      window.postMessage = patchedPostMessage;
    };

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";


    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={source}
          onMessage={e => onMessage(e.nativeEvent.data)}
          ref={e => this.webview = e}
          injectedJavaScript={patchPostMessageJsCode}
          {...others}
        />
      </View>
    );
  }
}
