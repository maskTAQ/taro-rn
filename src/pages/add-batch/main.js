

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton } from '../../ui';
import { Layout } from '../../components';
import { getOfferLayout } from '../../api';
import { asyncActionWrapper } from '../../actions';
import './main.scss';

@connect(({ layout }) => ({ layout }))
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

    submit = () => {
        console.log(this.state.params);
    }

    render() {
        const { params:navParams } = this.props.navigation.state;
        const { picker, params } = this.state;
        const { status, loading, data, msg } = this.props.layout[`offer_${navParams.type}`];
        return (
            <View className='container'>
                <ScrollView>
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

