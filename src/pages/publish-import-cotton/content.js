

import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text, TPicker, TInput, TSwitch, TButton, TTabs, TTabPane } from '../../components'

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
        label: '报价(元/吨)',
        type: 'picker',
        placeholder: '请选择报价',
        option: [createOption(12, 'd'), createOption(15, 'd')],
        key: 'd'
    },
    {
        label: '选择基差',
        type: 'picker',
        placeholder: '请输入基差',
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
        aaOption: [{ label: '公重', value: '公重', key: 'aa' }, { label: '毛重', value: '毛重', key: 'aa' }],
        bbOption: [{ label: '自提', value: '自提', key: 'bb' }, { label: '送货上门', value: '送货上门', key: 'bb' }],
    };
    componentDidMount() {
        const { onRegister } = this.props;
        onRegister(this.pickerResultCallBack);
    }
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
    render() {

        const { isPickerVisible, activeItemOption, aa, bb, aaOption, bbOption } = this.state;
        const { current } = this.props;
        if (current == 0) {
            list[3].label = '报价(元/吨)'
        }
        if (current == 1) {
            list[3].label = '报价(美分/磅)'
        }
        //console.log(typeof current, current, list, 'list')
        return (
            <View className='content'>
                {
                    list.map(item => {
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
                                            onClick={() => { this.showPicker(option) }}>
                                            <Text className="item-input">{String(this.state[key] || placeholder)}</Text>
                                        </TButton>
                                    )
                                }
                                {
                                    type === 'switch' && (
                                        <View className="item-right">
                                            <TButton
                                                onClick={() => { this.showPicker(aaOption) }}>
                                                <Text className="item-input mr">{aa || '请选择'}</Text>
                                            </TButton>
                                            <TButton
                                                onClick={() => { this.showPicker(bbOption) }}>
                                                <Text className="item-input mr">{bb || '请选择'}</Text>
                                            </TButton>
                                            <Text className="switch-text">{this.state.f ? '支持' : '不支持'}</Text>
                                            <TSwitch checked={this.state[key]} onChange={this.handleSwitchChange} />
                                        </View>
                                    )
                                }
                            </View>
                        )
                    })
                }
                <TButton>
                    <View className="btn" onClick={this.submit}>
                        <Text className="btn-text">确定分享</Text>
                    </View>

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

