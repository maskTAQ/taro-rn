

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, Text, TInput } from '../../components'
import Item from './item';

import './main.scss';
import imgs from './img/logo.png'

const item = {

};


export default class MyDemand extends Component {


    state = {
        title: "",
        title1: "",
        content: "",
        current: 0,
        url: "../share/img/logo.png"
    };
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });

    }
    onchangeInput(title) {
        if (title.length > 10) {
            return
        }
        else {
            this.setState({
                title
            });
        }

        // this.state.title1 = title 
    }
    onchangecontent(content) {
        if (content.length > 20) {
            return
        }
        else {
            this.setState({
                content
            });
        }

        // this.state.title1 = title 
    }
    render() {
        const { list, itemDescList, itemKeyList, current, title, content } = this.state;
        // const tabList = ["我的需求", "我的报价"];
        return (
            <View className='container'>
                <Text className="tit">自定义分享链接内容</Text>
                <View className="box">
                    <Text>标题</Text>
                    <TInput className="tinput" value={title} onInput={this.onchangeInput} />
                </View>
                <View className="box">
                    <Text>内容</Text>
                    <view className="tinput">
                    <TInput className="tinput" value={content} onInput={this.onchangecontent} />                    
                    </view>
                </View>
                <view className="line"></view>
                <View>
                    <Text className="">分享说明：</Text>
                    <View>
                        <Text className="">1.自定义分享微信朋友圈/好友卡片标题，填写对应展示如图</Text>
                        <view />
                        <view>
                            <Text className="">2.精选批次，请先筛选后在进行分享</Text>
                        </view>
                    </View>
                    <View className="card">
                        <view className="cardTit">
                            <Text className="">{title}</Text>
                        </view>
                        <view className="cardCon">
                            <Text className="">{content}</Text>
                        </view>
                        <view className="cardlogos">
                            <Image src={imgs} className="logosImg" />
                        </view>
                    </View>
                </View>
            </View>
        )
    }
}

