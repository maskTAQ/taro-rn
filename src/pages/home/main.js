

import React from 'react';
import { Component, connect, getSystemInfo } from '../../platform';
import update from 'immutability-helper';

import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TSTab, TModal } from '../../ui';
import { SearchTool, NoticeTool, SearchCondition, OfferItem, Authorization, ListWrapper, FixedTool } from '../../components';
import { getFilterLayout, getHome, getOfferList, getAuthInfo, getSearchOfferList } from '../../api';
import { asyncActionWrapper, login } from '../../actions';
import { productTypes, productTypesValue } from '../../constants';
import './main.scss';
import { Tip, clientId } from '../../utils';
import { send } from '../../api/ws';

@connect(({ layout, data }) => ({ layout, data }))
export default class Home extends Component {
    state = {
        picker: {
            visible: false,
            option: []
        },
        params: {},
        ad: [],
        news: [],
        key: {},
        list: [],
        hasClickAddShoppingCar: false,
        log: [],

        queueRenderList: [],
    };
    componentWillMount() {
        const { onChange, data, navigation, activeTab } = this.props;
        const { client_id } = navigation.state.params;
        const { status } = data.user;
        const { status: listStatus, data: listData } = data[`offer_list_${activeTab}`] || {};
        if (listStatus === 'success') {
            this.startQueueRender(listData, 'mounted');
        }

        getHome()
            .then(res => {
                this.props.dispatch({
                    type: 'data',
                    key: 'host',
                    payload: res.url
                });
                this.setState(res);
            })
        //this.getData();

        //判断是否触发扫码
        if (status !== 'init') {
            this.isFirstLoad = false;
            if (status === 'success') {
                this.getAuthInfo(data.user.data);
                if (client_id) {
                    this.emitPcLogin({
                        pcClientId: client_id,
                        userData: data.user.data
                    });
                } else {
                    setTimeout(() => {
                        this.emitPcLogin({
                            pcClientId: this.props.navigation.state.params.client_id,
                            userData: data.user.data
                        });
                        //Tip.success(this.props.navigation.state.params.client_id || '没有')
                        /*
                        1.扫码携带的参数在组件挂载时获取不到 只能在componentWillReceiveProps中获取
                        2.android不能触发componentWillReceiveProps
                        3.强制更改props
                        */
                        //onChange()
                    }, 1000)
                }
            } else {
                Tip.fail('请重试!');
            }
            // this.updateLog(navigation.state.params);

        } else {
            this.isFirstLoad = true;
        }
        this.loginTriggered = false

        getSystemInfo()
            .then(res => {
                if (res.platform === 'android') {
                    setTimeout(() => {
                        this.getData();
                    }, 1000)

                } else {
                    this.getData();
                }
            })

    }
    componentWillReceiveProps(nextProps) {
        const { data: prevData, data: { homeActiveTab: prevTab, auth = {} } } = this.props;
        const { data: nextData, data: { homeActiveTab: nextTab } } = nextProps;
        const { status: prevListStatus } = prevData[`offer_list_${prevTab}`] || {};
        const { status: nextListStatus, data: listData } = nextData[`offer_list_${nextTab}`] || {};
        // console.log({
        //     prevTab, nextTab, nextListStatus, prevListStatus
        // })
        if (prevTab !== nextTab && nextListStatus === 'success') {
            this.startQueueRender(listData, 'updated');
        }
        if (prevTab === nextTab && prevListStatus !== 'success' && nextListStatus === 'success') {
            this.startQueueRender(listData, 'updated');
        }
        if (prevData.user.status !== 'success' && nextData.user.status === 'success' && !['loading', 'success'].includes(auth.status)) {
            setTimeout(() => {
                this.getAuthInfo(nextData.user.data)
            }, 100)
        }

        //判断是否触发登录
        if (this.isFirstLoad) {
            //如果是首次加载的 并且等用户信息获取成功后 触发pc登录
            if (prevData.user.status !== 'success' && nextData.user.status === 'success' && nextProps.navigation.state.params.client_id) {
                this.emitPcLogin({
                    pcClientId: nextProps.navigation.state.params.client_id,
                    userData: nextData.user.data
                });
            }
        } else {
            //如果接收到pcid 并且之前没有触发过pc登录 则登录
            if (nextData.user.status === 'success' && nextProps.navigation.state.params.client_id && !this.loginTriggered) {
                this.emitPcLogin({
                    pcClientId: nextProps.navigation.state.params.client_id,
                    userData: nextData.user.data
                });
            }
        }

    }
    getAuthInfo(data) {
        // console.log(data, 'data')
        asyncActionWrapper({
            call: getAuthInfo,
            params: { 'user_id': data.id },
            type: 'data',
            key: 'auth'
        });
    }
    emitPcLogin({ pcClientId, userData }) {
        this.updateLog({
            type: '触发登录'
        });
        this.loginTriggered = true;
        send({ action: 'login', mpClientId: clientId, pcClientId, data: userData })
            .then(res => {
                Tip.success('登录成功');
            })
    }
    startQueueRender(full = [], type) {
        this.setState({
            queueRenderList: []
        }, () => {
            const clone = [...full.list];
            this.pushQueue(clone);
        });

    }
    pushQueue = (list) => {
        clearTimeout(this.timeout);
        const { queueRenderList } = this.state;
        if (list.length) {
            const chunk = list.splice(0, 1);
            this.setState({
                queueRenderList: queueRenderList.concat(chunk)
            });

            this.timeout = setTimeout(this.pushQueue, 500, list);
        }
    }
    updateLog(v) {
        const { log } = this.state;
        const next = [...log];
        next.push(v);
        this.setState({
            log: [...next]
        });
    }
    componentDidMount() {
        this.initParams();
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    login() {
        login()
    }
    initParams() {
        const { params } = this.props.navigation.state.params;
        if (params) {
            this.setState({
                params
            }, this.search)
        }
    }
    getParams() {
        return this.state.params;
    }
    getData(homeActiveTab) {
        const tab = homeActiveTab || this.props.data.homeActiveTab;
        const { status: layoutStatus, loading: layoutLoading } = this.props.layout[`filter_${tab}`];

        //获取筛选条件布局
        if (layoutStatus !== 'success' && !layoutLoading) {
            asyncActionWrapper({
                call: getFilterLayout,
                params: { '棉花云报价类型': productTypesValue[tab] },
                type: 'layout',
                key: `filter_${tab}`
            });
        }
        this.getOfferData();
    }
    getOfferData() {
        const { params } = this.state;
        const { homeActiveTab } = this.props.data;
        if (params.search) {
            asyncActionWrapper({
                call: getSearchOfferList,
                params: { '棉花云报价类型': productTypesValue[homeActiveTab], ...params },
                type: 'data',
                key: `offer_list_${homeActiveTab}`
            });
        } else {
            asyncActionWrapper({
                call: getOfferList,
                params: { '棉花云报价类型': productTypesValue[homeActiveTab], ...params },
                type: 'data',
                key: `offer_list_${homeActiveTab}`
            });
        }

    }

    handleTabChange = activeTab => {
        if (activeTab === this.props.data.homeActiveTab) {
            return;
        }
        this.props.dispatch({
            type: 'setHomeActiveTab',
            payload: activeTab
        });
        clearTimeout(this.timeout);
        this.getData(activeTab);
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
    resetParams = () => {
        this.setState({
            params: {}
        }, this.getOfferData);
    }
    search = () => {
        this.getOfferData();
    }
    submit = () => {
        this.getOfferData();
        this.s.folder();
    }

    handleFieldChange = params => {
        this.setState({ params })
    }
    handleSearchChange = v => {
        this.setState(update(this.state, {
            params: {
                search: {
                    $set: v
                }
            }
        }))
    }

    render() {
        const { picker, ad, news, params, url, hasClickAddShoppingCar, queueRenderList } = this.state;
        const { data, layout } = this.props;
        const activeTab = data.homeActiveTab;
        const { status: loginStatus } = data.user;
        const { status, loading, data: layoutData } = layout[`filter_${activeTab}`];
        const { status: listStatus, data: listData } = data[`offer_list_${activeTab}`] || {};
        return (
            <View className="container">
                <Authorization />
                <ScrollView className="scroll-container">
                    <SearchTool isHome={true} value={params.search} onInput={this.handleSearchChange} onSearch={this.search} />
                    <Swiper
                        className='swiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular
                        indicatorDots
                        autoplay>
                        {
                            ad.map((item) => {
                                const { logo } = item;
                                return (
                                    <SwiperItem className="banner-item" key={logo}>
                                        <Image
                                            className="banner-item"
                                            src={url + logo}
                                        />
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>
                    <NoticeTool data={news} />
                    <TSTab list={productTypes} active={activeTab} onTabChange={this.handleTabChange} />
                    <SearchCondition
                        status={status}
                        loading={loading}
                        picker={picker}
                        data={layoutData}
                        params={params}
                        onFieldChange={this.handleFieldChange}
                        onChangePickerData={this.changePickerData}
                        onResetParams={this.resetParams}
                        onSubmit={this.submit}
                        ref={e => this.s = e}
                    />
                    <ListWrapper status={listStatus} data={listData}>
                        {
                            listStatus === 'success' && queueRenderList.map((item, i) => {
                                return (
                                    <OfferItem
                                        key={ item.c_ybj1}
                                        isHome={true}
                                        data={item}
                                    />
                                )
                            })
                        }
                    </ListWrapper>


                </ScrollView>
                <FixedTool home={true} />
                <TPicker onClick={this.handlePickerChange}
                    show={picker.visible}
                    value={picker.value}
                    onCancel={this.closePicker}
                    onClose={this.closePicker}
                    option={picker.option.map(item => ({ label: item, value: item }))}
                />
                <TModal
                    visible={loginStatus !== 'success' && hasClickAddShoppingCar}
                    onConfirm={this.login}
                    confirmText="授权登录"
                    onClose={this.login}
                    hasCancalButton={false}
                >
                    <View className="authorization">
                        <Text className="authorization-text">请先授权登录</Text>
                    </View>
                </TModal>
            </View>
        )
    }
}

