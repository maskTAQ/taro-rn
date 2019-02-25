var _class, _temp2;

import React,{ Component } from 'react';


import { View, Visible, TButton, Text } from '../index';

import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
const map = [[{
  title: '产地',
  type: 'radio',
  option: ['不限', '地方', '兵团']
}, {
  title: '类型',
  type: 'radio',
  option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
}, {
  title: '交货地',
  type: 'radio',
  option: ['新疆仓库', '内地仓库']
}, {
  title: '质量',
  type: 'picker',
  option: [{
    key: '',
    label: 'xx',
    pickerOption: [{ label: 'test', value: '12' }]
  }]
}], [{
  title: '产地',
  type: 'radio',
  option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
}, {
  title: '类型',
  type: 'radio',
  option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
}, {
  title: '交货地',
  type: 'radio',
  option: ['新疆仓库', '内地仓库']
}, {
  title: '质量',
  type: 'picker',
  option: []
}], [{
  title: '产地',
  type: 'radio',
  option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
}, {
  title: '类型',
  type: 'radio',
  option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
}, {
  title: '交货地',
  type: 'radio',
  option: ['新疆仓库', '内地仓库']
}, {
  title: '质量',
  type: 'picker',
  option: []
}], [{
  title: '产地',
  type: 'radio',
  option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
}, {
  title: '类型',
  type: 'radio',
  option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
}, {
  title: '交货地',
  type: 'radio',
  option: ['新疆仓库', '内地仓库']
}, {
  title: '质量',
  type: 'picker',
  option: []
}], [{
  title: '产地',
  type: 'radio',
  option: ['不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团', '不限', '地方', '兵团']
}, {
  title: '类型',
  type: 'radio',
  option: ['手摘棉', '机采棉', '皮昆棉', '长城棉']
}, {
  title: '交货地',
  type: 'radio',
  option: ['新疆仓库', '内地仓库']
}, {
  title: '质量',
  type: 'picker',
  option: []
}]];
let SearchCondition = (_temp2 = _class = class SearchCondition extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      pickerVisible: false
    }, this.showPicker = item => {
      const { onShowPicker } = this.props;
      onShowPicker(item);
    }, _temp;
  }

  formateData(d) {
    const data = [].concat(d);
    const result = [];

    while (data.length) {
      if (result.length === 0) {
        result.push([]);
      }
      if (result[result.length - 1].length > 3) {
        result.push([data.shift()]);
      } else {
        result[result.length - 1].push(data.shift());
      }
    }
    return result;
  }

  render() {
    const { label, current = 0, show, onToggle } = this.props;
    return <View style={_styleSheet["container"]}>
                <TButton onClick={onToggle}>
                    <View style={_styleSheet["title"]}>
                        <Text style={_styleSheet["title-text"]}>
                            {label}定制牌价
                    </Text>
                    </View>
                </TButton>
                <Visible show={show}>
                    <View style={_styleSheet["content"]}>
                        {map[current].map(classify => {
            const { title, type } = classify;
            return <View style={_styleSheet["classify-box"]}>

                                        <View style={_styleSheet["classify-box-title"]}>
                                            <Text style={_styleSheet["classify-box-title-text"]}>
                                                {title}
                                            </Text>
                                        </View>
                                        {type === 'radio' ? <View style={_styleSheet["classify-content"]}>
                                                    {this.formateData(classify.option).map(row => {
                  return <View style={_styleSheet["item-row"]}>
                                                                    {row.map(item => {
                      return <TButton>
                                                                                    <View style={_styleSheet["item"]}>
                                                                                        <Text style={_styleSheet["item-text"]}>{item}</Text>
                                                                                    </View>
                                                                                </TButton>;
                    })}
                                                                </View>;
                })}
                                                </View> : <View style={_styleSheet["classify-content"]}>
                                                        {this.formateData(classify.option).map(row => {
                  return <View style={_styleSheet["item-row"]}>
                                                                        {row.map(item => {
                      return <TButton onClick={this.showPicker.bind(this, item)}>
                                                                                        <View style={_styleSheet["item"]}>
                                                                                            <Text style={_styleSheet["item-text"]}>{item.label}</Text>
                                                                                        </View>
                                                                                    </TButton>;
                    })}
                                                                    </View>;
                })}
                                                    </View>}

                                    </View>;
          })}
                    </View>
                    <View style={_styleSheet["btn-group"]}>
                        <TButton>
                            <View style={_styleSheet["btn"]}>
                                <Text style={_styleSheet["btn-text"]}>清空</Text>
                            </View>
                        </TButton>
                        <TButton>
                            <View style={_styleSheet["btn"]}>
                                <Text style={_styleSheet["btn-text"]}>搜索</Text>
                            </View>
                        </TButton>
                        <TButton>
                            <View style={_styleSheet["btn"]}>
                                <Text style={_styleSheet["btn-text"]}>添加定制</Text>
                            </View>
                        </TButton>
                    </View>
                </Visible>
            </View>;
  }
}, _class.options = {
  addGlobalClass: true
}, _temp2);
export { SearchCondition as default };