import { DataTypes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import sequelize from '../database/dataBase'
import { Form } from './form'
import { User } from './user'

export const FormResponse = sequelize.define(
  'formResponse',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    formId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: Form, key: 'id' },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    responseData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    form_fields_data: {
      /* Lo que el usuario digite para generar el texto */
      type: DataTypes.JSONB,
      allowNull: false,
    },
    share_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { paranoid: true, freezeTableName: true, tableName: 'formResponse' },
)

User.hasMany(FormResponse, {
  foreignKey: 'userId',
  as: 'formResponse',
})

FormResponse.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})
