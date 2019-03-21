# axios-tool

一个基于`axios`和业务的ajax请求封装，不限项目使用的框架，只需全局安装即可使用。

## 使用

```shell
  npm i axios-tool -g
```

or

```shell
  yarn global add axios-tool
```

then

```shell
  axios-tool
```

## 选项

**-o, --output**: 最终的文件的输出路径。默认是当前路径，如果指定的路径下有名为`ajax`的目录，则不会覆盖。

## 输出的目录结构

```
└── ajax
   ├── index.js
   └── interceptors
       ├── index.js
       ├── request
       │   └── index.js
       └── response
           └── index.js
```

- `ajax/index.js`对外导出一个被初始化的`axios`对象，文件中有一些初始的配置，生成目录之后使用者可以任意更改
- `interceptors`目录下是`axios`的拦截器，包括请求拦截和响应拦截，具体参考[链接](https://github.com/axios/axios#interceptors)。
- 在`interceptors/request`或`interceptors/response`目录下各有一个`index.js`文件，使用者在添加了拦截器之后，应该也在对应的`index.js`内引入，因为在`ajax/interceptors/index.js`中会对所有的拦截器做处理。根据源码会发现，request拦截器越**先**添加的越**晚**执行，response拦截器越**先**添加的越**先**执行，因此在`interceptors/request`或`interceptors/response`下的`index.js`中添加拦截器时应需注意执行的时机。
- 本插件的使用者在添加拦截器时，应遵循如下格式，例如，添加一个请求拦截：

  ```js
    import store from './../../../store'

    export default {
      onFulfilled: config => {
        config.data.deviceType = 3

        // 处理某些不是在当前项目下的接口
        if (!config.url.match(/^\/prefix/)) {
          config.url = `/prefix/redirect${config.url}`
        }

        config.headers['sessionKey'] = store.getters['getSessionKey']

        return config
      },
      onRejected: reject => {
        return reject
      }
    }
  ```

  即，对外导出的是一个对象，包括两个字段`onFulfilled`和`onRejected`。两者均是函数，且前者接受一个`config`参数，内容为请求的配置；后者接受一个`reject`参数，内容为请求的拒绝信息。在响应拦截中应使用同样的格式对外导出对象。
