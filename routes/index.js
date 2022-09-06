const router = require('express').Router();
const customerRoutes = require('./api/customer-routes');
const barberRoutes = require('./routes/api/barber-routes.js')
const appointmentRoutes = require('./api/appointment-routes');
const imageRoutes = require('./routes/api/image');
//const portfolioRoutes = require('./portfolio-routes')

router.use('/customer', customerRoutes);

router.use('/barber', barberRoutes);

router.use('/appointment', appointmentRoutes);

router.use("/images", imageRoutes);

module.exports = router;

//router.use('/portfolio', portfolioRoutes);