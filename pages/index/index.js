//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onTap() {
        this.side.openSide();
    },
    closeSide() {},
    onLoad: function() {
        this.side = this.selectComponent("#side");
    },

})