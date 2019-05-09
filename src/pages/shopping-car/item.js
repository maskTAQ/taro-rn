
import React from 'react';
import { Component } from '../../platform';
import update from 'immutability-helper';

import { OfferItem } from '../../components';
import { View, Text, TTag, TButton, Visible } from '../../ui'
import './item.scss';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
export default class Item extends Component {
    toggleCheckedStatus = () => {
        const { onCheckedChange, checkedOfferList } = this.props;
        const key = this.g('主键');
        const index = checkedOfferList.indexOf(key);
        if (index > -1) {
            onCheckedChange(update(checkedOfferList, {
                $splice: [[index, 1]]
            }));
        } else {
            onCheckedChange(update(checkedOfferList, {
                $push: [key]
            }));
        }
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
    }
    render() {
        const { data, map, checkedOfferList } = this.props;
        const checked = checkedOfferList.includes(this.g('主键'));
        return (
            <View className="container">
                <View className="container-left">
                    <TButton onClick={this.toggleCheckedStatus}>
                        <Image className="checked-icon" src={checked ? checkedImg : uncheckedImg} />
                    </TButton>
                </View>
                <View className='content'>
                    <OfferItem data={data} map={map} showShoppinCar={false} />
                </View>
            </View>
        )
    }
}