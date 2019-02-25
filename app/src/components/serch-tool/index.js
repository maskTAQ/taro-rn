var _class, _temp;

import React, { Component } from "react";
import { View, TInput, TButton, Image } from '../index';

import searchImg from './img/search.png';
import qrImg from './img/qr.png';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
let
    SearchTool = (_temp = _class = class SearchTool extends Component {
        render() {
            const { onClick, className } = this.props;
            return <View style={_styleSheet["container"]}>
                <View style={_styleSheet["content"]}>
                    <View style={_styleSheet["input-box"]}>
                        <TInput placeholder="通过批号/工厂/仓库搜索" style={_styleSheet["search-input"]} />
                    </View>

                    <View style={_styleSheet["icon-btn-group"]}>
                        <TButton>
                            <Image src={searchImg} style={[_styleSheet["icon-btn"], _styleSheet["mr"]]}></Image>
                        </TButton>
                        <TButton>
                            <Image src={qrImg} style={_styleSheet["icon-btn"]}></Image>
                        </TButton>
                    </View>
                </View>
            </View>;
        }
    }, _class.options = {
        addGlobalClass: true
    }, _temp);
export { SearchTool as default };