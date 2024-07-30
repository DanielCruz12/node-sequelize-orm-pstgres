import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../database/dataBase';
import { Form } from './form';

export const FormField = sequelize.define(
  'formField',  // Nombre del modelo
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    formId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'forms',  // Asegúrate de que este nombre coincide con el nombre de la tabla
        key: 'id',
      },
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fieldType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    placeholder: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    tableName: 'formFields',  // Nombre de la tabla
  }
);

Form.hasMany(FormField, {
  foreignKey: 'formId',
  as: 'fields',
});

FormField.belongsTo(Form, {
  foreignKey: 'formId',
  as: 'form',
});
