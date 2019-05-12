import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { View, Text } from '../../ui'
import './card.scss';

const data = {
    a: '186包',
    b: '--',
    c: '41.11',
    d: '4.4',
    e: '214.1kg',
    f: '2.1',
    i: '41.23',
    j: '32.21',

    t1: '白棉2级',
    a1: '44.6',
    b1: '55.4',

    t2: '',
    a2: '10.8',
    b2: '55.4',
    c2: '20.2',

    t3: 'A',
    a3: '3.6',
    b3: '10.2',
    c3: '85.5',
    d3: '0.5',

    t4: '',
    a4: '77.8',
    b4: '84.3',
    c4: '80.5',

    t5: '',
    a5: '26',
    b5: '84.3',
    c5: '80.5',
    d5: '77.6'
};
const cardList = [
    {
        title: '总览',
        key: 't',
        list: [
            {
                key: '包数',
                label: '合计包数'
            },
            {
                key: '执行标准',
                label: '质量标识'
            },
            {
                key: '合计毛重',
                label: '合计毛重'
            },
            {
                key: '平均回潮',
                label: '平均回潮'
            },
            {
                key: '合计皮重',
                label: '合计皮重'
            },
            {
                key: '平均含杂',
                label: '平均含杂'
            },
            {
                key: '合计净重',
                label: '合计净重'
            },
            {
                key: '合计公重',
                label: '合计公重'
            }
        ]
    },
    {
        title: '主体颜色级',
        key: '主体颜色级',
        list: [

            {
                key: '白棉1级',
                label: '白棉1级',
                type: 'visible'
            },
            {
                key: '白棉2级',
                label: '白棉2级',
                type: 'visible'
            },
            {
                key: '白棉3级',
                label: '白棉3级',
                type: 'visible'
            },
            {
                key: '白棉4级',
                label: '白棉4级',
                type: 'visible'
            },
            {
                key: '白棉5级',
                label: '白棉5级',
                type: 'visible'
            },
            {
                key: '白棉6级',
                label: '白棉6级',
                type: 'visible'
            }
        ]
    },
    {
        title: '主体长度级',
        key: '长度级',
        list: [
            {
                key: '27毫米',
                label: '27mm',
                type: 'visible'
            },
            {
                key: '27毫米',
                label: '27mm',
                type: 'visible'
            },
            {
                key: '29毫米',
                label: '29mm',
                type: 'visible'
            },
            {
                key: '30毫米',
                label: '30mm',
                type: 'visible'
            },
            {
                key: '31毫米',
                label: '31mm',
                type: 'visible'
            },
            {
                key: '32毫米',
                label: '32mm',
                type: 'visible'
            }
        ]
    },
    {
        title: '马克隆主体级',
        key: '主体马克隆值级',
        list: [
            {
                key: '马克隆A档平均值比率',
                label: 'A',
                type: 'visible'
            },
            
            {
                key: '马克隆B1档平均值比率',
                label: 'B1',
                type: 'visible'
            },
            {
                key: '马克隆B2档平均值比率',
                label: 'B2',
                type: 'visible'
            },
            {
                key: '马克隆C1档平均值比率',
                label: 'C1',
                type: 'visible'
            },
            {
                key: '马克隆C2档平均值比率',
                label: 'C2',
                type: 'visible'
            }
        ]
    },
    {
        title: '长度整齐度(%)',
        key: 't4',
        list: [
            {
                key: '长度整齐度最小值',
                label: '最小值'
            },
            {
                key: '长度整齐度平均值',
                label: '最大值'
            },
            {
                key: '长度整齐度平均值',
                label: '平均值'
            }
        ]
    },
    {
        title: '断裂比例度(CN/tex)',
        key: 't5',
        list: [
            {
                key: '断裂比强度最小值',
                label: '最小值'
            },
            {
                key: '断裂比强度最大值',
                label: '最大值'
            },
            {
                key: '平均值',
                label: '平均值'
            },
            {
                key: 'Rd平均值',
                label: '平均值(Rd)'
            },
            {
                key: '加b平均值',
                label: '+b平均值'
            }
        ]
    }
]


export default class Card extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    hasValue = v => {
        if (Number(v) === 0) {
            return false;
        }
        if (v === '-') {
            return false;
        }
        return true;
    }
    render() {
        const { g } = this;
        return (
            <View>
                {
                    cardList.map(card => {
                        const { key, title, list } = card;
                        return (
                            <View className="card">
                                {key && (
                                    <View className="card-title">
                                        <Text className="card-title-text">{title}{g(key) !== '-' ? ':' + g(key) : ''}</Text>
                                    </View>
                                )}
                                <View className="card-list">
                                    {
                                        list.map((item, index) => {
                                            const { key: a, label, type } = item;
                                            return (
                                                <View className="card-list-item">
                                                    {
                                                        type === 'visible' && !this.hasValue(g(label)) ? null : (
                                                            <View className={classnames({ 'card-list-row-border': index !== card.list.length - 1 })}>
                                                                <Text className="card-list-item-label">{label}{label ? ':' : ''}</Text>
                                                                <Text className="card-list-item-value">{g(a)}</Text>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )

    }
}