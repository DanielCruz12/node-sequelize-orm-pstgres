import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import sequelize from '../database/dataBase'
import { User } from './user'

export const Form = sequelize.define(
  'Form',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: User, key: 'id' },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    aiPrompt: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'Form',
  },
)

User.hasMany(Form, {
  foreignKey: 'userId',
  as: 'forms',
});

Form.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});