const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Crop = sequelize.define('Crop', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cropType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variety: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plantingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expectedHarvest: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('planted', 'growing', 'ready', 'harvested'),
    defaultValue: 'planted',
  },
  healthScore: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// Associations
User.hasMany(Crop, { foreignKey: 'farmerId', onDelete: 'CASCADE' });
Crop.belongsTo(User, { foreignKey: 'farmerId' });

module.exports = Crop;
