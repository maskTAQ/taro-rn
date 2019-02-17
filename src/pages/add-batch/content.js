

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
        label: '批次',
        type: 'input',
        placeholder: '请输入批次',
        key: 'a'
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
        label: '企业信息：',
        type: 'view',
        placeholder: '请输入公司名称',
        key: 'j'
    },
    {
        label: '公司',
        type: 'input',
        placeholder: '请输入公司名称',
        key: 'j'
    },
    {
        label: '公司类型',
        type: 'input',
        placeholder: '请输入公司类型',
        key: 'k'
    },
    {
        label: '联系电话',
        type: 'input',
        placeholder: '请输入联系电话',
        key: 'k'
    },
    {
        label: '联系人',
        type: 'input',
        placeholder: '请输入联系人',
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
        // const isLoggedIn = list[4].label
        // console.log(list)
        // // 这里最好初始化声明为 `null`，初始化又不赋值的话
        // // 小程序可能会报警为变量为 undefined
        // let status = null
        // if (isLoggedIn === "标题") {
        //   status =  <View className="enterprise">
        //   <Text className="enterprise-title">企业信息</Text>
        //  </View>
        // } else {
        //   status = <Text></Text>
        // }
    
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
                                            <TSwitch checked={this.state[key]} onChange={this.handleSwitchChange} />
                                        </View>
                                    )
                                }
                                {status}
                            </View>
                        )
                    })
                }
                <TButton onClick={this.submit} className="btn">
                    <Text className="btn-text">马上发布</Text>
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

