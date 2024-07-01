const Book = require("../models/Book")
const Mock = require("mockjs")
const types = ["文学","战争","政治","数学","物理","地理","天文"]
const result = Mock.mock({
    "datas|400-500":[
       {
        BookName:"@cword(2,5)",
        "TypeName|1":types,
        Author:"@cname",
        Remarks:"@cword(5,10)"
       }
    ]
}).datas
Book.bulkCreate(result)