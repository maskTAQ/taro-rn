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

    t1: '白棉四级',
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
            [{
                key: '包数',
                label: '合计包数'
            },
            {
                key: '执行标准',
                label: '质量标识'
            }],
            [{
                key: 'c',
                label: '合计毛重'
            },
            {
                key: 'd',
                label: '平均回潮'
            }],
            [{
                key: 'e',
                label: '合计皮重'
            },
            {
                key: 'f',
                label: '平均含杂'
            }],
            [{
                key: 'i',
                label: '合计净重'
            },
            {
                key: 'j',
                label: '合计公重'
            }]
        ]
    },
    {
        title: '主体颜色级',
        key: 't1',
        list: [
            [{
                key: 'a1',
                label: '白棉3级',
                type: 'visible'
            },
            {
                key: 'b1',
                label: '白棉4级',
                type: 'visible'
            }]
        ]
    },
    {
        title: '主体长度级',
        key: 't2',
        list: [
            [{
                key: 'a',
                label: '27mm',
                type: 'visible'
            },
            {
                key: 'b',
                label: '白棉4级',
                type: 'visible'
            }],
            [{
                key: 'c',
                label: '29mm',
                type: 'visible'
            },
            {
                key: '',
                label: '',
                type: 'visible'
            }]
        ]
    },
    {
        title: '马克隆主体级',
        key: 't3',
        list: [
            [{
                key: 'a3',
                label: 'C1',
                type: 'visible'
            },
            {
                key: 'b3',
                label: 'B1',
                type: 'visible'
            }],
            [{
                key: 'c3',
                label: 'A',
                type: 'visible'
            },
            {
                key: 'd3',
                label: 'B2',
                type: 'visible'
            }]
        ]
    },
    {
        title: '长度整齐度(%)',
        key: 't4',
        list: [
            [{
                key: 'a',
                label: '最小值'
            },
            {
                key: 'b',
                label: '最大值'
            }],
            [{
                key: 'c',
                label: '平均值'
            },
            {
                key: '',
                label: ''
            }]
        ]
    },
    {
        title: '断裂比例度(CN/tex)',
        key: 't5',
        list: [
            [{
                key: 'a5',
                label: '最小值'
            },
            {
                key: 'b5',
                label: '最大值'
            }],
            [{
                key: 'c5',
                label: '平均值'
            },
            {
                key: '',
                label: ''
            }],
            [{
                key: 'd5',
                label: '平均值(Rd)'
            },
            {
                key: 'e5',
                label: '平均值'
            }]
        ]
    }
]


export default class Card extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
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
                                        <Text className="card-title-text">{title}:{data[key]}</Text>
                                    </View>
                                )}
                                <View className="card-list">
                                    {
                                        list.map((row, index) => {
                                            return (
                                                <View className={classnames("card-list-row")}>
                                                    {
                                                        row.map(item => {
                                                            //为什么取一个别名 用key taro编译会报错
                                                            const { key: a, label, type } = item;

                                                            return (
                                                                <View className="card-list-item">
                                                                    {
                                                                        type === 'visible' && !this.hasValue(g(label)) ? null : (
                                                                            <View className={classnames({ 'card-list-row-border': index !== card.list.length - 1 })}>
                                                                                <Text className="card-list-item-label">{label}{label ? ':' : ''}</Text>
                                                                                <Text className="card-list-item-value">{g(label)}</Text>
                                                                            </View>
                                                                        )
                                                                    }
                                                                </View>
                                                            )
                                                        })
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