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


