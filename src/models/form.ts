import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import sequelize from '../database/dataBase'
import { User } from './user'

export const Form = sequelize.define(
  'form',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      references: { model: User, key: 'id' },
      allowNull: false,
    },
    isRecommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    icon: {
      type: DataTypes.STRING(255),
    },
    category: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    aiPrompt: {
      type: DataTypes.STRING(255),
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    tableName: 'forms', // Nombre de la tabla
  },
)

User.hasMany(Form, {
  foreignKey: 'userId',
  as: 'forms',
})

Form.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})
