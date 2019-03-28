

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import Layout from '../../components/layout';
import { View, Text, TSTab, TButton, TPicker, ScrollView } from '../../ui';
import {productTypesValue} from '../../constants';
import { getDemandCustomLayout, getDemandList, doSubmit ,getMySelfDemandList} from '../../api';
import { asyncActionWrapper } from '../../actions';
import './main.scss';
import { Tip } from '../../utils';

const tabList = ['新疆棉', '地产棉', '进口棉$', '进口棉￥'];
@connect(({ layout, data }) => ({ layout, data }))
export default class DemandCustom extends Component {
    state = {
        activeTab: '新疆棉',
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
        const { activeTab } = this.state;
        const { status, loading } = this.props.layout[`demand_custom_${activeTab}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getDemandCustomLayout,
                params: { '棉花云供需类型': productTypesValue[activeTab] },
                type: 'layout',
                key: `demand_custom_${activeTab}`
            });
        }
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab,
            params: {}
        }, this.getData);
    }

    changePickerData = (picker) => {
        this.setState({ picker });
    }
    closePicker = () => {
        this.setState(update(this.state, {
            picker: {
                visible: {
                    $set: false
                },
                option: {
                    $set: []
                },
                value:{
                    $set:''
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
                },
                value:{
                    $set:''
                }
            },
            params: {
                [key]: {
                    $set: item.value
                }
            }
        }));
    }


    handleFieldChange = params => {
        this.setState({ params })
    }
    getPreValue = data => {
        const { id } = this.props.data.user.data;
        const params = {
            '用户ID': id,
        };
        data.param.forEach(area => {
            area.data.forEach(layout => {
                layout.components.forEach(component => {
                    const { value, param } = component;
                    params[param] = value;
                })
            })
        });
        return params;
    }
    submit = () => {
        const { params, activeTab } = this.state;
        const { id } = this.props.data.user.data;
        const { status, data } = this.props.layout[`demand_custom_${activeTab}`];
        if (status === 'success') {
            doSubmit(data.do, Object.assign(this.getPreValue(data), params, data.carry))
                .then(res => {
                    Tip.success('操作成功');
                    setTimeout(() => {
                        //更新需求列表
                        asyncActionWrapper({
                            call: getDemandList,
                            params: { '棉花云供需类型':productTypesValue[activeTab] },
                            type: 'data',
                            key: `demand_list_${activeTab}`
                        });
                        //获取我的需求
                        asyncActionWrapper({
                            call: getMySelfDemandList,
                            params: { '用户ID': id },
                            type: 'data',
                            key: `my_demand_list`
                        });
                    }, 1000);
                })
        }
    }
    render() {
        const { activeTab, picker, params } = this.state;
        const { status, loading, data, msg } = this.props.layout[`demand_custom_${activeTab}`];

        return (
            <View className='container'>
                <ScrollView>
                    <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                    <Layout
                        status={status}
                        loading={loading}
                        picker={picker}
                        data={data}
                        params={params}
                        onFieldChange={this.handleFieldChange}
                        onChangePickerData={this.changePickerData}
                    />
                    <TButton onClick={this.submit}>
                        <View className="btn">
                            <Text className="btn-text">发布</Text>
                        </View>
                    </TButton>
                </ScrollView>
                <TPicker onClick={this.handlePickerChange}
                    show={picker.visible}
                    value={picker.value}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
            </View>
        )
    }
}

