

import React from 'react';
import { Component, connect } from '../../platform';


import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TSTab, TButton, } from '../../ui';
import { SearchTool, NoticeTool, SearchCondition, MainItem } from '../../components';
import { getFilterLayout, getHome, getOfferList } from '../../api';
import { navigate, asyncActionWrapper } from '../../actions';
import { productTypes } from '../../constants';
import './main.scss';
const item = {
    id: '562781322',

    ysj: '21+',
    cd: '12',
    ql: 21.2,
    mz: 1,
    cz: '0.0',
    hc: '0.0',
    hz: '0.0',
    jg: '<15003',

    shd: '盐城',
    mj: '盐城捷多纺织品有限公司',
    zwjhsj: '2019-01-01',
    cgjs: '200d吨',

    sl: '12',
    ztj: '1231',
    dcj: '1331',

    xqbh: '12132987130',

    jc: '+120',
    'y/d': '15720',
    gz: '45.455',

    ph: "454212552",
    ck: '中储棉库存厄尔有限责任公司',
    gys: '河北星宇纺织原料有限责任公司'
};

@connect(({ layout }) => ({ layout }))
export default class Home extends Component {
    state = {
        activeTab: '新疆棉',
        picker: {
            visible: false,
            option: []
        },
        params: {},

        bannerList: ['https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png'],
        list: [item, item, item, item, item],
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['ph', 'ck', 'gys'],
        offerItemDescList: ['xqbh', 'mj'],
        current: 0,
        pickerVisible: false,
        searchConditionVisible: false,

        ad: [],
        news: [],
        key: {},
        list: [],
    };
    componentWillMount() {
        getHome()
            .then(res => {
                this.setState(res);
            })
        this.getData();
    }
    getData() {
        const { activeTab } = this.state;
        const { status, loading } = this.props.layout[`filter_${activeTab}`];
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getFilterLayout,
                params: { '棉花云报价类型': productTypes.indexOf(activeTab) + 1 },
                type: 'layout',
                key: `filter_${activeTab}`
            });
        }
        getOfferList({ '棉花云报价类型': productTypes.indexOf(activeTab) + 1 })
            .then(res => {
                this.setState(res);
            })
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
    resetParams = () => {
        this.setState({
            params: {}
        });
    }
    submit = () => {
        console.log(this.state.params, 'params')
    }
    handleFieldChange = params => {
        this.setState({ params })
    }
    goCottonDetail(data) {
        const { key } = this.state;
        navigate({
            routeName: 'cotton-detail', params: {
                key,
                id: data[key['批号']],
                defaultData: data,
                showCertificate: data[key['仓单']] == '1'
            }
        });
    }
    render() {
        const { picker, ad, news, activeTab, params, url, key, list } = this.state;
        const { status, loading, data } = this.props.layout[`filter_${activeTab}`];
        return (
            <View className="container">
                <ScrollView>
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
                        data={data}
                        params={params}
                        onFieldChange={this.handleFieldChange}
                        onChangePickerData={this.changePickerData}
                        onResetParams={this.resetParams}
                        onSubmit={this.submit}
                    />
                    <View className="list">
                        {list.map((item, i) => {
                            return (
                                <TButton onClick={this.goCottonDetail.bind(this, item)} key={i}>
                                    <MainItem border={true} data={item} map={key} />
                                </TButton>
                            )
                        })}
                    </View>
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

