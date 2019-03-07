

import React from 'react';
import { Component } from '../../platform';

import { View, Text, TPicker, TInput, TButton, Image } from '../../ui'
import './main.scss';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';

const createOption = function (v, key) {
    return {
        label: v,
        value: v,
        key
    }
}
const listTop = [
    {
        label: '批次',
        type: 'input',
        placeholder: '请输入批次',
        key: 'a'
    },
    {
        label: '报价类型',
        type: 'picker',
        placeholder: '请选择报价类型',
        option: [createOption('一口价', 'offerType'), createOption('基差', 'offerType')],
        key: 'offerType'
    },
    {
        label: '报价(元/吨)',
        type: 'input',
        placeholder: '请输入报价',
        key: 'b'
    },
    {
        label: '选择基差',
        type: 'picker',
        placeholder: '请输入基差',
        option: [createOption(12, 'e'), createOption(13, 'e')],
        key: 'c'
    },
    {
        label: '远期交货',
        type: 'switch',
        key: 'd'
    }
];
const listBotton = [
    {
        label: '公司',
        type: 'input',
        placeholder: '请输入公司名称',
        key: 'f'
    },
    {
        label: '公司类型',
        type: 'input',
        placeholder: '请输入公司类型',
        key: 'i'
    },
    {
        label: '联系电话',
        type: 'input',
        placeholder: '请输入联系电话',
        key: 'j'
    },
    {
        label: '联系人',
        type: 'input',
        placeholder: '请输入联系人',
        key: 'k'
    }
]
export default class AddBatch extends Component {
    state = {
        isPickerVisible: false,
        activeItemOption: [],
        aa: '',
        bb: '',
        offerType: '一口价',
        aaOption: [{ label: '公重', value: '公重', key: 'aa' }, { label: '毛重', value: '毛重', key: 'aa' }],
        bbOption: [{ label: '自提', value: '自提', key: 'bb' }, { label: '送货上门', value: '送货上门', key: 'bb' }],
    };
    showPicker = option => {
        this.setState({
            isPickerVisible: true,
            activeItemOption: option
        });
    }
    closePicker = () => {
        this.setState({
            isPickerVisible: false,
            activeItemOption: []
        });
    }
    handlePickerItemClick = data => {
        if (data) {
            console.log(data, 'data');
            const { key, value } = data;
            this.setState({
                [key]: value
            });
        }
        this.closePicker();
    }
    hanldInputChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }
    handleSwitchChange = status => {
        this.setState({
            f: status
        });
    }
    submit() {
        console.log(this.state);
    }
    toggleCheckedStatus = () => {
        this.setState({
            f: !this.state.f
        });
    }
    getFilterListTop = list => {
        const { offerType } = this.state;
        const result = [...list];
        if (offerType === '一口价') {
            result.splice(3, 1);
        } else {
            result.splice(2, 1);
        }
        return result;
    }
    render() {

        const { isPickerVisible, activeItemOption, aa, bb, aaOption, bbOption } = this.state;

        return (
            <View className='container'>
                {
                    this.getFilterListTop(listTop).map(item => {
                        const { type, placeholder, label, option, key } = item;
                        return (
                            <View className="item">
                                <Text className="item-label">{label}</Text>
                                {
                                    type === 'input' && <TInput value={this.state[key]} onInput={text => this.hanldInputChange(key, text)} className="item-input" placeholder={placeholder} />
                                }
                                {
                                    type === 'picker' && (

                                        <TButton
                                            className="picker-btn"
                                            onClick={() => { this.showPicker(option) }}>
                                            <Text className="picker-btn-text">{String(this.state[key] || placeholder)}</Text>
                                        </TButton>

                                    )
                                }
                                {
                                    type === 'switch' && (
                                        <View className="item-right">
                                            <TButton
                                                className="picker-btn"
                                                onClick={() => { this.showPicker(aaOption) }}>
                                                <Text className="picker-btn-text mr">{aa || '请选择'}</Text>
                                            </TButton>
                                            <TButton
                                                className="picker-btn"
                                                onClick={() => { this.showPicker(bbOption) }}>
                                                <Text className="picker-btn-text mr">{bb || '请选择'}</Text>
                                            </TButton>
                                            <Text className="switch-text">{this.state.f ? '支持' : '不支持'}</Text>
                                            <TButton onClick={this.toggleCheckedStatus}>
                                                <Image className="switch-icon" src={this.state.f ? checkedImg : uncheckedImg} />
                                            </TButton>
                                        </View>
                                    )
                                }

                            </View>
                        )
                    })
                }
                <View className="title">
                    <Text className="title-text">企业信息</Text>
                </View>
                {
                    listBotton.map(item => {
                        const { type, placeholder, label, option, key } = item;
                        return (
                            <View className="item">
                                <Text className="item-label">{label}</Text>
                                {
                                    type === 'input' && <TInput value={this.state[key]} onInput={text => this.hanldInputChange(key, text)} className="item-input" placeholder={placeholder} />
                                }
                            </View>
                        )
                    })
                }
                <TButton onClick={this.submit} className="submit-button">
                    <Text className="submit-button-text">马上发布</Text>
                </TButton>
                <TPicker
                    show={isPickerVisible}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={activeItemOption}
                    onClick={this.handlePickerItemClick}
                />
            </View>
        )
    }
}

