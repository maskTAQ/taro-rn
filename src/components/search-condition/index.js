import React from 'react';
import { Component } from '../../platform';
import { View, Visible, TButton, Text } from '../../ui';


import './index.scss';
const map = [
    [{
        title: '产地',
        type: 'radio',
        option: ['不限', '地方', '兵团']
    }, {
        title: '类型',
        type: 'radio',
        option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
    }, {
        title: '交货地',
        type: 'radio',
        option: ['新疆仓库', '内地仓库']
    }, {
        title: '质量',
        type: 'picker',
        option: [{
            key: '',
            label: 'xx',
            pickerOption: [{ label: 'test', value: '12' }]
        }]
    }],
    [{
        title: '产地',
        type: 'radio',
        option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
    }, {
        title: '类型',
        type: 'radio',
        option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
    }, {
        title: '交货地',
        type: 'radio',
        option: ['新疆仓库', '内地仓库']
    }, {
        title: '质量',
        type: 'picker',
        option: []
    },
    ],
    [{
        title: '产地',
        type: 'radio',
        option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
    }, {
        title: '类型',
        type: 'radio',
        option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
    }, {
        title: '交货地',
        type: 'radio',
        option: ['新疆仓库', '内地仓库']
    }, {
        title: '质量',
        type: 'picker',
        option: []
    },
    ],
    [{
        title: '产地',
        type: 'radio',
        option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
    }, {
        title: '类型',
        type: 'radio',
        option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
    }, {
        title: '交货地',
        type: 'radio',
        option: ['新疆仓库', '内地仓库']
    }, {
        title: '质量',
        type: 'picker',
        option: []
    },
    ],
    [{
        title: '产地',
        type: 'radio',
        option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
    }, {
        title: '类型',
        type: 'radio',
        option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
    }, {
        title: '交货地',
        type: 'radio',
        option: ['新疆仓库', '内地仓库']
    }, {
        title: '质量',
        type: 'picker',
        option: []
    },
    ]
];
export default class SearchCondition extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        pickerVisible: false
    }
    formateData(d) {
        const data = [].concat(d);
        const result = [];

        while (data.length) {
            if (result.length === 0) {
                result.push([])
            }
            if (result[result.length - 1].length > 3) {
                result.push([data.shift()]);
            } else {
                result[result.length - 1].push(data.shift());
            }
        }
        return result;
    }
    showPicker = (item) => {
        const { onShowPicker } = this.props;
        onShowPicker(item);
    }
    render() {
        const { label, current = 0, show, onToggle } = this.props;
        return (
            <View className="container">
                <TButton onClick={onToggle}>
                    <View className="title">
                        <Text className="title-text">
                            {label}定制牌价
                    </Text>
                    </View>
                </TButton>
                <Visible show={show}>
                    <View className="content">
                        {
                            map[current].map(classify => {
                                const { title, type } = classify;
                                return (
                                    <View className="classify-box">

                                        <View className="classify-box-title">
                                            <Text className="classify-box-title-text">
                                                {title}
                                            </Text>
                                        </View>
                                        {
                                            type === 'radio' ? (
                                                <View className="classify-content">
                                                    {
                                                        this.formateData(classify.option).map(row => {
                                                            return (
                                                                <View className="item-row">
                                                                    {
                                                                        row.map(item => {
                                                                            return (
                                                                                <TButton>
                                                                                    <View className="item">
                                                                                        <Text className="item-text">{item}</Text>
                                                                                    </View>
                                                                                </TButton>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            ) : (
                                                    <View className="classify-content">
                                                        {
                                                            this.formateData(classify.option).map(row => {
                                                                return (
                                                                    <View className="item-row">
                                                                        {
                                                                            row.map(item => {
                                                                                return (
                                                                                    <TButton onClick={this.showPicker.bind(this, item)}>
                                                                                        <View className="item">
                                                                                            <Text className="item-text">{item.label}</Text>
                                                                                        </View>
                                                                                    </TButton>
                                                                                )
                                                                            })
                                                                        }
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                )
                                        }

                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className="btn-group">
                        <TButton>
                            <View className="btn">
                                <Text className="btn-text">清空</Text>
                            </View>
                        </TButton>
                        <TButton>
                            <View className="btn">
                                <Text className="btn-text">搜索</Text>
                            </View>
                        </TButton>
                        <TButton>
                            <View className="btn">
                                <Text className="btn-text">添加定制</Text>
                            </View>
                        </TButton>
                    </View>
                </Visible>
            </View>
        )
    }
}


