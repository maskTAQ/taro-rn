

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import Layout from '../../components/layout';
import { View, Text, TSTab, TButton, TPicker, ScrollView } from '../../ui';
import { store } from '../../constants';
import { getDemandCustomLayout } from '../../api';
import { asyncActionWrapper } from '../../actions';
import './main.scss';

const tabList = ['新疆棉', '进口棉￥', '进口棉$', '地产棉', '拍储'];
@connect(({ layout }) => ({ layout }))
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
        const { status, loading, data } = this.props.layout[`demand_custom_${activeTab}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getDemandCustomLayout,
                params: { '棉花云供需类型': tabList.indexOf(activeTab) + 1 },
                type: 'layout',
                key: `demand_custom_${activeTab}`
            });
        }
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
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

    submit = () => {
        console.log(this.state.params);
    }

    render() {
        const { activeTab, picker, params } = this.state;
        const { status, loading, data, msg } = this.props.layout[`demand_custom_${activeTab}`];
        return (
            <View className='container'>
            <Text className="a">log:{JSON.stringify({status, loading})}</Text>
                <ScrollView>
                    <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                    {
                        status === 'success' && <Layout
                            picker={picker}
                            data={data}
                            params={params}
                            onFieldChange={this.handleFieldChange}
                            onChangePickerData={this.changePickerData}
                        />
                    }
                    {
                        loading && <Text>loading</Text>
                    }
                    {
                        status === 'error' && <Text>{msg}</Text>
                    }
                    <TButton onClick={this.submit}>
                        <View className="btn">
                            <Text className="btn-text">发布</Text>
                        </View>
                    </TButton>
                </ScrollView>
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

