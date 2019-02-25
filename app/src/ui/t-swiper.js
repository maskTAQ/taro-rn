import React, { Component } from 'react';
import { View } from 'react-native';

import Swiper from 'react-native-swiper';

const SwiperWrapper = ({ style, children }) => {
  const { height, } = style;
  return (
    <View style={{ height }}>
      <Swiper style={style} showsButtons={false}>
        {children}
      </Swiper>
    </View>
  )
}
export default SwiperWrapper;
export const SwiperItem = ({ children }) => children;