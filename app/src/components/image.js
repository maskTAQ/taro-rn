import React from 'react';
import { Image } from 'react-native';

const ImageWrapper = props => {
    const { src: source, ...otherProps } = props;
    return <Image {...otherProps} source={source} />
};
export default ImageWrapper;