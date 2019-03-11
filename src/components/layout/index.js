

import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { Check, Select, Toggle, DatePicker } from '../index';
import RadioCheck from '../radio-check/index';
import { View, Text, TDatePicker, TInput } from '../../ui';
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
export default class Layout extends Component {
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
    render() {
        const { data, params } = this.props;
        return (
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
                                            const isShowField = isVisible({ visible, params });


                                            return (
                                                layout === 'column' && isShowField ? (
                                                    <View className="field-column" key={title}>
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
                                                                                type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'radiocheck' && isShowComponent && <RadioCheck k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={this.showPicker.bind(this, content, param)} className="column-select" />
                                                                            }
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
                                                    </View>
                                                ) :
                                                    (
                                                        <View className="field-row">
                                                            <View className="field-label">
                                                                <Text className="field-label-text">{fieldTitle}:</Text>
                                                            </View>

                                                            {
                                                                components.map(component => {
                                                                    const { type, label, param, content, visible: componentVisible = '' } = component;
                                                                    const isShowComponent = isVisible({ visible: componentVisible, params });
                                                                    const v = params[param];
                                                                    return (
                                                                        <View className="field-content" key={type}>
                                                                            {
                                                                                type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'radiocheck' && isShowComponent && <RadioCheck k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={this.showPicker.bind(this, content, param)} className="row-select" />
                                                                            }
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
}

