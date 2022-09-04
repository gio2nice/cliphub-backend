const router = require('express').Router();
const customerRoutes = require('./customer-routes');
const barberRoutes = require('./barber-routes')
const appointmentRoutes = require('./appointment-routes');
//const portfolioRoutes = require('./portfolio-routes')

router.use('/customer', customerRoutes);

router.use('/barber', barberRoutes);

router.use('/appointment', appointmentRoutes);

//router.use('/portfolio', portfolioRoutes);