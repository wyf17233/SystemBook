const express = require("express")
const router = express.Router()
const bookServ = require("../../services/bookService")
const { asyncHandler } = require("../sendResultMid")

//添加图书
router.post('/addBook', asyncHandler(async (req, res, next) => {
    const result = await bookServ.addBook(req.body)
    return result
}))

//删除图书
router.delete("/:id", asyncHandler(async (req, res, next) => {
    const result = await bookServ.delBook(req.params.id)
    return `delete book which id is ${req.params.id}`
}))

//查找图书
router.get("/getBooks", asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const keyWords = req.query.keyWords || ""
    const result = await bookServ.getBooks(page, limit, keyWords)
    return result
}))

//修改图书
router.put("/:id", asyncHandler(async (req, res, next) => {
    return await bookServ.updateBook(req.params.id, req.body)
}))
module.exports = router