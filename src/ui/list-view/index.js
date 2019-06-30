import React from 'react';
import { AtLoadMore } from 'taro-ui'
import { Component } from '../../platform';
import { View, TLoading } from '../index'

const statusMap = {
    loadmoreing: 'loading',
    loaded: 'noMore',
};
export default class ListView extends Component {
    static defaultProps = {
        onRequestGetData(i) {
            console.log('trigger default onRequestGetData')
            const nextDataSource = [];
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(nextDataSource);
                }, 1000);
            });
        },

        allowLoadmore: true,
        allowRefresh: true,
        pageSize: 20
    };
    state = {
        dataSource: [],
        status: 'init',
        current: 1,
        nextCurrent: 1,
    };
    componentWillMount() {
        this.getData({ current: 1 });
    };
    //数据源改变时触发
    onDataSourceChange(dataSource) {
        this.props.onDataSourceChange && this.props.onDataSourceChange(dataSource);
    }
    getData({ current, force }) {
        const { onRequestGetData, pageSize } = this.props;
        const { status, dataSource } = this.state;
        switch (true) {
            //如果数据正在加载中或者加载完毕 并且不为强制加载
            case ['loading', 'loaded'].includes(status) && !force:
                return;
            //如果数据加载完毕并且 请求的不是第一页的数据
            case status === "loaded" && current !== 1:
                return;
            default: {
                const nextStatus = current === 1 ? 'loading' : 'loadmoreing';
                this.setState({
                    status: nextStatus,
                    nextCurrent: current
                });
                //小程序调用父组件函数获取不到结果
                onRequestGetData({ current, pageSize })
                //     .then(res => {
                // if (res.length === 0) {
                //     if (current === 1 && dataSource.length) {
                //         this.setState({
                //             current,
                //             dataSource: [],
                //             status: "loaded",
                //         })
                //         this.onDataSourceChange([]);
                //     } else {
                //         this.setState({
                //             current,
                //             status: "loaded"
                //         });
                //     }
                // } else {
                //     let nextDataSource;
                //     if (current === 1) {
                //         nextDataSource = res;
                //     } else {
                //         nextDataSource = dataSource.concat(res);
                //     }
                //     this.setState({
                //         current,
                //         status: res.length < pageSize ? 'loaded' : 'success',
                //         dataSource: nextDataSource
                //     });
                //     this.onDataSourceChange(nextDataSource);
                // }
                //     })
                //     .catch(e => {
                // this.setState({
                //     status: 'error'
                // })
                //     });
            }
        }
    }
    getDataThen = (res) => {
        const { pageSize } = this.props;
        const { nextCurrent: current, dataSource } = this.state;
        if (res.length === 0) {
            if (current === 1 && dataSource.length) {
                this.setState({
                    current,
                    dataSource: [],
                    status: "loaded",
                }, () => {
                    this.onDataSourceChange([]);
                })

            } else {
                this.setState({
                    current,
                    status: "loaded"
                });
            }
        } else {
            let nextDataSource;
            if (current === 1) {
                nextDataSource = res;
            } else {
                nextDataSource = dataSource.concat(res);
            }
            this.setState({
                current,
                status: res.length < pageSize ? 'loaded' : 'success',
                dataSource: nextDataSource
            }, () => {
                this.onDataSourceChange(nextDataSource);
            });

        }
    }
    getDataCatch(e) {
        this.setState({
            status: 'error'
        })
    }
    refresh = () => {
        const { allowRefresh } = this.props;
        allowRefresh && this.getData({ current: 1, force: true });
    };
    loadMore = () => {
        const { allowLoadmore } = this.props;
        allowLoadmore && this.getData({ current: this.state.current + 1, force: true });
    };
    render() {
        const { status } = this.state;
        return (
            <View className="list-view-box">
                {this.props.children}
                {
                    ['loadmoreing', 'loaded'].includes(status) && <AtLoadMore
                        status={statusMap[status]}
                    />
                }
            </View>
        );
    }
}
