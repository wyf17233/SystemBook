const Book = require("../models/Book")
const { Op } = require("sequelize")

//添加
exports.addBook = async (obj) => {
    const ins = await Book.create(obj)
    return ins.toJSON()
}

//删除
exports.delBook = async (id) => {
    return await Book.destroy({
        where: {
            id
        }
    })
}

//查找（模糊查询）
/**
 * 
 * @param {*} offset 跳过多少条数据
 * @param {*} limit 一次获取多少数据
 * @param {*} keyWords 模糊查询关键词
 * @returns 
 */
exports.getBooks = async (page, limit, keyWords) => {
    const result = await Book.findAndCountAll({
        attributes: ["id", "BookName", "Author", "TypeName", "Remarks"],
        where: {
            [Op.or]:
                [
                    {
                        BookName: {
                            [Op.like]: `%${keyWords}%`
                        }
                    },
                    {
                        Author: {
                            [Op.like]: `%${keyWords}%`
                        }
                    }

                ]
        },
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}

//修改
exports.updateBook = async (id, obj) => {
    return await Book.update(obj, {
        where: {
            id
        }
    })
}