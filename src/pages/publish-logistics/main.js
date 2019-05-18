

import React from './node_modules/react';
import { Component } from '../../platform';
import classnames from 'classnames';
import { Picker } from '@tarojs/components'
import update from 'immutability-helper';

import { DatePicker, LogisticsFixedTool } from '../../components';
import { View, ScrollView, Visible, TButton, Text, TInput, TDatePicker } from '../../ui'
import { getLogisticsList, publishLogisticsList } from '../../api';
import PlateformSelect from './plateform-select';
import './main.scss';
import { Tip } from '../../utils';

const layout = [
    {
        title: '',
        list: [
            {
                label: '发货地',
                layout: 'column',
                components: [
                    {
                        type: 'city-picker',
                        key: '发货地'
                    },
                    {
                        type: 'input',
                        key: '发货地详细',
                        placeholder: '请填写详细地址',

                    }
                ]
            },
            {
                label: '收货地',
                layout: 'column',
                components: [
                    {
                        type: 'city-picker',
                        key: '收货地'
                    },
                    {
                        type: 'input',
                        key: '收货地详细',
                        placeholder: '请填写详细地址'
                    }
                ]
            }
        ],
    },
    {
        title: '货物信息',
        list: [
            {
                layout: 'row',
                components: [
                    {
                        type: 'input',
                        key: '重量',
                        placeholder: '填写重量'
                    },
                    {
                        type: 'margin-label',
                        value: 'kg'
                    },
                    {
                        type: 'input',
                        key: '件数',
                        placeholder: '填写件数'
                    },
                    {
                        type: 'label',
                        value: '件'
                    },
                ]
            },
            {
                label: '货物类型',
                layout: 'row',
                components: [
                    {
                        type: 'picker'
                    }
                ]
            }
        ]
    },
    {
        title: '发货时间',
        list: [
            {
                layout: 'row',
                components: [
                    {
                        type: 'datepicker',
                        key: '发货时间开始',
                    },
                    {
                        type: 'margin-label',
                        value: '至'
                    },
                    {
                        type: 'datepicker',
                        key: '发货时间结束'
                    }
                ]
            }
        ],
    },
    {
        title: '发货人信息',
        list: [
            {
                label: '联系人',
                layout: 'row',
                components: [
                    {
                        type: 'label',
                    },
                    {
                        type: 'input',
                        key: '联系人',
                        placeholder: '请填写联系人'
                    },
                ]
            },
            {
                label: '联系电话',
                layout: 'row',
                components: [
                    {
                        type: 'label',
                    },
                    {
                        type: 'input',
                        key: '联系电话',
                        placeholder: '请填写联系电话'
                    }
                ]
            }
        ],
    },
    {
        title: '发货价格',
        list: [
            {
                layout: 'row',
                components: [
                    {
                        type: 'input',
                        key: '发货价格',
                        placeholder: '金额'
                    },
                    {
                        type: 'label',
                        value: '元/吨'
                    }
                ]
            }
        ],
    },
    {
        title: '关联发布',
        list: [
            {
                layout: 'row',
                components: [
                    {
                        type: 'select',
                        key: 'as',
                        option: [{label:'全国棉花市场',icon:''},{label: '快狗打车',icon:''},{label: '货拉拉',icon:''}]
                    },
                ]
            }
        ],
    }
];

export default class PublishLogistics extends Component {
    state = {
        isAllChecked: false,
        modalVisible: false,
        checkedOfferList: [],
        params: {
            '发货地': [],
            '收货地': []
        }
    };
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        this.setState({
            status: 'loading'
        });
        getLogisticsList()
            .then(res => {
                this.setState({
                    status: 'success',
                    data: res
                });
            })
            .catch(e => {
                this.setState({
                    status: 'error'
                });
            })
    }
    onCityChange = (key, v) => {
        this.handleChange(key, v.target.value);
        console.log(v, 'bindRegionChange');
    }
    handleChange(key, value) {
        this.setState(update(this.state, {
            params: {
                [key]: {
                    $set: value
                }
            }
        }))
    }
    submit() {
        const { params } = this.state;
        publishLogisticsList({ ...params, '用户ID': 4 })
            .then(res => {
                Tip.success('发布成功');
                console.log(res, 'res');
            })
    }
    render() {
        const { params } = this.state;
        return (
            <View className="container">
                <ScrollView className="scroll" scrollY>
                    {
                        layout.map(chunk => {
                            const { title, list } = chunk;
                            return (
                                <View className="chunk">
                                    <Visible show={title}>
                                        <View className="chunk-title">
                                            <Text className="chunk-title-text">{title}</Text>
                                        </View>
                                    </Visible>
                                    <View className="chunk-list">
                                        {
                                            list.map((l, i) => {
                                                const { label, layout, components } = l;
                                                return (
                                                    <View className={classnames('layout', {
                                                        'layout-row': layout === 'row',
                                                        'layout-column': layout === 'column',
                                                    })} key={i}>
                                                        <Visible show={label}>
                                                            <View className="layout-title">
                                                                <Text className="layout-title-text">
                                                                    {label}
                                                                </Text>
                                                            </View>
                                                        </Visible>
                                                        <View className={classnames('layout-content', {
                                                            'layout-content-row': layout === 'row',
                                                            'layout-content-column': layout === 'column',
                                                        })}>
                                                            {components.map(item => {
                                                                const { type, key, placeholder, option } = item;
                                                                const value = params[key];
                                                                return (
                                                                    <View className={classnames('component-box', {
                                                                        'full': !type.includes('label')
                                                                    })} key={key}>
                                                                        {
                                                                            type === 'city-picker' && (
                                                                                <Picker
                                                                                    mode="region"
                                                                                    value={value}
                                                                                    onChange={this.onCityChange.bind(this, key)}>
                                                                                    <View className='picker'>
                                                                                        <Text className="p-text">
                                                                                            {value.length ? value.join('-') : '请选择'}
                                                                                        </Text>
                                                                                    </View>
                                                                                </Picker>
                                                                            )
                                                                        }
                                                                        {
                                                                            type === 'input' && (
                                                                                <TInput value={value} placeholder={placeholder} onInput={this.handleChange.bind(this, key)} className="input" />
                                                                            )
                                                                        }
                                                                        {
                                                                            type === 'label' && (
                                                                                <Text className="label">{item.value}</Text>
                                                                            )
                                                                        }
                                                                        {
                                                                            type === 'margin-label' && (
                                                                                <Text className="margin-label">{item.value}</Text>
                                                                            )
                                                                        }
                                                                        {
                                                                            type === 'datepicker' && <TDatePicker onChange={this.handleChange.bind(this, key)}>
                                                                                <DatePicker date={value} className="flex-start" />
                                                                            </TDatePicker>
                                                                        }
                                                                        {
                                                                            type === 'select' && <PlateformSelect value={value} option={option} onChange={this.handleChange.bind(this, key)} />
                                                                        }
                                                                    </View>
                                                                )
                                                            })}
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                    <TButton onClick={this.submit}>
                        <View className="submit">
                            <Text className="submit-text">发布</Text>
                        </View>
                    </TButton>
                </ScrollView>
                <LogisticsFixedTool onClick={this.handleToolClick} showPublish={false} />
            </View>
        )
    }
}

