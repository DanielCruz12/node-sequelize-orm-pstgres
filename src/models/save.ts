import { DataTypes } from 'sequelize'
import sequelize from '../database/dataBase'
import { v4 as uuidv4 } from 'uuid'
import { User } from './user'
import { FormResponse } from './formResponse'

export const SavedResponse = sequelize.define(
  'savedResponse',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    formResponseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: FormResponse,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    tableName: 'savedResponses',
    paranoid: false,
    timestamps: true,
  },
)

User.hasMany(SavedResponse, { foreignKey: 'userId' })
SavedResponse.belongsTo(User, { foreignKey: 'userId' })

FormResponse.hasMany(SavedResponse, { foreignKey: 'formResponseId' })
SavedResponse.belongsTo(FormResponse, { foreignKey: 'formResponseId' })
