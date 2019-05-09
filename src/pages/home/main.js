

import React from 'react';
import { Component, connect } from '../../platform';


import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TSTab, TButton, TLoading, TModal } from '../../ui';
import { SearchTool, NoticeTool, SearchCondition, OfferItem, Authorization, ListWrapper } from '../../components';
import { getFilterLayout, getHome, getOfferList, addShoppingCar, getShoppingCarList } from '../../api';
import { navigate, asyncActionWrapper, login } from '../../actions';
import { productTypes, productTypesValue } from '../../constants';
import './main.scss';
import { Tip } from '../../utils';

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
    }
    login() {
        login()
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
    goCottonDetail(data) {
        const { homeActiveTab } = this.props.data;
        const { key } = this.props.data[`offer_list_${homeActiveTab}`].data;

        navigate({
            routeName: 'cotton-detail', params: {
                key,
                cottonType: homeActiveTab,
                id: data[key['批号']],
                defaultData: data,
                type: data[key['仓单']]
            }
        });
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
                {data.homeActiveTab}
                <Authorization />
                <ScrollView className="scroll-container">
                    <SearchTool />
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
                                    <TButton onClick={this.goCottonDetail.bind(this, item)} key={i} >
                                        <OfferItem
                                            data={item}
                                            map={listData.key}
                                            onClickShoppingCar={this.handleClickShoppingCar}
                                        />
                                    </TButton>
                                )
                            })
                        }
                    </ListWrapper>


                </ScrollView>
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

