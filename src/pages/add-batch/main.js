

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton } from '../../ui';
import { Layout } from '../../components';
import { getOfferLayout, doSubmit ,getOfferList} from '../../api';
import { asyncActionWrapper } from '../../actions';
import './main.scss';
import { Tip } from '../../utils';

@connect(({ layout,data }) => ({ layout,data }))
export default class AddBatch extends Component {
    state = {
        picker: {
            visible: false,
            option: []
        },
        params: {},
    };
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.getData(params);
    }
    getData(params) {
        const { status, loading } = this.props.layout[`offer_${params.type}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getOfferLayout,
                params,
                type: 'layout',
                key: `offer_${params.type}`
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
        const {id} = this.props.data.user.data;
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
        const { params: navParams } = this.props.navigation.state;
        const { params } = this.state;
        const {id} = this.props.data.user;
        const { status, data } = this.props.layout[`offer_${navParams.type}`];
        if (status === 'success') {
            doSubmit(data.do, Object.assign(this.getPreValue(data), params, data.carry))
                .then(res => {
                    Tip.success('操作成功');
                    asyncActionWrapper({
                        call: getOfferList,
                        params:navParams,
                        type: 'data',
                        key: `offer_list_${navParams.type}`
                    });
                })
        }
    }

    render() {
        const { params: navParams } = this.props.navigation.state;
        const { picker, params } = this.state;
        const { status, loading, data, msg } = this.props.layout[`offer_${navParams.type}`];
        return (
            <View className='container'>
                <ScrollView>
                    <Layout
                        status={status}
                        loading={loading}
                        picker={picker}
                        data={data}
                        params={params}
                        onFieldChange={this.handleFieldChange}
                        onChangePickerData={this.changePickerData}
                    />
                    <TButton onClick={this.submit} className="submit-button">
                        <Text className="submit-button-text">马上发布</Text>
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

