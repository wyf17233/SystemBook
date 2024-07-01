const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("zx_rise_booksystem", "root", "wyf13962902734", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});
module.exports = sequelize