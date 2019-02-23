

import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text, TPicker, TInput, Image, TButton } from '../../components'

import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import './content.scss';

const createOption = function (v, key) {
    return {
        label: v,
        value: v,
        key
    }
}
const list = [
    {
        label: '原产地',
        type: 'input',
        placeholder: '请输入产地',
        key: 'a'
    },
    {
        label: '年度',
        type: 'input',
        placeholder: '请选择年份',
        key: 'b'
    },
    {
        label: '品质',
        type: 'input',
        placeholder: '请输入品质信息',
        key: 'c'
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
        key: 'd'
    },
    {
        label: '选择基差',
        type: 'picker',
        placeholder: '请选择基差',
        option: [createOption(12, 'e'), createOption(13, 'e')],
        key: 'e'
    },
    {
        label: '远期交货',
        type: 'switch',
        key: 'f'
    },
    {
        label: '存放区域',
        type: 'picker',
        placeholder: '请输入存放区域',
        option: [createOption('深圳', 'i'), createOption('广东', 'i')],
        key: 'i'
    },
    {
        label: '保税库/主港/船期',
        type: 'input',
        placeholder: '请输入批次',
        key: 'j'
    },
    {
        label: '提单号',
        type: 'input',
        placeholder: '请输入批次',
        key: 'k'
    },
];
export default class Content extends Component {
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
    getFilterList = list => {
        const { offerType } = this.state;
        const result = [...list];
        if (offerType === '一口价') {
            result.splice(5, 1);
        } else {
            result.splice(4, 1);
        }
        return result;
    }
    render() {

        const { isPickerVisible, activeItemOption, aa, bb, aaOption, bbOption } = this.state;
        const { current } = this.props;
        if (current == 0) {
            list[4].label = '报价(元/吨)'
        }
        if (current == 1) {
            list[4].label = '报价(美分/磅)'
        }
        //console.log(typeof current, current, list, 'list')
        return (
            <View className='content'>
                {
                    this.getFilterList(list).map(item => {
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
                <TButton onClick={this.submit} className="btn">
                    <Text className="btn-text">确定分享</Text>
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

