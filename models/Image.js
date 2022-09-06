const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config");

class Image extends Model {}

Image.init({
       i_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       name: {
        type: DataTypes.STRING,
        allowNull: false
       },
       url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
       },
       secure_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
       }
},
{
    sequelize
});

module.exports = Image;