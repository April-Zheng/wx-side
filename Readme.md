## 微信小程序侧边

参数

| 参数 | 类型 | 说明 | 默认值 |
| -- | -- | -- | -- |
|mask | Boolean | 是否有遮罩 | true |
|fullScreen | Boolean | 是否全屏显示 | false |
|type | String | 左侧/右侧滑入 | left |
|background | String | 背景色 | #fff |
|header | Boolean | 是否显示头部 | true |
|name | String | 头部名称 |  |

事件

| 事件名 | 说明 | 
| -- | -- |
|open | 打开 | 
|close | 关闭 | 

示例

index.json

```
  "usingComponents": {
        "side": "../../../components/side/index"
    }
```

index.wxml
```
<button size="mini" class="btn" type="primary" bindtap="onTap">open</button>
<side id="side" type='left' name="test" bind:close="closeSide">
  <view slot="content">
    <text>test</text>
  </view>
</side>
```

index.js
```
onTap() {
        this.side.openSide();
    },
    closeSide() {},
    onLoad: function() {
        this.side = this.selectComponent("#side");
    },
```