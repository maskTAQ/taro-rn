import React from 'react';
import { Component, connect } from '../../platform';

import { TInput, TButton, Image } from '../../ui';
import { scan, Tip, clientId } from '../../utils';
import searchImg from './img/search.png';
import qrImg from './img/qr.png';
import './index.scss'
import { send } from '../../api/ws';

@connect(({ data }) => ({ user: data.user }))
export default class SearchTool extends Component {
    static options = {
        addGlobalClass: true
    }
    scan = () => {
        const { status, data } = this.props.user;
        if (status === 'success') {
            scan()
                .then(res => {
                    const { type, clientId: pcClientId } = res;
                    if (type === 'cotton') {
                        send({ action: 'login', mpClientId: clientId, pcClientId, data })
                            .then(res => {
                                Tip.success('登录成功');
                            })
                    } else {
                        Tip.fail('非法二维码');
                    }
                })
                .catch(e => {
                    Tip.fail('扫码失败,请重试!');
                })

        } else {
            Tip.fail('请先登录!');
        }

    }
    render() {
        const { onInput, value, onSearch } = this.props;
        return (
            <View className="container">
                <View className="content">
                    <View className="input-box">
                        <TInput value={value} onInput={onInput} className="search-input" placeholder="通过批号/仓库/卖家/提单号 搜索" />
                    </View>
                    <View className="icon-btn-group">
                        <TButton onClick={onSearch}>
                            <Image className="icon-btn mr" src={searchImg}></Image>
                        </TButton>
                        <TButton onClick={this.scan}>
                            <Image className="icon-btn" src={qrImg}></Image>
                        </TButton>
                    </View>
                </View>
            </View>
        )
    }
}


