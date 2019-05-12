import React from 'react';
import { Component, connect } from '../../platform';

import { View, Text } from '../../ui';
import { productTypesLabel } from '../../constants';
import './index.scss'

const list = [
    { label: "年度", key: "年度", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "产地", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" },
    { label: "马值", key: "马克隆值" },
    { label: "叶屑", key: "叶屑", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "平均含杂",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "回潮",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "整齐度",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }];
@connect(({ data }) => ({ user: data.user }))
export default class DemanidItem extends Component {
    static options = {
        addGlobalClass: true
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }

    render() {
        const { g } = this;
        const cottonType = productTypesLabel[g('棉花云报价类型')];
        return (
            <View className="container">
                <View className="top">
                    {
                        ['进口棉￥', '进口棉$'].includes(cottonType) ?
                            (
                                <Text className="title">报价号({g('需求号')})  {g('产地')} {g('类型')}</Text>
                            ) :
                            (
                                <Text className="title">需求编号({g('需求编号')}) {g('产地')} {g('类型')}</Text>
                            )
                    }
                </View>
                <View className="center">
                    {
                        list.filter(({ noInclude = [], includes = 'all' }) => {
                            if (includes === 'all') {
                                return !noInclude.includes(cottonType)
                            } else {
                                return !noInclude.includes(cottonType) && includes.includes(cottonType)
                            }

                        }).map(item => {
                            const { label, key } = item;
                            return (
                                <View className="item">
                                    <Text className="item-label">{label}</Text>
                                    <Text className="item-value">{g(key)}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {this.props.children}
            </View>
        )
    }
}


