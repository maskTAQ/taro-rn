

import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { Radio, RadioRect, Check, CheckCircle, Select, DatePicker, Slidebothway } from '../index';
import { View, Text, TDatePicker, TInput, TButton, Image, TLoading } from '../../ui';
import topIcon from '../../img/top.png';
import bottomIcon from '../../img/bottom.png';
import './index.scss';
const isVisible = ({ visible = true, params }) => {
    let isVisible = true;
    if (typeof visible === 'string') {
        if (visible.includes('=')) {
            const [key, value] = visible.split('=');
            if (Array.isArray(params[key])) {
                isVisible = params[key].some(item => item === value);
            } else {
                isVisible = params[key] === value;
            }

        }
        if (visible.includes('!=')) {
            const [key, value] = visible.split('!=');
            if (Array.isArray(params[key])) {
                isVisible = params[key].every(item => item !== value);
            } else {
                isVisible = params[key] !== value;
            }
        }
    }
    if (typeof visible === 'boolean') {
        isVisible = visible;
    }
    return isVisible;
}
export default class SearchCondition extends Component {
    state = {
        activeTab: '',
        activeTabIndex: NaN,
    }
    handleTabChange = (activeTab, activeTabIndex) => {
        if (activeTab === this.getActiveTab()) {
            this.setState({
                activeTab: '',
                activeTabIndex: NaN
            });
        } else {
            this.setState({
                activeTab,
                activeTabIndex
            });
        }
    }
    showPicker(option, key) {
        const { picker, onChangePickerData } = this.props;
        onChangePickerData(update(picker, {
            visible: {
                $set: true
            },
            option: {
                $set: option
            },
            key: {
                $set: key
            }
        }));
    }
    closePicker = () => {
        const { picker, onChangePickerData } = this.props;
        onChangePickerData(update(picker, {
            visible: {
                $set: false
            },
            option: {
                $set: []
            }
        }));
    }
    handleChange = ({ key, value }) => {
        const { params, onFieldChange } = this.props
        onFieldChange(update(params, {
            [key]: {
                $set: value
            }
        }));
    }
    handleInputChange = (key, value) => {
        this.handleChange({ key, value });
    }
    handleDateChange = (key, value) => {
        this.handleChange({ key, value });
    }
    getActiveTab() {
        const { activeTab, activeTabIndex } = this.state;
        const { data } = this.props;
        if (activeTab) {
            return activeTab
        } else {
            if (data[activeTabIndex]) {
                return data[activeTabIndex].title
            } else {
                return ''
            }
        }
    }
    render() {
        const { activeTabIndex } = this.state;
        const { data, params, status, loading, onResetParams, onSubmit } = this.props;
        const current = this.getActiveTab();
        return (
            <View className="container">
                {
                    status === 'success' && (
                        <View className="content">
                            <View className="tab-box">
                                {
                                    data.map((tab, tabIndex) => {
                                        const { title } = tab;
                                        const isActive = title === current;
                                        return (
                                            <TButton className="tab-button" onClick={this.handleTabChange.bind(this, title, tabIndex)}>
                                                <View
                                                    className={classnames("tab-item", {
                                                        "active-tab-item": isActive
                                                    })}
                                                    key={title}>
                                                    <Text className={classnames("tab-item-text", {
                                                        "active-tab-item-text": isActive
                                                    })}>{title}</Text>
                                                    <Image className="tab-icon" src={isActive ? topIcon : bottomIcon} />
                                                </View>
                                            </TButton>
                                        )
                                    })
                                }
                            </View>
                            <View className="filter-box">
                                {
                                    (isNaN(activeTabIndex) ? [] : data[activeTabIndex].data).map(field => {
                                        const { title: fieldTitle, components = [], visible } = field;
                                        const className = classnames({
                                            'layout-row': components.length > 2,
                                            'layout-column': components.length <= 2,
                                        });
                                        const isShowField = isVisible({ visible, params });
                                        return isShowField ? (
                                            <View className="field-column" key={fieldTitle}>
                                                <View className="field-title">
                                                    <Text className="field-title-text">
                                                        {fieldTitle}
                                                    </Text>
                                                </View>
                                                <View className={className}>
                                                    {
                                                        components.map(component => {
                                                            const { type, label, param, content, visible: componentVisible = '' } = component;
                                                            const isShowComponent = isVisible({ visible: componentVisible, params });
                                                            const v = params[param];
                                                            return (
                                                                <View key={type}>
                                                                    {
                                                                        type === 'radio' && isShowComponent && <Radio label={content} k={param} value={v} onChange={this.handleChange} />
                                                                    }
                                                                    {
                                                                        type === 'radiorect' && isShowComponent && <RadioRect label={content} k={param} value={v} onChange={this.handleChange} />
                                                                    }
                                                                    {
                                                                        type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                    }
                                                                    {
                                                                        type === 'checkcircle' && isShowComponent && <CheckCircle k={param} value={v} option={content} onChange={this.handleChange} />
                                                                    }
                                                                    {
                                                                        type === 'slidebothway' && isShowComponent && <Slidebothway k={param} value={v} option={content} onChange={this.handleChange} />
                                                                    }

                                                                    {
                                                                        type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={this.showPicker.bind(this, content, param)} className="column-select" />
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
                                            </View>
                                        ) : null
                                    })
                                }
                            </View>
                            {

                                current && (
                                    <View className="btn-group">
                                        <TButton onClick={onResetParams}>
                                            <View className="btn">
                                                <Text className="btn-text">清空</Text>
                                            </View>
                                        </TButton>
                                        <TButton onClick={onSubmit}>
                                            <View className="btn">
                                                <Text className="btn-text">确定</Text>
                                            </View>
                                        </TButton>
                                    </View>
                                )
                            }

                        </View>
                    )
                }
                {
                    status === 'error' && <Text>error</Text>
                }
                {
                    loading && <TLoading />
                }
            </View>

        )
    }
}

