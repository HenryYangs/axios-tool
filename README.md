# axios-tool

A command line tool based on `axios` and framework free.

## Usage

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

## Options

**-o, --ouput**: The output path. Default value is current path. It will not override the existing `ajax` directory.

## Structure of output

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

- `ajax/index.js` will export an instance of `axios`. There are some initial configuration, you can modify it.
- Interceptors of `axios` are placed in `interceptors` directory, including request and response interceptors. [ref](https://github.com/axios/axios#interceptors).
- There is an `index.js` file under `interceptors/request` and `interceptors/response`, respectively. If you add a new interceptor, please remember add it in corresponding `index.js` file. According to the source code of `axios`, It follows **FILE** (First In Last Execute) rule on request interceptors, and follows **FIFE** (First In Last Execute) rule on response interceptors. Therefore, you may pay more attension on the order of different type of interceptors.
- Also, the success callback function should be the value of `onFulfilled`, and failure callback function should be the value of `onRejected`.

```javascript
  export default {
    onFulfilled: config => {
      // success logic
    },
    onRejected: reject => {
      // failure logic
    }
  }
```