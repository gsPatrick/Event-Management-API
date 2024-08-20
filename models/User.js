const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  // O campo 'name' não pode ser nulo
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,  // O campo 'email' não pode ser nulo
    },
    acessLevel: {
        type: DataTypes.ENUM('creator', 'participant'),
        allowNull: false,  // O campo 'acessLevel' não pode ser nulo
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,  // O campo 'password' não pode ser nulo
    }
});

module.exports = User;
