import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/dataBase'


export const User = sequelize.define<any>(
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
    totalDonations: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isDecimal: true,
      },
    },
    lastDonationAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  },
)
