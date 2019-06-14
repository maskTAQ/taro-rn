

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton } from '../../ui';
import { Layout } from '../../components';
import { authStatusMap } from '../../constants';
import { getOfferLayout, uploadExcelData, getUpdateGetExcelListPer, getExcelList, publishExcelData } from '../../api';
import { send } from '../../api/ws';
import { asyncActionWrapper, navigate } from '../../actions';
import './main.scss';
import { Tip } from '../../utils';

@connect(({ layout, data }) => ({ layout, data }))
export default class AddBatch extends Component {
    state = {
        picker: {
            visible: false,
            option: [],
            value: ''
        },
        params: {},
    };
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.getData(params);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    getData(params) {
        const { id } = this.props.data.user.data;
        const { status, loading } = this.props.layout[`offer_${params.type}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getOfferLayout,
                params: { '用户ID': id, ...params },
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
                },
                value: {
                    $set: ''
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
                value: {
                    $set: ''
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
    a() {
        Tip.fail('11');
    }
    uploadExcelData() {
        const { params: navParams } = this.props.navigation.state;
        const { status, data } = this.props.layout[`offer_${navParams.type}`];
        const { id } = this.props.data.user.data;
        const { params } = this.state;

        console.log({
            status: "upload",
            msg: "上传excel数据中"
        }, {
                //加工批号: "62044171101" || params["批号"],
                '用户ID': id,
                ...data.carry,
                ...Object.assign(this.getPreValue(data), params)
            });

        uploadExcelData({
            //加工批号: "62044171101" || params["批号"],
            '用户ID': id,
            ...data.carry,
            ...Object.assign(this.getPreValue(data), params)
        })
            .then(() => {
                console.log({
                    status: "getProgress",
                    msg: "开始获取进度"
                });
                Tip.loading("开始上传excel数据");
                this.getProgress();

            })
            .catch(e => {
                console.log(e, 'e')
                console.log({
                    status: "error",
                    msg: "上传excel数据失败"
                });
            });
    }
    getProgress = () => {

        clearTimeout(this.timeout);
        const { params: navParams } = this.props.navigation.state;
        const { id } = this.props.data.user.data;
        const { status, data } = this.props.layout[`offer_${navParams.type}`];

        getUpdateGetExcelListPer(data.carry)
            .then(res => {
                const { percent } = res;
                if (+percent === 100) {
                    console.log({
                        status: "getProgress",
                        progress: percent,
                        msg: "进度100%"
                    });
                    Tip.dismiss("上传excel数据完毕");
                    this.publish();
                } else {
                    console.log({
                        status: "getProgress",
                        progress: percent,
                        msg: "进度" + percent + "%"
                    });
                    this.timeout = setTimeout(this.getProgress, 2000);
                }
            })
            .catch(e => {
                this.getProgress();
            });
    }
    publish() {
        const { params: navParams } = this.props.navigation.state;
        const { data } = this.props.layout[`offer_${navParams.type}`];
        console.log({
            status: "getData",
            msg: "获取excellist"
        });
        getExcelList({ ...data.carry, excel: true })
            .then(res => {
                console.log({
                    status: "complete",
                    msg: "准备将excel数据发布",
                    res
                });

                publishExcelData({
                    data: JSON.stringify(res)
                })
                    .then(res => {
                        console.log(res, "发布成功");
                        Tip.success('发布成功');
                        navigate({
                            routeName: 'my-cloud-offer'
                        });
                    })
                    .catch(e => {
                        Tip.fail('发布失败');
                        console.log(e, "发布失败");
                    });

            })
            .catch(e => {
                console.log({
                    e,
                    status: "error",
                    msg: "获取excel列表数据失败"
                });
            });
        return;
    }
    checkAuth() {
        const { status, data } = this.props.data.auth;
        switch (status) {
            case "success": {
                if (data.state === '2') {
                    return {
                        ok: true,
                    }
                } else {
                    return {
                        ok: false,
                        msg: authStatusMap[data.state]
                    }
                }
            }
            case 'loading':
                return {
                    ok: false,
                    msg: '获取信息中...'
                }

            case 'error':
                return {
                    ok: false,
                    msg: '获取信息失败'
                }
        }
    }
    submit = () => {
        const { ok, msg } = this.checkAuth();
        if (!ok) {
            return Tip.fail(msg);
        }
        const { params: navParams } = this.props.navigation.state;
        const { params } = this.state;
        const { id } = this.props.data.user;
        const { status, data } = this.props.layout[`offer_${navParams.type}`];
        const doParams = Object.assign(this.getPreValue(data), params, data.carry);
        // console.log(doParams,'doParams');
        // return
        if (status === 'success') {
            const { url, action } = data.verify;
            // if (navParams['棉花云报价类型'] === 1 ["新疆棉", "拍储",'地产棉'].includes()) {
            //找批号字段
            let number = "";
            for (const key in params) {
                if (key.includes("批号")) {
                    number = params[key];
                    break;
                }
            }
            console.log('验证批号');
            send({
                action,
                data: { number: number, userId: id, url, carry: data.carry }
            })
                .then(res => {
                    this.uploadExcelData();
                    // doSubmit(data.do, doParams)
                    //     .then(res => {
                    //         asyncActionWrapper({
                    //             call: getOfferList,
                    //             params: { ...navParams, '用户ID': id },
                    //             type: 'data',
                    //             key: `offer_list_${navParams.type}`
                    //         });
                    //         Tip.success('操作成功');
                    //     })

                })
                .catch(e => {
                    console.log(e, 'e');
                    Tip.fail(e);
                })
            // } else {
            //     doSubmit(data.do, doParams)
            //         .then(res => {
            //             asyncActionWrapper({
            //                 call: getOfferList,
            //                 params: { ...navParams, '用户ID': id },
            //                 type: 'data',
            //                 key: `offer_list_${navParams.type}`
            //             });
            //             Tip.success('操作成功');
            //         })
            // }

        }

    }

    render() {
        const { params: navParams } = this.props.navigation.state;
        const { picker, params } = this.state;
        const { status, loading, data, msg } = this.props.layout[`offer_${navParams.type}`];
        console.log({
            data,params
        })
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
                    value={picker.value}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
            </View>
        )
    }
}

