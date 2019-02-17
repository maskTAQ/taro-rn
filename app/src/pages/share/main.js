import React from 'react';


import { Component } from "react";
import { View, Text, TInput, Image, TButton } from '../../components';

import mainStyleSheet from "./main_styles";
import imgs from './img/logo.png';

var _styleSheet = mainStyleSheet;
let Share = class Share extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      title: "请输入标题",
      title1: "",
      content: "请输入内容",
      current: 0
    }, this.onchangeInput = title => {
      if (title.length > 10) {
        return;
      } else {
        this.setState({
          title
        });
      }

      // this.state.title1 = title 
    }, this.onchangecontent = content => {
      if (content.length > 20) {
        return;
      } else {
        this.setState({
          content
        });
      }

      // this.state.title1 = title 
    }, _temp;
  }

  render() {
    const { list, itemDescList, itemKeyList, current, title, content } = this.state;
    // const tabList = ["我的需求", "我的报价"];
    return <View style={_styleSheet["container"]}>
                <View style={_styleSheet["title-wrapper"]}>
                    <Text style={_styleSheet["title-text"]}>自定义分享链接内容</Text>
                </View>
                <View style={_styleSheet["line"]}>
                    <Text style={_styleSheet["line-label"]}>标题</Text>
                    <TInput value={title} onInput={this.onchangeInput} style={_styleSheet["line-input"]} />
                </View>
                <View style={_styleSheet["line"]}>
                    <Text style={_styleSheet["line-label"]}>内容</Text>
                    <TInput value={content} onInput={this.onchangecontent} style={_styleSheet["line-input"]} />
                </View>

                <View style={_styleSheet["share"]}>
                    <Text style={_styleSheet["share-title"]}>分享说明：</Text>
                    <View>
                        <Text style={_styleSheet["share-desc"]}>1.自定义分享微信朋友圈/好友卡片标题，填写对应展示如图</Text>
                        <View />
                        <View>
                            <Text style={_styleSheet["share-desc"]}>2.精选批次，请先筛选后在进行分享</Text>
                        </View>
                    </View>
                    <View style={_styleSheet["card"]}>
                        <View>
                            <Text style={_styleSheet["cardTit"]}>{title}</Text>
                        </View>
                        <View>
                            <Text style={_styleSheet["cardCon"]}>{content}</Text>
                        </View>
                        <View style={_styleSheet["cardlogos"]}>
                            <Image src={imgs} style={_styleSheet["logosImg"]} />
                        </View>
                    </View>
                    <TButton>
                        <View style={_styleSheet["btn-share"]}>
                            <Text style={_styleSheet["btn-shart-text"]}>确定分享</Text>
                        </View>

                    </TButton>
                </View>
            </View>;
  }
};
export { Share as default };