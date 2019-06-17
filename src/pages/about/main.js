

import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Image, Text, ScrollView, TButton } from '../../ui';
import { windowWidth } from '../../utils';
import { call } from '../../actions';
import './main.scss';
import './component.scss';

const links = [
    {
        label: '客服热线',
        value: '0512-58707332',
        type: 'mobile'
    },
    {
        label: '中棉网网址',
        value: 'http://pc.chncot.com/'
    },
    {
        label: '客服邮箱',
        value: '13862222233@139.com'
    },
];
const qr = require('./img/qr.jpeg');
@connect(({ data }) => ({ data }))
export default class About extends Component {
    state = {

    };

    render() {
        return (
            <View className="container">
                <ScrollView>
                    <View className="o">
                        <Text className="text">
                            中棉网是一家开展电子商务平台运营、产业研究、行业咨询等服务的企业，促进以云计算、物联网、大数据为代表的新一代信息技术与现代农业融合创新，发展壮大新兴业态，打造新的产业增长点，为大众创新提供环境，为产业智能化提供支撑，增强新的经济发展动力，创造互联网+农业的产业链。
                        </Text>
                    </View>
                    <View className="t">
                        <Text className="text">
                            中棉网微信公众号二维码：
                        </Text>
                        <Image src={qr} className="qr" style={{ width: (windowWidth - 40) + 'px', height: (windowWidth - 40) + 'px', }} />
                    </View>
                    <View className="list">
                        {
                            links.map(link => {
                                const { type, label, value } = link;
                                return (
                                    <View className="item">
                                        <View className="item-label">
                                            <Text className="item-label-text">
                                                {label}
                                            </Text>
                                        </View>
                                        {
                                            type === 'mobile' ?
                                                (
                                                    <TButton onClick={() => {
                                                        call(value);
                                                    }}>
                                                        <View className="item-value">
                                                            <Text className={classnames("item-value-text",'mobile-text')}>
                                                                {value}
                                                            </Text>
                                                        </View>
                                                    </TButton>
                                                ) : (
                                                    <View className="item-value">
                                                        <Text className="item-value-text">
                                                            {value}
                                                        </Text>
                                                    </View>
                                                )
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

