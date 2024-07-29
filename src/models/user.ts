import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import sequelize from '../database/dataBase'

export const User = sequelize.define(
  'users',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
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
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  },
)
