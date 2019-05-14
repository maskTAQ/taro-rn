import React from './node_modules/react';
import { Component } from '../../platform';
import { TButton, View, Text, Image } from '../../ui'

import { getArticleContent } from '../../api';
import { StatusBox } from '../../components';
import './main.scss';
import { navigate } from '../../actions';
import ShareWechard from './img/ShareWechar.png'
import pengyq from './img/pengyq.png'



export default class NoticeDetails extends Component {

    state = {
        status: 'init',
        data: null
    };
    componentWillMount() {
        this.getContent();
    }
    g = k => {
        const { params } = this.props.navigation.state;
        return params[k] || '';
    }
    getContent() {
        const { id } = this.props.navigation.state.params;
        this.setState({
            status: 'loading',
            data: null
        });
        getArticleContent({ '主键': id })
            .then(res => {
                this.setState({
                    status: 'success',
                    data: res
                });
            })
            .catch(e => {
                this.setState({
                    status: 'error',
                    msg: e
                });
            })
    }
    back() {
        navigate({
            routeName: 'cotton-information'
        });
    }
    render() {
        const { g } = this;
        const { status, data } = this.state;
        return (
            <View className='container'>
                <View className="title">
                    <Text className="title-text">{g('标题')}</Text>
                </View>
                <View className="datatime-container">
                    <Text className="time">{g('标题')}</Text>
                    <Text className="read-num">已有{g('阅读量')}人次阅读</Text>
                </View>
                <View className="news-details">
                    <Image className="img-details" src={g('缩略图')}></Image>
                    <StatusBox status={status}>
                        {
                            status === 'success' && (
                                <Text className="new-detailstext">
                                    {data.list[0][data.key['内容']]}
                                </Text>
                            )
                        }
                    </StatusBox>

                    <View className="share">
                        <button open-type="share" class="share-button">
                            <Image className="share-img" src={ShareWechard}></Image>
                        </button>
                    </View>
                </View>
                <View className="newlist-container">
                    <View className="title">
                        <Text className="title-text">推荐文章</Text>
                    </View>
                    {
                        // this.state.recommendNewList.map((item, index) => {
                        //     return (

                        //         <View className="newlist">
                        //             <Text className="new-text">{item}</Text>

                        //         </View>

                        //     )
                        // })
                    }
                    <TButton onClick={this.back}>
                        <View className="more">
                            <Text className="more-text">查看更多>>></Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}

