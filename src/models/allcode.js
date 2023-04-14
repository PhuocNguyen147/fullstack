'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            // quan hệ một nhiều
        }
    };
    Allcode.init({ // khai báo các model 
        // id: DataTypes.INTEGER,
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};