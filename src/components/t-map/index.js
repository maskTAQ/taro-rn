import React from 'react';
import { Component } from '../../platform';
import { Map, CoverView, CoverImage, Button } from '@tarojs/components';

import ip from './img/ip.png'
import fk from './img/fk.png'
import './index.scss';
export default class TMap extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { longitude, latitude, markers, showLocation, onClickLocation, onClickFeedback } = this.props;
        return (
            <Map longitude={longitude} latitude={latitude} markers={markers} className="map" id="myMap" showLocation={showLocation}>
                <CoverView className="location">
                    <Button className="location-btn" onClick={onClickLocation}>
                        <CoverImage className="location-img" src={ip}></CoverImage>
                    </Button>
                </CoverView>
                <CoverView className="feedback">
                    <Button className="feedback-btn" onClick={onClickFeedback}>
                        <CoverImage className="feedback-img" src={fk}></CoverImage>
                    </Button>
                </CoverView>
            </Map>
        )
    }
}


