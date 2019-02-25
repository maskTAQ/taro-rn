

import React from 'react';
import { Component } from '../../platform';

import { Swiper, SwiperItem, View, Image, ScrollView, TPicker, TTabs, TTabPane, TButton } from '../../ui';
import { SearchTool, NoticeTool, SearchCondition, MainItem } from '../../components';

import mainStyleSheet from "./main_styles";
import { navigate } from '../../actions';
var _styleSheet = mainStyleSheet;
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

let Home = class Home extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      bannerList: ['https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png', 'https://t1.hddhhn.com/uploads/tu/201612/98/st93.png'],
      list: [item, item, item, item, item],
      itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
      offerItemKeyList: ['sl', 'ztj', 'dcj'],
      itemDescList: ['ph', 'ck', 'gys'],
      offerItemDescList: ['xqbh', 'mj'],
      current: 0,
      pickerVisible: false,
      searchConditionVisible: false
    }, this.handleClick = current => {
      this.setState({
        current
      });
    }, this.showPicker = showPicker => {
      this.setState({
        pickerVisible: true
      });
    }, this.toggleSearchConditionVisible = () => {
      this.setState({
        searchConditionVisible: !this.state.searchConditionVisible
      });
    }, this.closePicker = () => {
      this.setState({
        pickerVisible: false
      });
    }, _temp;
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goCottonDetail() {
    navigate({ routeName: 'cotton-detail' });
  }

  render() {
    const { list, current, pickerVisible, searchConditionVisible, bannerList } = this.state;
    const tabList = ["新疆棉", "地产棉", "进口棉￥", "进口棉$", "拍储棉"];
    return <View style={_styleSheet["container"]}>
                <SearchTool />
                <Swiper indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay style={_styleSheet["swiper"]}>
                    {bannerList.map(url => {
          return <SwiperItem key={url} style={_styleSheet["banner-item"]}>
                                    <Image src={url} style={_styleSheet["banner-item"]} />
                                </SwiperItem>;
        })}
                </Swiper>
                <NoticeTool />
                <ScrollView>
                    <TTabs scroll={true} current={current} tabList={tabList} onClick={this.handleClick}>
                        {tabList.map((item, index) => {
            return <TTabPane tabLabel={item} current={current} index={index}>
                                        <SearchCondition show={searchConditionVisible} onToggle={this.toggleSearchConditionVisible} label={tabList[current]} current={current} onShowPicker={this.showPicker} />
                                        <View style={_styleSheet["list"]}>
                                            {list.map(() => {
                  return <TButton onClick={this.goCottonDetail}>
                                                        <MainItem border={true} />
                                                    </TButton>;
                })}
                                        </View>

                                    </TTabPane>;
          })}
                    </TTabs>
                </ScrollView>
                <TPicker show={pickerVisible} option={[{ label: 1, value: 1 }]} onClick={this.closePicker} onCancel={this.closePicker} onClose={this.closePicker} />
            </View>;
  }
};
export { Home as default };