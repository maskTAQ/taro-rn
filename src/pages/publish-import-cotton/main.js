

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, Text, TPicker, ScrollView, TButton, TSTab } from '../../ui';
import { Layout } from '../../components';
import { authStatusMap } from '../../constants';
import { getOfferLayout, uploadExcelData, getExcelList, publishExcelData, getUpdateGetExcelListPer } from '../../api';
import { asyncActionWrapper, navigate } from '../../actions';
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
        const { current } = this.state;
        const { status } = this.props.layout[`offer_${layoutTypes[current]}`] || {};
        if (status === 'success') {
            this.uploadExcelData();
        }
    }
    uploadExcelData() {
        const { current, params } = this.state;
        const { data } = this.props.layout[`offer_${layoutTypes[current]}`] || {};
        const { id } = this.props.data.user.data;

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
        const { current, params } = this.state;
        const { data } = this.props.layout[`offer_${layoutTypes[current]}`] || {};

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
        const { current } = this.state;
        const { data } = this.props.layout[`offer_${layoutTypes[current]}`] || {};

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
                    value={picker.value}
                    show={picker.visible}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
            </View>
        )
    }
}

