##Keyboard
|属性|说明|类型|默认值|
|---|----|---|:----:|
|prefixCls|外部传入类|string|cefc-keyboard|
|type|键盘类型，有number、stock、letter三个值|string|number|
|showKeyboard|是否显示键盘(必需）|bool|false|
|onPress|点击操作的回调函数（必需）|func|无|
|onDelete|点击删除的回调函数|func|无|
|onHide|隐藏密码键盘后的回调函数|func|无|
|scrollHide|滑动页面则收起键盘|bool|无|
|onScroll|页面滑动回调函数|bool|无|

##使用方法
```js
<Keyboard
   type="stock"
   showKeyboard={this.state.showKeyboard}
   onPress={this.handleKeyPress}
   onDelete={this.handleKeyValueDelete}
   onHide={this.handleHideKeyboard}
   onClear={this.clearValue}
/>
```