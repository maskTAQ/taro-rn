

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, Text } from '../../components'

import './main.scss';


const columns = [
    {
        key: 'sort',
        title: '序号'
    },
    {
        key: 'ysj',
        title: '颜色级'
    },
    {
        key: 'cdz',
        title: '长度值'
    },
    {
        key: 'mz',
        title: '马值'
    },
    {
        key: 'ql',
        title: '强力'
    },
    {
        key: 'zqd',
        title: '整齐度'
    },
];

const data = [
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' },
    { ysj: '12', cdz: '12+', mz: '12-', ql: '123', zqd: '23' }
];

const formateData = (data, index) => {
    const result = [index + 1];
    columns.forEach(column => {
        if (column.key !== 'sort') {
            result.push(
                data[column.key]
            )
        }
    });
    return result;
}
export default class PackageDetail extends Component {
    render() {
        return (
            <View className='container'>
                <ScrollView>
                    <View className="header">
                        {
                            columns.map(item => {
                                const { key, title } = item;
                                return (
                                    <View className="header-item">
                                        <Text className="header-item-text">
                                            {title}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className="body">
                        {
                            data.map((row, index) => {
                                return (
                                    <View className="body-row">
                                        {
                                            formateData(row, index).map(column => {
                                                return (
                                                    <View className="body-row-item">
                                                        <Text className="body-row-item">
                                                            {column}
                                                        </Text>
                                                    </View>
                                                )
                                            })
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

