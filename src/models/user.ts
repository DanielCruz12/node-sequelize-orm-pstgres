import { DataTypes } from 'sequelize'
import sequelize from '../database/dataBase'

export const User = sequelize.define(
  'users',
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null',
        },
        notEmpty: {
          msg: 'email cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email id',
        },
      },
    },
    userType: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  },
)
