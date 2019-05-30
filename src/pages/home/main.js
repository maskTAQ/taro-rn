

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TSTab, TButton, TModal } from '../../ui';
import { SearchTool, NoticeTool, SearchCondition, OfferItem, Authorization, ListWrapper, FixedTool } from '../../components';
import { getFilterLayout, getHome, getOfferList, addShoppingCar, getShoppingCarList } from '../../api';
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
        hasClickAddShoppingCar: false
    };
    componentWillMount() {

        getHome()
            .then(res => {
                this.props.dispatch({
                    type: 'data',
                    key: 'host',
                    payload: res.url
                });
                this.setState(res);
            })
        this.getData();
        const { client_id: pcClientId } = this.props.navigation.state.params;
        if (this.props.data.user.status === 'success' && pcClientId) {
            send({ action: 'login', mpClientId: clientId, pcClientId, data: this.props.data.user.data })
                .then(res => {
                    Tip.success('登录成功');
                })
        }
    }
    isShouldLogin = false
    componentWillReceiveProps(nextProps) {
        const { client_id: pcClientId } = this.props.navigation.state.params;
        if (!this.props.navigation.state.params.client_id && nextProps.navigation.state.params.client_id) {
            this.isShouldLogin = true;
        }
        if (nextProps.data.user.status === 'success' && this.isShouldLogin) {
            this.isShouldLogin = false;
            send({ action: 'login', mpClientId: clientId, pcClientId, data: nextProps.data.user.data })
                .then(res => {
                    Tip.success('登录成功');
                })
        }
        if (this.props.data.user.status === 'loading' && nextProps.data.user.status === 'error') {
            Tip.fail('扫码登录失败!');
        }
    }
    componentDidMount() {
        this.initParams();
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
        asyncActionWrapper({
            call: getOfferList,
            params: { '棉花云报价类型': productTypesValue[homeActiveTab], ...params },
            type: 'data',
            key: `offer_list_${homeActiveTab}`
        });
    }

    handleTabChange = activeTab => {
        this.props.dispatch({
            type: 'setHomeActiveTab',
            payload: activeTab
        });
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
    handleClickShoppingCar = (v) => {
        const { status: loginStatus, data } = this.props.data.user;
        this.setState({
            hasClickAddShoppingCar: true
        });
        if (loginStatus === 'success') {
            addShoppingCar({
                '云报价主键': v,
                '用户ID': data.id
            })
                .then(res => {
                    asyncActionWrapper({
                        call: getShoppingCarList,
                        params: { '用户ID': data.id },
                        type: 'data',
                        key: 'shoppingCarList'
                    });
                    Tip.success('添加成功!');
                })
        }
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

        const { picker, ad, news, params, url, hasClickAddShoppingCar } = this.state;
        const { data, layout } = this.props;
        const activeTab = data.homeActiveTab;
        const { status: loginStatus } = data.user;
        const { status, loading, data: layoutData } = layout[`filter_${activeTab}`];
        const { status: listStatus, data: listData } = data[`offer_list_${activeTab}`];
        return (
            <View className="container">
                <Authorization />
                <ScrollView className="scroll-container">
                    <SearchTool value={params.search} onInput={this.handleSearchChange} onSearch={this.search} />
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
                            listStatus === 'success' && listData.list.map((item, i) => {
                                return (
                                    <OfferItem
                                        isHome={true}
                                        data={item}
                                        map={listData.key}
                                        onClickShoppingCar={this.handleClickShoppingCar}
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

