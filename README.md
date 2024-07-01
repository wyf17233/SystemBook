node版本：18.16.0

### 前端：

pnpm create vite 名字（*创建vite项目*）

使用element-plus框架，进行页面创建

pnpm install element-plus

### 后端：

pnpm init （*nodejs服务初始化*）

pnpm install express(*安装express框架 响应客户机请求*)

```js
//express基础操作监听该端口号
const express = require("express")
const app = express()
const port = 3000
app.listen(port, () => {
    console.log(`listening prot ${port}`);
})
```

```js
// 解析 application/json 格式的请求体
app.use(express.json());
```

pnpm install mysql2 (*进行与数据库的连接*)

pnpm install sequelize (*进行对数据库的操作*)

pnpm install nodemon(*项目内容更改时可自动刷新*)

pnpm install cors(*解决跨域问题*)

数据层：models(*获取or创建数据库中的表格*)

路由层：router(*监听路由进行不同的操作*)

服务层：service(*对数据的具体操作*)
