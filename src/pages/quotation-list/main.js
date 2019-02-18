import Taro, { Component, Config } from '@tarojs/taro'
import { Canvas, Button } from '@tarojs/components'
import './main.scss'
import Time from './component/time.js'

class Index extends Component {

    config = {
        navigationBarTitleText: '闹钟'
    }

    state = {
        width: 0,
        height: 0,
    }

    // 绘制表盘
    getDialClock = () => {
        const width = this.state.width;
        const height = this.state.height;
        const ctx = Taro.createCanvasContext('myCanvas', this.$scope);
        const R = width / 2 - 30;//圆半径
        const r = R - 15;

        //设置坐标轴原点
        ctx.translate(width / 2, height / 2);
        ctx.save();

        // 圆心
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();

        // 表盘外圆
        ctx.setLineWidth(2);
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();

        // 表盘刻度（大格）
        ctx.beginPath();
        ctx.setLineWidth(5);
        for (var i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(R, 0);
            ctx.lineTo(r, 0);
            ctx.stroke();
        }
        ctx.closePath();

        // 表盘刻度（小格）
        ctx.beginPath();
        ctx.setLineWidth(1);
        for (var i = 0; i < 60; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 30);
            ctx.moveTo(R, 0);
            ctx.lineTo(R - 10, 0);
            ctx.stroke();
        }
        ctx.closePath();

        // 表盘时刻（数字）
        ctx.beginPath();
        ctx.setFontSize(16)//设置字体样式
        // ctx.setTextBaseline("middle");//字体上下居中，绘制时间
        for (let i = 1; i < 13; i++) {
            //利用三角函数计算字体坐标表达式
            var x = (r - 10) * Math.cos(i * Math.PI / 6 - Math.PI / 2);
            var y = (r - 10) * Math.sin(i * Math.PI / 6 - Math.PI / 2);
            let sz = i + '';
            ctx.fillText(sz, x - 5, y + 5, 15);
        }
        ctx.closePath();


        // 开始绘制
        ctx.draw();
    }

    componentWillMount() {
        const that = this;
        Taro.getSystemInfo({
            success: function (res) {
                that.setState({
                    width: res.windowWidth,
                    height: res.windowHeight
                })
            }
        })
    }

    componentDidMount() {
        this.getDialClock();
    }
    save = () => {
        const { width, heght } = this.state;;
        Taro.canvasToTempFilePath({
            // width: 170, //canvas原本的大小
            // heght: 170,
            width, heght,
            destWidth: 680,  //生成图片的大小设置成canvas大小的四倍
            destHeight: 680,
            canvasId: 'myCanvas',
            fileType: 'png',
            quality: 1,//图片质量
            success: (res) => {
                console.log(res);
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                });
            },
            fail: function (res) {
                console.log(res);
            },

        }, this.$scope)

    }

    render() {
        return (
            <div>
                {/* 表盘绘制 */}
                <Canvas canvasId="myCanvas" className="canvas" />
                <Button onClick={this.save} className="a">保存</Button>
            </div>

        )
    }
}

export default Index;