
import React from 'react';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default (props) => {
  const { current, onClick } = props;

  return <ScrollableTabView
    //style={{marginTop: 20, }}
    initialPage={current}
    tabBarActiveTextColor={'#6c8fd3'}
    tabBarInactiveTextColor={'#000'}
    tabBarTextStyle={{ fontSize: 13 }}
    tabBarUnderlineStyle={{
      height: 2,
      backgroundColor: '#6c8fd3'
    }}
    //onChangeTab={onChangeTab}
    renderTabBar={() => <ScrollableTabBar />}
  >
    {props.children}
  </ScrollableTabView>;
}