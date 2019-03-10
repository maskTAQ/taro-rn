

import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import Check from '../../components/check';
import Select from '../../components/select';
import Toggle from '../../components/toggle';
import DatePicker from '../../components/date-picker';
//import {  } from '../../components';
import { View, Text, Image, TInput, TSTab, TRadio, TButton, TPicker } from '../../ui';
import { store } from '../../constants';
import { getDemandCustomLayout } from '../../api';
import { asyncActionWrapper } from '../../actions';
import checkedImg from '../../img/checked.png';
import dateImg from '../../img/date.png';
import './main.scss';

const componentMap = {
    //check: Check
};
console.log(componentMap, 'Check');

// const getComponent = type => {
//     return componentMap[type] || UnKnow
// }
const radioOption = [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }];
@connect(({ layout }) => ({ demand_custom: layout.demand_custom }))
export default class DemandCustom extends Component {
    state = {
        activeTab: '国产棉花',
        pickerVisible: false
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
        const { status, loading, data } = this.props.demand_custom;
        const { activeTab, pickerVisible } = this.state;
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
                                                            isShowField = this.state[key] === value;
                                                        }
                                                        if (visible.includes('!=')) {
                                                            const [key, value] = visible.split('!=');
                                                            isShowField = this.state[key] !== value;
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
                                                                                    isShowComponent = this.state[key] === value;
                                                                                }
                                                                                if (componentVisible.includes('!=')) {
                                                                                    const [key, value] = componentVisible.split('!=');
                                                                                    isShowComponent = this.state[key] !== value;
                                                                                }
                                                                                return (
                                                                                    <View>
                                                                                        {
                                                                                            type === 'check' && isShowComponent && <Check option={content} />
                                                                                        }
                                                                                        {
                                                                                            type === 'select' && isShowComponent && <Select label={label} value={this.state[param]} />
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
                                                                                return (
                                                                                    <View className="field-content">
                                                                                        {
                                                                                            type === 'radio' && <Toggle label="显示" />
                                                                                        }
                                                                                        {
                                                                                            type === 'input' && <TInput placeholder={content} className="input" />
                                                                                        }
                                                                                        {
                                                                                            type === 'text' && <Text className="text">{content}</Text>
                                                                                        }
                                                                                        {
                                                                                            type === 'datepicker' && <DatePicker date={new Date()} />
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
                <TButton>
                    <View className="btn">
                        <Text className="btn-text">发布</Text>
                    </View>
                </TButton>
                <TPicker show={pickerVisible} onCancel={this.closePicker} onClose={this.closePicker} option={radioOption} />
            </View>
        )
    }
}

