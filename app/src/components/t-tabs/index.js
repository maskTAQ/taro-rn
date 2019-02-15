
import React from 'react';
import {
  Text,
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default (props) => {
  return <ScrollableTabView
    style={{marginTop: 20, }}
    initialPage={1}
    renderTabBar={() => <DefaultTabBar />}
  >
   {props.children}
  </ScrollableTabView>;
}