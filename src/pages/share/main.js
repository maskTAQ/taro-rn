

import { Component } from '@tarojs/taro';
import { View, Text, TInput, Image, TButton } from '../../components'

import './main.scss';
import imgs from './img/logo.png'

export default class Share extends Component {


    state = {
        title: "请输入标题",
        title1: "",
        content: "请输入内容",
        current: 0,
    };
    onchangeInput = title => {
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
    onchangecontent = content => {
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
                <View className="title-wrapper">
                    <Text className="title-text">自定义分享链接内容</Text>
                </View>
                <View className="line">
                    <Text className="line-label">标题</Text>
                    <TInput className="line-input" value={title} onInput={this.onchangeInput} />
                </View>
                <View className="line">
                    <Text className="line-label">内容</Text>
                    <TInput className="line-input" value={content} onInput={this.onchangecontent} />
                </View>

                <View className="share">
                    <Text className="share-title">分享说明：</Text>
                    <View>
<<<<<<< HEAD
                        <Text className="explain">1.自定义分享微信朋友圈/好友卡片标题，填写对应展示如图</Text>
                        <View />
                        <View>
                            <Text className="explain">2.精选批次，请先筛选后在进行分享</Text>
=======
                        <Text className="share-desc">1.自定义分享微信朋友圈/好友卡片标题，填写对应展示如图</Text>
                        <View />
                        <View>
                            <Text className="share-desc">2.精选批次，请先筛选后在进行分享</Text>
>>>>>>> dc54b0486c1051442c11ef53deb854434b49ab3b
                        </View>
                    </View>
                    <View className="card">
                        <View className="">
                            <Text className="cardTit">{title}</Text>
                        </View>
                        <View className="">
                            <Text className="cardCon">{content}</Text>
                        </View>
                        <View className="cardlogos">
                            <Image src={imgs} className="logosImg" />
                        </View>
                    </View>
                    <TButton >
                        <View className="btn-share">
                            <Text className="btn-shart-text">确定分享</Text>
                        </View>

                    </TButton>
                </View>
            </View>
        )
    }
}

