import React from 'react';


import { Component } from "react";
import { View, Text, Image } from '../../components';

import mainStyleSheet from "./main_styles";
import url from './img/img.png';

import ShareWechard from './img/ShareWechar.png';
import pengyq from './img/pengyq.png';

var _styleSheet = mainStyleSheet;
let NoticeDetails = class NoticeDetails extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      recommendNewList: ['推荐文章1', '推荐文章2', '推荐文章3']
    }, _temp;
  }

  render() {
    const {recommendNewList} = this.state;
    return <View style={_styleSheet["container"]}>
                <View style={_styleSheet["title"]}>
                    <Text style={_styleSheet["title-text"]}>中国棉花质量指数我是标题我是标题</Text>
                </View>
                <View style={_styleSheet["dataTime-container"]}>
                    <Text style={_styleSheet["time"]}>2019-2-17</Text>
                    <Text style={_styleSheet["read-num"]}>已有23659人阅读</Text>
                </View>
                <View style={_styleSheet["news-details"]}>
                    <Image src={url} style={_styleSheet["Imgdetails"]}></Image>
                    <Text style={_styleSheet["new-detailsText"]}>
                        文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                </Text>
                <View style={_styleSheet["share"]}>
                <Image src={ShareWechard} style={_styleSheet["share-img"]}></Image>
                <Image src={pengyq} style={_styleSheet["share-img"]}></Image>
                <Image src={ShareWechard} style={_styleSheet["share-img"]}></Image>
                </View>
                </View>
                <View style={_styleSheet["NewList-container"]}>
                    <View style={_styleSheet["title"]}>
                        <Text style={_styleSheet["title-text"]}>推荐文章</Text>
                    </View>
                    {recommendNewList.map((item, index) => {
          return <View style={_styleSheet["newList"]}>
                                    <Text style={_styleSheet["new-text"]}>{item}</Text>

                                </View>;
        })}
                    <View style={_styleSheet["more"]}>
                        <Text style={_styleSheet["more-text"]}>查看更多》</Text>
                    </View>
                </View>
            </View>;
  }
};
export { NoticeDetails as default };