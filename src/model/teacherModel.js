const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("createUser", {
    
    id: {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        unique : true,
        primaryKey : true
    },

    UserName : {
        type : Sequelize.STRING,
        allowNull : false,

    },

    Password : {
        type : Sequelize.STRING,
        allowNull : false,

    },

}, {
    timestamps : false
});

module.exports = User;