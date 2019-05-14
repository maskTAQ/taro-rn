
import React from 'react';
import { Component } from '../../platform';


import { TButton, View, Text, Image } from '../../ui'
import { navigate } from '../../actions';
import './item.scss';
export default class Item extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    goDetail(id) {
        const { g } = this;
        navigate({
            routeName: 'notice-details',
            params: {
                id,
                '缩略图': g('缩略图'),
                '标题': g('标题'),
                '阅读量': g('阅读量')
            }
        });
    }
    render() {
        const { g } = this;
        return (
            <TButton onClick={this.goDetail.bind(this, g('主键'))}>
                <View className='item'>
                    <View className="item-icon-box">
                        <Image src={g('缩略图')} className="item-icon" />
                    </View>
                    <View className="item-content">
                        <Text className="item-title">{g('标题')}</Text>
                        <View className="item-content-bottom">
                            <Text className="item-time">{g('状态')}</Text>
                            <Text className="item-readme">已有{g('阅读量')}人次阅读</Text>
                        </View>
                    </View>
                </View>
            </TButton>
        )
    }
}