const sequelize = require('../config/database');
const User = require('./User');
const Crop = require('./Crop');

User.hasMany(Crop, { foreignKey: 'farmerId', onDelete: 'CASCADE' });
Crop.belongsTo(User, { foreignKey: 'farmerId' });

module.exports = { sequelize, User, Crop };
