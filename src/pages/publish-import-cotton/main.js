

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton, TSTab } from '../../ui';
import { Layout } from '../../components';
import { getOfferLayout, getOfferList, doSubmit } from '../../api';
import { asyncActionWrapper } from '../../actions';
import { send } from '../../api/ws';
import './main.scss';
import { Tip } from '../../utils';

const tabList = ["人民币", "美元"];
const layoutTypes = ['进口棉￥', '进口棉$'];
@connect(({ layout, data }) => ({ layout, data }))
export default class publishImportCotton extends Component {
    state = {
        activeTab: "人民币",
        current: 0,
        picker: {
            visible: false,
            option: []
        },
        params: {},
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        const { current } = this.state;
        const { id } = this.props.data.user.data;
        const { status, loading } = this.props.layout[`offer_${layoutTypes[current]}`];

        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getOfferLayout,
                params: { '棉花云报价类型': current === 0 ? 2 : 3, '用户ID': id },
                type: 'layout',
                key: `offer_${layoutTypes[current]}`
            });
        }

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
        const { current, params } = this.state;
        const { status, data } = this.props.layout[`offer_${layoutTypes[current]}`] || {};
        const { id } = this.props.data.user;
        const doParams = Object.assign(this.getPreValue(data), params, data.carry);
        send({ action: "verifyBatchNumber", data: { number: doParams["批号"], userID: id } })
            .then(res => {
                if (status === 'success') {
                    doSubmit(data.do, Object.assign(this.getPreValue(data), params, data.carry))
                        .then(res => {
                            asyncActionWrapper({
                                call: getOfferList,
                                params: { '棉花云报价类型': current === 0 ? 2 : 3, '用户ID': id },
                                type: 'data',
                                key: `offer_list_${layoutTypes[current]}`
                            });
                            Tip.success('操作成功');
                        })
                }
            })

    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab,
            current: tabList.indexOf(activeTab)
        }, this.getData);
    }
    render() {
        const { picker, params, activeTab, current } = this.state;
        const { status, loading, data } = this.props.layout[`offer_${layoutTypes[current]}`] || {};
       
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
                <TPicker
                    onClick={this.handlePickerChange}
                    show={picker.visible}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
            </View>
        )
    }
}

