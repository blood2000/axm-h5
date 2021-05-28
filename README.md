# 项目须知

## 开发步骤

### 初始化项目

```
npm install --registry=https://registry.npm.taobao.org
```

### 运行项目

```
npm run serve
```

### 编译项目

```
npm run build
```


## 错误处理

### xBuilder 提示找不到 mainfest.json

```
右键项目进行重新识别项目类型
```

### xbuilder 运行不了

优先设置一下vue为全局组件
```
npm install -g @vue/cli
```

### uni-request in ./src/config/request.js

```
npm install --registry=https://registry.npm.taobao.org --save uni-request@1.0.2
```

### Failed to resolve loader: sass-loader

```
npm uninstall --save sass-loader
npm i --registry=https://registry.npm.taobao.org -D sass-loader@8.x
npm uninstall --save node-sass
npm i --registry=https://registry.npm.taobao.org node-sass@4.14.1
```

----

## App端交互

进入相关界面时要进行判断访问的客户端类型，根据不同类型进行调用不同的方法去获取相关数据

### 统一方法

#### 1) getLoginUserInfo (获取APP端登录用户信息)

返回值

```json
{
  "Produce-Code": "776ca8e240574192b6e0f69b417163df",
  "App-Code":"80bb50e40895928e2dc0d101350a25d0",
  "App-Version": "2.0",
  "App-Type": "2",
  "Terminal-Type": "app",
  "Authorization": "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx",
  "role-type": "1" /*  1调度者 2司机 */
}
```


### IOS端

**html代码**

参考 https://www.jianshu.com/p/f2767fa9e582

```html
<script type="text/javascript">
    //这是必须要写的，用来初始化一些设置
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    //这也是固定的， OC 调JS ， 需要给OC调用的函数必须写在这个函数里面
    setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler('testJSFunction', function(data, responseCallback) {
            alert('JS方法被调用:'+data);
            responseCallback('js执行过了');
        })
    })
    //这个 getLoginUserInfo 就是 原生那边 注入的函数 ， 通过这个方法来调用原生 和传值
    //parmas 是JS 给OC的数据 ， response 是 OC函数被调用之后 再 告诉JS 我被调用了
    //比如微信分享，给Dic给原生 ， 原生分享成功后再把结果回调给JS 进行处理
    function getLoginUserInfo(){
        var params = {};
        WebViewJavascriptBridge.callHandler('getLoginUserInfo',params,function(response) {
            console.log(response);
        });
    }
</script>
```

### 安卓端

参考 https://developer.android.google.cn/guide/webapps/webview?hl=zh_cn#BindingJavaScript

```html
<script type="text/javascript">
    function getLoginUserInfo() {
        var params = {};
        Android.getLoginUserInfo(params);
    }
</script>
```
