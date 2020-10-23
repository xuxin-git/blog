# myApp-ui
react集成webpack4、antd、dva、react-loadable

## 文件目录
<pre><code>
├── node_modules:                   模块文件夹
|   └── ...             
├── dist:                           打包生成目录
├── assets:                         静态文件
├── src:                            开发目录
|   ├── app:                        页面核心部分
|   |   ├── components:             页面共用组件
|   |   ├── config:                 配置文件
|   |   ├── layout:                 页面
|   ├── routes:                     页面路由
|   |   ├── menu.js                 菜单文件
|   |   ├── route.js:               路由文件
|   |   ├── sidebar.js:             侧边栏文件
|   ├── models:                     dav的通用model
|   |   ├── index.js:               导出所有的通用model
|   |   ├── login.js:               登录model
|   |   ├── sys.js:                 系统model（错误处理等等）
|   ├── plugins:                    项目布局和项目共用组件
|   |   ├── container:              全局路由
|   |   ├── footer:                 页脚
|   |   ├── header:                 页头
|   |   ├── login:                  登录页面
|   |   ├── navigationBar:          面包屑
|   |   ├── noticeIcon:             头部信息按钮
|   |   ├── TabController:          页面页签
|   ├── redux:                      使用dva模式使用redux
|   |   ├── dva.js:                 dva核心代码
|   |   ├── dynamic.js:             按需加载页面model
|   ├── utils:                      工具文件包
|   |   ├── api.js:                 全局接口文件
|   |   ├── asyncComponent.js:      页面按需加载(react-loadable)
|   |   ├── AxiosUtil.js:           axios封装和拦截
|   |   ├── Loading.js:             按需加载loading(处理了model的按需加载)
|   |   ├── util.js:                工具包文件
|   └── index.js:                   入口文件
├── index.ejs                       模板文件
├── .babelrc                        babel配置文件
├── .eslintrc.json                  eslint
├── .gitignore                      git忽略文件
├── favicon.ico                     页面title小图标
├── package.json                    项目依赖 npm
├── README.MD                       项目信息
├── postcss.config.js               postcss配置文件
└── webpack.config.js               webpack配置文件
</code></pre>

## 脚手架优化
#### 一.webpack优化
1. 使用webpack4、babel7提高编译速度
2. 使用 happypack 插件实现多线程执行任务
3. 增加 dll 加快打包速度
4. css按需加载（压缩css）
5. 优化压缩js速度
6. 按需加载lodash
7. 可以使用BundleAnalyzerPlugin分析工具，分析项目可优化点
8. webpack.config.js热更新，检测文件改动并自动重启项目
#### 二.项目优化
1. 按需加载(使用react-loadable实现)
2. 集成antd并使用babel-plugin-import实现按需加载
3. 使用dva模式管理数据，并支持按需加载页面对应的model

## 启动方法
<ul>
<li>npm i ----------------------- 安装依赖</li>
<li>npm start  ------------------ 启动项目</li>
<li>npm run build-win ------- win打包项目 </li>
<li>npm run build-mac ------- mac打包项目 </li>
</ul>

