

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton, TSTab } from '../../ui';
import { Layout } from '../../components';
import { getOfferLayout } from '../../api';
import { asyncActionWrapper } from '../../actions';
import './main.scss';

const tabList = ["人民币", "美元"];
const layoutTypes = ['进口棉￥', '进口棉$'];
@connect(({ layout }) => ({ layout }))
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
        const { status, loading } = this.props.layout[`offer_${layoutTypes[current]}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getOfferLayout,
                params: { '棉花云报价类型': current === 0 ? 2 : 3 },
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

    submit = () => {
        console.log(this.state.params);
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab,
            current: tabList.indexOf(activeTab)
        }, this.getData);
    }
    render() {
        const { picker, params, activeTab, current } = this.state;
        const { status, loading, data, msg } = this.props.layout[`offer_${layoutTypes[current]}`];
        return (
            <View className='container'>
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

