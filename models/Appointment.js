const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize }= require('../config/connection');

class Appointment extends Model { }

Appointment.init(
    {
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        // service_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Service',
        //         key: 'id',
        //     },
        //     // autoIncrement: true
        // },
        // customer_id: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Customer',
        //         key: 'id',
        //         unique: false
        //     }
        // },
        // barber_id: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Barber',
        //         key: 'id',
        //         unique: false
        //     }
        // },
        appointment_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          appointment_date_end: {
            type: DataTypes.DATE
            // allowNull: false,
          },
          appointment_time: {
              type: DataTypes.TIME,
              allowNull: false,
          },
          appointment_time_end: {
            type: DataTypes.TIME
            // allowNull: false,
        },

    },
    {
        sequelize,
        // timestamps: false,
        // freezeTableName: true,
        // underscored: true,
        // modelName: 'appointment'
    }
);

module.exports = Appointment;