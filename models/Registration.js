const {DataType, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Event = require('./Event');

const Registration = sequelize.define('Registration', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
  },
});

User.belongsToMany(Event, { through: Registration });
Event.belongsToMany(User, { through: Registration });

module.exports = Registration;
