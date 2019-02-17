

import { Component } from '@tarojs/taro';
import { View, Text, TInput, Image, TButton } from '../../components'

import './main.scss';
import url from './img/img.png'
import Share from '../share/main';
import ShareWechard from './img/ShareWechar.png'
import pengyq from './img/pengyq.png'



export default class noticeDetails extends Component {


    state = {
        recommendNewList: [
            '推荐文章1', '推荐文章2', '推荐文章3'
        ],
    };

    render() {
        const { } = this.state;
        return (
            <View className='container'>
                <View className="title">
                    <Text className="title-text">中国棉花质量指数我是标题我是标题</Text>
                </View>
                <View className="dataTime-container">
                    <Text className="time">2019-2-17</Text>
                    <Text className="read-num">已有23659人阅读</Text>
                </View>
                <View className="news-details">
                    <Image className="Imgdetails" src={url}></Image>
                    <Text className="new-detailsText">
                        文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                文章内容文章内容文章内容文章内容文章内容文章内容
                </Text>
                <View className="share">
                <Image className="share-img" src={ShareWechard}></Image>
                <Image className="share-img" src={pengyq}></Image>
                <Image className="share-img" src={ShareWechard}></Image>
                </View>
                </View>
                <View className="NewList-container">
                    <View className="title">
                        <Text className="title-text">推荐文章</Text>
                    </View>
                    {
                        recommendNewList.map((item, index) => {
                            return (

                                <View className="newList">
                                    <Text className="new-text">{item}</Text>

                                </View>

                            )
                        })
                    }
                    <View className="more">
                        <Text className="more-text">查看更多》</Text>
                    </View>
                </View>
            </View>
        )
    }
}

