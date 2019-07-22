// components/side/index.js
var touchDot = 0; //触摸时的原点
var time = 0; //  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ''; // 记录/清理 时间记录
var nth = 0; // 设置活动菜单的index
var nthMax = 5; //活动菜单的最大个数
var tmpFlag = true; // 判断左右华东超出菜单最大值时不再执行滑动事件
Component({
    properties: {
        //是否有遮罩
        mask: {
            type: Boolean,
            value: true
        },
        //是否全屏
        fullScreen: {
            type: Boolean,
            value: false,
        },
        //类型 左侧 右侧
        type: {
            type: String,
            value: 'left'
        },
        //背景色
        background: {
            type: String,
            value: '#fff'
        },
        //是否显示头部
        header: {
            type: Boolean,
            value: true
        },
        name: {
            type: String,
            value: ''
        }
    },

    data: {
        maskDisplay: 'none', //遮罩层隐藏
        //侧边菜单的一些属性
        sideHeight: 0,
        sideRight: 0,
        sideLeft: 0,
        sideWidth: 0,
        sideAnimation: {}, //动画

    },
    options: {
        multipleSlots: true //使其可以使用多个slot，用name区分
    },
    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            this.init()
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        }
    },
    pageLifetimes: {
        show() {}
    },
    methods: {
        //初始化
        init() {
            let that = this;
            let type = that.data.type;
            let rate = that.data.fullScreen ? 1 : 0.7
            wx.getSystemInfo({
                success: function(res) {
                    that.setData({
                        sideHeight: res.windowHeight + 'px',
                        sideWidth: res.windowWidth * rate + 'px'
                    });
                    switch (type) {
                        case 'left':
                            that.setData({
                                sideRight: res.windowWidth + 'px'
                            })
                            break;
                        case 'right':
                            that.setData({
                                sideLeft: res.windowWidth + 'px'
                            })
                    }
                }
            });
        },
        //侧栏展开
        sideUp() {
            this.setData({
                maskDisplay: 'block',
            });
            var animation = wx.createAnimation({
                duration: 600,
                timingFunction: 'linear'
            });

            let type = this.data.type;
            switch (type) {
                case 'left':
                    animation.translateX('100%').step();
                    this.setData({
                        sideAnimation: animation.export()
                    });
                    break;
                case 'right':
                    animation.translateX('-100%').step();
                    this.setData({
                        sideAnimation: animation.export()
                    });
            }


        },
        //侧栏关闭
        sideDown() {
            this.setData({
                maskDisplay: 'none',
            });
            var animation = wx.createAnimation({
                duration: 800,
                timingFunction: 'linear'
            });
            let type = this.data.type;
            switch (type) {
                case 'left':
                    animation.translateX('-100%').step();
                    this.setData({
                        sideAnimation: animation.export()
                    });
                    break;
                case 'right':
                    animation.translateX('100%').step();
                    this.setData({
                        sideAnimation: animation.export()
                    });
            }

        },
        //展开
        openSide: function() {
            this.sideUp();
            this.triggerEvent('open');
        },

        //点击遮罩 收起
        colseSide: function() {
            this.sideDown();
            this.triggerEvent('close');
        },
        preventTouchMove() {},

        // 触摸开始事件
        touchStart: function(e) {
            touchDot = e.touches[0].pageX; // 获取触摸时的原点
            // 使用js计时器记录时间
            interval = setInterval(function() {
                time++;
            }, 100);
        },
        // 触摸移动事件
        touchMove: function(e) {
            var touchMove = e.touches[0].pageX;
            let type = this.data.type;
            switch (type) {
                case 'left':
                    // 向左滑动
                    if (touchMove - touchDot <= -40 && time < 10) { this.colseSide(); }
                    break;
                case 'right':
                    // 向右滑动
                    if (touchMove - touchDot >= 40 && time < 10) {
                        this.colseSide();
                    }
            }
            // touchDot = touchMove; //每移动一次把上一次的点作为原点（好像没啥用）
        },
        // 触摸结束事件
        touchEnd: function(e) {
            clearInterval(interval); // 清除setInterval
            time = 0;
            tmpFlag = true; // 回复滑动事件
        }
    }
});