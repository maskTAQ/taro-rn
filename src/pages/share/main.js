

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, Text, TInput, Image, TButton } from '../../components'
import Item from './item';

import './main.scss';
import imgs from './img/logo.png'

const item = {

};


export default class MyDemand extends Component {


    state = {
        title: "请输入标题",
        title1: "",
        content: "请输入内容",
        current: 0,
        url: "../share/img/logo.png"
        // url: "",
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
                <View className="title">
                    <Text className="tit">自定义分享链接内容</Text>
                </View>
                <View className="box">
                    <Text>标题</Text>
                    <TInput className="tinput" value={title} onInput={this.onchangeInput} />
                </View>
                <View className="box">
                    <Text>内容</Text>
                    <TInput className="tinput" value={content} onInput={this.onchangecontent} />
                </View>
                <View className="explainline">
                    <Text className="explain">分享说明：</Text>
                    <View>
                        <Text className="explain">1.自定义分享微信朋友圈/好友卡片标题，填写对应展示如图</Text>
                        <view />
                        <view>
                            <Text className="explain">2.精选批次，请先筛选后在进行分享</Text>
                        </view>
                    </View>
                    <View className="card">
                        <View className="cardTit">
                            <Text className="">{title}</Text>
                        </View>
                        <View className="cardCon">
                            <Text className="">{content}</Text>
                        </View>
                        <View className="cardlogos">
                            <Image src={imgs} className="logosImg" />
                        </View>
                    </View>
                    <TButton>
                        <View className="btn-share">
                            <Text>确定分享</Text>
                        </View>

                    </TButton>
                </View>
            </View>
        )
    }
}

