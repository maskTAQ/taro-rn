

import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { Select, DatePicker, CRadio, RadioRect, Check, CheckCircle, Slidebothway,Slide } from '../index';
import { View, Text, TDatePicker, TInput, TLoading } from '../../ui';
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
    showPicker(option, key, v) {
        const { picker, onChangePickerData } = this.props;
        onChangePickerData(update(picker, {
            visible: {
                $set: true
            },
            option: {
                $set: option
            },
            value: {
                $set: v
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
        const { data, params, status, loading } = this.props;
        return (
            <View className="content">
                {
                    status === 'success' && data.param.map(area => {
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
                                                isShowField ? layout === 'column' ? (
                                                    <View className="field-column" key={title}>
                                                        <View className="field-title">
                                                            <Text className="field-title-text">
                                                                {fieldTitle}
                                                            </Text>
                                                        </View>
                                                        <View className={className}>
                                                            {
                                                                components.map(component => {
                                                                    const { type, label, value: defaultValue, param, content, visible: componentVisible = '' } = component;
                                                                    const isShowComponent = isVisible({ visible: componentVisible, params });
                                                                    const v = params[param] || defaultValue;
                                                                    return (
                                                                        <View key={type}>
                                                                            {
                                                                                type === 'radio' && isShowComponent && <CRadio label={label} option={content} k={param} value={v} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'radiorect' && isShowComponent && <RadioRect label={label} option={content} k={param} value={v} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'checkcircle' && isShowComponent && <CheckCircle k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }

                                                                            {
                                                                                type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={this.showPicker.bind(this, content, param, v)} className="column-select" />
                                                                            }
                                                                            {
                                                                                type === 'slidebothway' && isShowComponent && <Slidebothway k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'slide' && isShowComponent && <Slide k={param} value={v} option={content} onChange={this.handleChange} className="column-select" />
                                                                            }

                                                                            {
                                                                                type === 'input' && isShowComponent && <TInput key={param} value={v} placeholder={content} className="input" onInput={this.handleInputChange.bind(this, param)} />
                                                                            }
                                                                            {
                                                                                type === 'text' && isShowComponent && <Text className="text">{content}</Text>
                                                                            }
                                                                            {
                                                                                type === 'datepicker' && isShowComponent && <TDatePicker onChange={this.handleDateChange.bind(this, param)}>
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
                                                                <Text className="field-label-text">{fieldTitle}</Text>
                                                            </View>

                                                            {
                                                                components.map(component => {
                                                                    const { type, label, value: defaultValue, param, content, visible: componentVisible = '' } = component;
                                                                    const isShowComponent = isVisible({ visible: componentVisible, params });
                                                                    const v = params[param] || defaultValue;
                                                                    return (
                                                                        <View className={classnames({
                                                                            "field-content": type !== 'label',
                                                                            "label-content": type === 'label'
                                                                        })} key={type}>
                                                                            {
                                                                                type === 'radio' && isShowComponent && <CRadio label={label} option={content} k={param} value={v} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'radiorect' && isShowComponent && <RadioRect label={label} option={content} k={param} value={v} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'check' && isShowComponent && <Check k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }
                                                                            {
                                                                                type === 'checkcircle' && isShowComponent && <CheckCircle k={param} value={v} option={content} onChange={this.handleChange} />
                                                                            }

                                                                            {
                                                                                type === 'select' && isShowComponent && <Select label={label} k={param} value={v} onClick={this.showPicker.bind(this, content, param, v)} />
                                                                            }
                                                                            {
                                                                                type === 'slide' && isShowComponent && <Slide k={param} value={v} option={content} onChange={this.handleChange} className="column-select" />
                                                                            }
                                                                            {
                                                                                type === 'input' && isShowComponent && <TInput key={param} value={v} placeholder={content} className="input" onInput={this.handleInputChange.bind(this, param)} />
                                                                            }
                                                                            {
                                                                                type === 'text' && isShowComponent && <Text className="text">{content}</Text>
                                                                            }
                                                                            {
                                                                                type === 'label' && isShowComponent && <Text className="text">{content}</Text>
                                                                            }
                                                                            {
                                                                                type === 'datepicker' && isShowComponent && <TDatePicker onChange={this.handleDateChange.bind(this, param)}>
                                                                                    <DatePicker date={v} />
                                                                                </TDatePicker>
                                                                            }
                                                                        </View>
                                                                    )
                                                                })
                                                            }

                                                        </View>
                                                    ) : null
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
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

