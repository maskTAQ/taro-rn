

import React from 'react';
import { Component, connect, getLaunchOptionsSync } from '../../platform';
import update from 'immutability-helper';

import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TSTab, TModal, ListView } from '../../ui';
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
        //用以强制列表更新
        timestamp: '',
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
        pageSize: 10,
        count: {}
    };
    hasTriggerPcLogin = false;
    componentWillMount() {
        const { onChange, data, navigation, activeTab } = this.props;
        // const { client_id } = navigation.state.params;
        const { status } = data.user;
        const { status: listStatus, data: listData } = data[`offer_list_${activeTab}`] || {};

        const { query: { client_id, params } } = getLaunchOptionsSync();

        if (client_id) {
            this.hasTriggerPcLogin = true;
        }
        if (status === 'success') {
            this.emitPcLogin(data.user.data);
        }
        if (params) {
            try {
                const p = JSON.parse(params);
                this.setState({
                    params: p
                })
            } catch (e) {
                console.log(e)
            }
        }

        //获取筛选布局
        this.getFilterLayout();
        //获取首页数据
        getHome()
            .then(res => {
                this.props.dispatch({
                    type: 'data',
                    key: 'host',
                    payload: res.url
                });
                this.setState(res);
            })
        // //判断是否触发扫码
        // if (status !== 'init') {
        //     this.isFirstLoad = false;
        //     if (status === 'success') {
        //         this.getAuthInfo(data.user.data);
        //         if (client_id) {
        //this.emitPcLogin(client_id);
        //         } else {
        //             setTimeout(() => {
        //                 this.emitPcLogin({
        //                     pcClientId: this.props.navigation.state.params.client_id,
        //                     userData: data.user.data
        //                 });
        //                 //Tip.success(this.props.navigation.state.params.client_id || '没有')
        //                 /*
        //                 1.扫码携带的参数在组件挂载时获取不到 只能在componentWillReceiveProps中获取
        //                 2.android不能触发componentWillReceiveProps
        //                 3.强制更改props
        //                 */
        //                 //onChange()
        //             }, 1000)
        //         }
        //     } else {
        //         Tip.fail('请重试!');
        //     }
        //     // this.updateLog(navigation.state.params);

        // } else {
        //     this.isFirstLoad = true;
        // }
        // this.loginTriggered = false
    }
    componentWillReceiveProps(nextProps) {
        const { data: prevData, data: { homeActiveTab: prevTab, auth = {} } } = this.props;
        const { data: nextData, data: { homeActiveTab: nextTab } } = nextProps;

        if (prevData.user.status !== 'success' && nextData.user.status === 'success' && !['loading', 'success'].includes(auth.status)) {
            this.emitPcLogin(nextData.user.data);
            this.getAuthInfo(nextData.user.data)
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
    emitPcLogin(userData) {
        if (this.hasTriggerPcLogin) {
            const { query: { client_id } } = getLaunchOptionsSync();
            send({ action: 'login', mpClientId: clientId, pcClientId: client_id, data: userData })
                .then(res => {
                    Tip.success('登录成功');
                })
                .catch(e => {
                    console.log('登录失败');
                })
            this.hasTriggerPcLogin = false;
        }

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
            }, this.refreshList)
        }
    }
    getParams() {
        return this.state.params;
    }
    getFilterLayout(homeActiveTab) {
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
    }

    getOfferData = (pageParams) => {
        const { current, pageSize, tab = this.state.activeTab } = pageParams || { current: 1, pageSize: this.state.pageSize }
        const { params } = this.state;
        const { homeActiveTab } = this.props.data;
        this.forceUpdate();

        setTimeout(() => {
            if (params.search) {
                return getSearchOfferList(
                    { '棉花云报价类型': productTypesValue[tab || homeActiveTab], ...params }
                )
                    .then(res => {
                        this.list.getDataThen(res.list.splice((current - 1) * pageSize, current * pageSize));
                    })
                    .catch(e => {
                        this.list.getDataCatch(e);
                    })
            } else {
                return getOfferList({ '棉花云报价类型': productTypesValue[homeActiveTab], ...params })
                    .then(res => {
                        if (res.list[0]) {
                            this.setState({
                                count: res.list[0].c_count
                            })
                        }
                        this.list.getDataThen(res.list.splice((current - 1) * pageSize, current * pageSize));
                    })
                    .catch(e => {
                        this.list.getDataCatch(e);
                    })
            }
        }, 100)

    }

    handleTabChange = activeTab => {
        if (activeTab === this.props.data.homeActiveTab) {
            return;
        }
        this.props.dispatch({
            type: 'setHomeActiveTab',
            payload: activeTab
        });
        // clearTimeout(this.timeout);
        this.getFilterLayout(activeTab);
        this.refreshList()

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
        }, this.refreshList);
    }
    submit = () => {
        this.refreshList();
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
    refreshList = () => {

        if (this.list) {
            this.list.refresh();
        }
    }
    loadMoreList = () => {
        if (this.list) {
            this.list.loadMore();
        }
    }
    forceUpdate = () => {
        this.setState({
            timestamp: Date.now()
        });
    }
    getList() {
        return this.list ? this.list.state.dataSource : [];
    }
    render() {
        const { picker, ad, news, params, url, hasClickAddShoppingCar, count, pageSize } = this.state;
        const { data, layout } = this.props;
        const activeTab = data.homeActiveTab;
        const { status: loginStatus } = data.user;
        const { status, loading, data: layoutData } = layout[`filter_${activeTab}`];
        return (
            <View className="container">
                <Authorization />
                <ScrollView className="scroll-container">
                    <SearchTool isHome={true} value={params.search} onInput={this.handleSearchChange} onSearch={() => this.refreshList()} />
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
                    <TSTab list={productTypes} active={activeTab} tag={count} onTabChange={this.handleTabChange} />
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
                    <ListView
                        onRequestGetData={this.getOfferData}
                        allowRefresh={true}
                        ref={e => this.list = e}
                        //key={timestamp}
                        onDataSourceChange={this.forceUpdate}
                        pageSize={pageSize}
                    >
                        <View>
                            {this.getList().map((item, i) => {
                                return (
                                    <OfferItem
                                        key={item.c_ybj1}
                                        isHome={true}
                                        data={item}
                                    />
                                )
                            })}
                        </View>
                    </ListView>
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

