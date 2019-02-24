

import { Component } from '@tarojs/taro';
import classnames from 'classnames';

import { View, Text, Image, TInput, TSTab, TButton, TRadio, TPicker } from '../../components';
import { Button, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './main.scss';

import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import dateImg from '../../img/date.png';
import icon from './img/icon.png'

const radioOption = [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }];
export default class DemandCustom extends Component {
    state = {
        activeTab: '国产棉花',
        selected: {
            area: '',
            year: '',
            origin: '',
            type: '',
            jhd: '',

            dj: '',
            cd: '',
            qd: '',
            mz: '',
            hz: '',
            zqd: '',
        },
        option: {
            area: [[{ value: '', label: '新疆棉' }, { value: '', label: '地产棉' }]],
            year: [[{ value: '', label: '新棉' }, { value: '', label: '拍储棉' }]],
            origin: [[{ value: '', label: '不限' }, { value: '', label: '地方' }, { value: '', label: '兵团' }, { value: '', label: '长江流域' }], [{ value: '', label: '黄河流域' }]],
            type: [[{ value: '', label: '手摘棉花' }, { value: '', label: '机采棉' }, { value: '', label: '皮坤棉' }, { value: '', label: '长绒棉' }]],
            jhd: [[{ value: '', label: '新疆仓库' }, { value: '', label: '内地仓库' }]],

            dj: [{ value: '', label: '新疆棉' }, { value: '', label: '地产棉' }],
        },
        radio: [
            { key: 'area', label: '区域' },
            { key: 'year', label: '年份' },
            { key: 'origin', label: '产地' },
            { key: 'type', label: '类型' },
            { key: 'jhd', label: '交货地' },
        ],
        picker: [
            [
                { key: 'dj', label: '等级' },
                { key: 'cd', label: '长度' },
                { key: 'qd', label: '强度' }
            ],
            [
                { key: 'mz', label: '马值' },
                { key: 'hz', label: '含杂' },
                { key: 'zqd', label: '整齐度' }
            ]
        ],
        list: [
            { key: 'sfxslxr', label: '是否联系人', type: 'visible' },
            { key: 'lxr', label: '联系人', placeholder: 'xxx' },
            { key: 'lxrhm', label: '联系号码', placeholder: '13888888888' },
            { key: 'xqdw', label: '需求单位', placeholder: '请填写需求单位' },
            { key: 'jgfw', label: '价格范围', placeholder: '请填写需求单位', type: 'jgfw' },
            { key: 'xqsl', label: '需求数量', placeholder: '请填写需求数量', type: 'xqsl' },
            { key: 'shd', label: '收货地', placeholder: '请输入交货地' },
            { key: 'zwjgsj', label: '最晚交割时间', placeholder: '年/月/日', type: 'date' },
            { key: 'sfdwxsbj', label: '是否对外显示报价', type: 'visible' },
        ],
        show: true,
        units: ['吨', '批', '柜'],
        unit: '吨',
        time: '',
        pickerVisible: false
    };
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        });
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
    showPicker = () => {
        console.log('showPicker')
        this.setState({
            pickerVisible: true
        });
    }
    closePicker = () => {
        this.setState({
            pickerVisible: false
        });
    }
    render() {
        const { activeTab, radio, option, picker, selected, list, pickerVisible } = this.state;
        return (
            <View className='container'>
                <TSTab list={['国产棉花', '进口棉花']} active={activeTab} onTabChange={this.handleTabChange} />
                {
                    radio.map(row => {
                        const { key, label } = row;
                        return (
                            <View className="row">
                                <View className="title">
                                    <Text className="title-text">
                                        {label}
                                    </Text>
                                </View>
                                <View>
                                    {
                                        option[key].map(group => {
                                            return (
                                                <View className="group">
                                                    {
                                                        group.map(item => {
                                                            return (
                                                                <View className="item">
                                                                    <Text className="item-text">{item.label}</Text>
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

                <View className="row">
                    <View className="title">
                        <Text className="title-text">
                            质量
                        </Text>
                    </View>
                    <View>
                        {
                            picker.map(group => {
                                return (
                                    <View className="picker-row">
                                        {
                                            group.map(item => {
                                                const { label } = item;
                                                return (
                                                    <TButton onClick={this.showPicker}>
                                                        <View className="item">
                                                            <Text className="item-text">{label}:{selected[key] || '请选择'}</Text>
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
                </View>
                <View className="list">
                    {
                        list.map(item => {
                            const { key, type = 'input', label, placeholder } = item;
                            return (
                                <View className="list-item">
                                    <View className="list-item-label" style={{ width: ['sfdwxsbj','zwjgsj'].includes(key) ? '120px' : '70px' }}>
                                        <Text className="list-item-label-text">
                                            {label}
                                        </Text>
                                    </View>
                                    {
                                        type === 'visible' && (
                                            <View className="list-item-content right">
                                                <Text className="toogle-text">显示</Text>
                                                <Image className="toogle-img" src={checkedImg} />
                                            </View>
                                        )
                                    }
                                    {
                                        type === 'input' && (
                                            <View className="list-item-content">
                                                <TInput className="list-item-input" placeholder={placeholder} />
                                            </View>
                                        )
                                    }
                                    {
                                        type === 'xqsl' && (
                                            <View className="list-item-content">
                                                <TInput className="list-item-input" placeholder="需求数量" />
                                                <TRadio option={radioOption} />
                                            </View>
                                        )
                                    }
                                    {
                                        type === 'jgfw' && (
                                            <View className="list-item-content">
                                                <TInput className="range-input" placeholder="最低价格" />
                                                <Text className="range-text">至</Text>
                                                <TInput className="range-input" placeholder="最高价格" />
                                            </View>
                                        )
                                    }
                                    {
                                        type === 'date' && (
                                            <View className="list-item-content">
                                                <View className="date-text-box">
                                                    <Text className="date-text">年/月/日</Text>
                                                </View>
                                                <Image src={dateImg} className="date-icon" />
                                            </View>
                                        )
                                    }

                                </View>
                            )
                        })
                    }
                </View>
                <TButton>
                    <View className="btn">
                        <Text className="btn-text">发布</Text>
                    </View>
                </TButton>
                <TPicker show={pickerVisible} onCancel={this.closePicker} onClose={this.closePicker} option={radioOption}/>
            </View>
        )
    }
}

