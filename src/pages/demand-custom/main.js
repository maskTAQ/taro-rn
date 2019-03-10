

import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import Check from '../../components/check';
import Select from '../../components/select';
import Toggle from '../../components/toggle';
import DatePicker from '../../components/date-picker';
//import {  } from '../../components';
import { View, Text, TDatePicker, TInput, TSTab, TButton, TPicker } from '../../ui';
import { store } from '../../constants';
import { getDemandCustomLayout } from '../../api';
import { asyncActionWrapper } from '../../actions';
import checkedImg from '../../img/checked.png';
import dateImg from '../../img/date.png';
import './main.scss';

const radioOption = [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }];
@connect(({ layout }) => ({ demand_custom: layout.demand_custom }))
export default class DemandCustom extends Component {
    state = {
        activeTab: '国产棉花',
        picker: {
            visible: false,
            option: []
        },
        params: {}
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        const { status, loading, data } = this.props.demand_custom;
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getDemandCustomLayout,
                params: { '棉花云供需类型': 1 },
                type: 'layout',
                key: store.demand_custom
            });
        }
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        });
    }

    showPicker = (option, key) => {
        this.setState(update(this.state, {
            picker: {
                visible: {
                    $set: true
                },
                option: {
                    $set: option
                },
                key: {
                    $set: key
                }
            }
        }));
    }
    handlePickerChange = item => {
        const { key } = this.state.picker;
        this.setState(update(this.state, {
            picker: {
                visible: {
                    $set: false
                },
                option: {
                    $set: []
                }
            },
            params: {
                [key]: {
                    $set: item.value
                }
            }
        }));
    }
    closePicker = () => {
        this.setState(update(this.state, {
            picker: {
                visible: {
                    $set: false
                },
                option: {
                    $set: []
                }
            }
        }));
    }
    handleChange = ({ key, value }) => {
        this.setState(update(this.state, {
            params: {
                [key]: {
                    $set: value
                }
            }
        }));
    }
    handleInputChange = (key, value) => {
        this.handleChange({ key, value });
    }
    handleDateChange = (key, value) => {
        this.handleChange({ key, value });
    }
    submit = () => {
        console.log(this.state.params);
    }

    render() {
        const { status, loading, data } = this.props.demand_custom;
        const { activeTab, picker, params } = this.state;
        return (
            <View className='container'>
                <TSTab list={['国产棉花', '进口棉花']} active={activeTab} onTabChange={this.handleTabChange} />
                {
                    status === 'success' && (
                        <View className="content">
                            {
                                data.param.map(area => {
                                    const { title, data } = area;
                                    return (
                                        <View className="area" key={title}>
                                            {
                                                title && (
                                                    <View className="area-title">
                                                        <Text className="area-text">{title}</Text>
                                                    </View>
                                                )
                                            }
                                            <View className="area-content">
                                                {
                                                    data.map(field => {
                                                        const { layout, title: fieldTitle, components: c = [], visible = '' } = field;
                                                        const components = Array.isArray(c) ? c : [c];
                                                        const className = classnames({
                                                            'layout-row': components.length > 2,
                                                            'layout-column': components.length <= 2,
                                                        });
                                                        let isShowField = true;
                                                        if (visible.includes('=')) {
                                                            const [key, value] = visible.split('=');
                                                            isShowField = params[key] === value;
                                                        }
                                                        if (visible.includes('!=')) {
                                                            const [key, value] = visible.split('!=');
                                                            isShowField = params[key] !== value;
                                                        }

                                                        return (
                                                            layout === 'column' ? (
                                                                <View className="field-column">
                                                                    <View className="field-title">
                                                                        <Text className="field-title-text">
                                                                            {fieldTitle}
                                                                        </Text>
                                                                    </View>
                                                                    <View className={className}>
                                                                        {
                                                                            components.map(component => {
                                                                                const { type, label, param, content, visible: componentVisible = '' } = component;
                                                                                let isShowComponent = true;
                                                                                if (componentVisible.includes('=')) {
                                                                                    const [key, value] = componentVisible.split('=');
                                                                                    isShowComponent = params[key] === value;
                                                                                }
                                                                                if (componentVisible.includes('!=')) {
                                                                                    const [key, value] = componentVisible.split('!=');
                                                                                    isShowComponent = params[key] !== value;
                                                                                }
                                                                                const v = params[param];
                                                                                return (
                                                                                    <View key={type}>
                                                                                        {
                                                                                            type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                                        }
                                                                                        {
                                                                                            type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={() => this.showPicker(content, param)} />
                                                                                        }
                                                                                    </View>
                                                                                )
                                                                            })
                                                                        }
                                                                    </View>
                                                                </View>
                                                            ) :
                                                                (
                                                                    <View className="field-row">
                                                                        <View className="field-label">
                                                                            <Text className="field-label-text">{fieldTitle}:</Text>
                                                                        </View>

                                                                        {
                                                                            components.map(component => {
                                                                                const { type, label, param, content } = component;
                                                                                const v = params[param];
                                                                                return (
                                                                                    <View className="field-content" key={param}>
                                                                                        {
                                                                                            type === 'radio' && <Toggle label="显示" k={param} value={v} onChange={this.handleChange} />
                                                                                        }
                                                                                        {
                                                                                            type === 'input' && <TInput key={param} value={v} placeholder={content} className="input" onInput={this.handleInputChange.bind(this, param)} />
                                                                                        }
                                                                                        {
                                                                                            type === 'text' && <Text className="text">{content}</Text>
                                                                                        }
                                                                                        {
                                                                                            type === 'datepicker' && <TDatePicker onChange={this.handleDateChange.bind(this, param)}>
                                                                                                <DatePicker date={v} />
                                                                                            </TDatePicker>
                                                                                        }
                                                                                    </View>
                                                                                )
                                                                            })
                                                                        }


                                                                    </View>
                                                                )
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
                {
                    loading && <Text />
                }
                <TButton onClick={this.submit}>
                    <View className="btn">
                        <Text className="btn-text">发布</Text>
                    </View>
                </TButton>
                <TPicker onClick={this.handlePickerChange}
                    show={picker.visible}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
            </View>
        )
    }
}

