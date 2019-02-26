

import React from 'react';
import { Component } from '../../platform';

import { View, Image, TButton, Text } from '../../ui';
import mainStyleSheet from "./main_styles";
import cloudImg from '../../img/cloud.png';
import { navigate } from '../../actions';
var _styleSheet = mainStyleSheet;
let OfferTool = class OfferTool extends Component {
  goAddBatch() {
    navigate({ routeName: 'add-batch' });
  }
  goImportCotton() {
    navigate({ routeName: 'publish-import-cotton' });
  }
  render() {
    return <View style={_styleSheet["container"]}>
                <View style={[_styleSheet["content"], _styleSheet["mb"]]}>
                    <TButton onClick={this.goAddBatch} style={_styleSheet["btn"]}>
                        <View style={_styleSheet["item"]}>
                            <View style={[_styleSheet["item-icon-box"], _styleSheet["item-bg-1"]]}>
                                <Image src={cloudImg} style={_styleSheet["item-icon"]}></Image>
                            </View>
                            <Text style={_styleSheet["item-label"]}>国产棉-新疆棉</Text>
                        </View>
                    </TButton>
                    <TButton onClick={this.goImportCotton} style={_styleSheet["btn"]}>
                        <View style={_styleSheet["item"]}>
                            <View style={[_styleSheet["item-icon-box"], _styleSheet["item-bg-2"]]}>
                                <Image src={cloudImg} style={_styleSheet["item-icon"]}></Image>
                            </View>
                            <Text style={_styleSheet["item-label"]}>进口棉</Text>
                        </View>
                    </TButton>
                </View>
                <View style={_styleSheet["content"]}>
                    <TButton onClick={this.goAddBatch} style={_styleSheet["btn"]}>
                        <View style={_styleSheet["item"]}>
                            <View style={[_styleSheet["item-icon-box"], _styleSheet["item-bg-3"]]}>
                                <Image src={cloudImg} style={_styleSheet["item-icon"]}></Image>
                            </View>
                            <Text style={_styleSheet["item-label"]}>国产棉-内地棉</Text>
                        </View>
                    </TButton>
                    <TButton onClick={this.goAddBatch} style={_styleSheet["btn"]}>
                        <View style={_styleSheet["item"]}>
                            <View style={[_styleSheet["item-icon-box"], _styleSheet["item-bg-4"]]}>
                                <Image src={cloudImg} style={_styleSheet["item-icon"]}></Image>
                            </View>
                            <Text style={_styleSheet["item-label"]}>拍储棉</Text>
                        </View>
                    </TButton>
                </View>
            </View>;
  }
};
export { OfferTool as default };