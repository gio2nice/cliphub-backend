const Customer = require('./customer-model');
const Appointment = require('./appointment-model');
const Service = require('./service-model');
const Barber = require('./barber-model');

// Associations
Barber.hasMany(Service, {
    foreignKey: 'barber_id'
});

Service.belongsTo(Barber, {
    foreignKey: 'barber_id'
});

Customer.hasOne(Appointment, {
    foreignKey: 'customer_id'
});

Appointment.belongsTo(Customer, {
    foreignKey: 'customer_id'
})

Service.hasMany(Appointment, {
    foreignKey: 'service_id'
});

Appointment.belongsTo(Service, {
    foreignKey: 'service_id'
});


module.exports = {
    Customer,
    Appointment,
    Service,
    Barber
};