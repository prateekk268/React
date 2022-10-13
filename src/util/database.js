const Sequelize = require("sequelize")

const sequelize = new Sequelize("tailwebsdb", "root", "Kumar@123", {
    dialect : "mysql",
    host : "localhost"
});

module.exports = sequelize;