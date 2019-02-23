

import { Component } from '@tarojs/taro';

import { Swiper, SwiperItem } from '@tarojs/components'
import { View, Image, ScrollView, TTabs, TTabPane, TButton } from '../../components'

import Item from './item';
import './main.scss';
import { navigate } from '../../actions';



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


export default class Home extends Component {


    state = {
        bannerList: ['https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png'],
        list: [item, item, item, item, item],
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['ph', 'ck', 'gys'],
        offerItemDescList: ['xqbh', 'mj'],
        current: 0,
    };
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick = (current) => {
        this.setState({
            current
        });
    }
    goCottonDetail() {
        navigate({ routeName: 'cotton-detail' });
    }
    render() {
        const { list, itemDescList, itemKeyList, current } = this.state;
        const tabList = ["新疆棉", "地产棉", "进口棉￥", "进口棉$", "拍储棉"];
        return (
            <View className="container">
                <Swiper
                    className='swiper'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay>
                    {
                        bannerList.map(url => {
                            return (
                                <SwiperItem className="banner-item" key={url}>
                                    <Image
                                        className="banner-item"
                                        src={url}
                                    />
                                </SwiperItem>
                            )
                        })
                    }
                </Swiper>
                <ScrollView>
                    <TTabs scroll={true} current={current} tabList={tabList} onClick={this.handleClick}>
                        {
                            tabList.map((item, index) => {
                                return (
                                    <TTabPane tabLabel={item} current={current} index={index}>

                                        {list.map((item, index) => {
                                            return (
                                                <TButton onClick={this.goCottonDetail}>
                                                    <Item item={item} index={index} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                                                </TButton>
                                            )
                                        })}

                                    </TTabPane>
                                )
                            })
                        }
                    </TTabs>
                </ScrollView>
            </View>
        )
    }
}

