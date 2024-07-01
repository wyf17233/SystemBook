const { updateBook } = require("../services/bookService")

//获取结果
exports.getResult = (result) => {
    return {
        code: 0,
        msg: "",
        data: result
    }
}
//错误信息
exports.getErr = (errMsg = "server error",errCode = 500) => {
    return {
        code: errCode,
        msg: errMsg,
    }
}
//综合处理
exports.asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next)
            res.send(exports.getResult(result))
        } catch (err) {
            next(err)
        }
    }
}