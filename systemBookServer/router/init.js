const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
// 解析 application/json 格式的请求体
app.use(express.json());
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

app.use("/book", require("./api/book"))

//处理错误
app.use(require("./errMidWare"))
const port = 3000
app.listen(port, () => {
    console.log(`listening prot ${port}`);
})