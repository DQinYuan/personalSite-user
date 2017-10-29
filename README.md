# personalsite-user

> personalsite's user end

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

个人网站的前端（普通用户访问的部分）

测试与生产环节需要改动的地方：
1.src/components/popup/App.vue中的验证码图片请求路径（src）；
   测试环境为："http://localhost:9090/authImg.jpg"
   生产环境为："/authImg.jpg"

2.src/axios.js中的axios.defaults.baseURL
   测试环境为:"axios.defaults.baseURL = 'http://localhost:9090';"
   生产环境则将这句话注掉
