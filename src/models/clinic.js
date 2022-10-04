'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    clinic.init({ // khai báo các model 
        // id: DataTypes.INTEGER,
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        name: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'clinic',
    });
    return clinic;
};