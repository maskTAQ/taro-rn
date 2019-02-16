
import React from 'react';
import {
  Text,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

export default (props) => {
  const { current } = props;
  console.log(props,'props');
  return <ScrollableTabView
    //style={{marginTop: 20, }}
    initialPage={current}
    renderTabBar={() => <ScrollableTabBar />}
  >
    {props.children}
  </ScrollableTabView>;
}