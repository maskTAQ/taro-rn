import React from 'react';
import { Image } from 'react-native';

const ImageWrapper = props => {
    const { src, ...otherProps } = props;
    const source = typeof src === 'number' ? src : { uri: src };
     return <Image {...otherProps} source={source} />
};
export default ImageWrapper;