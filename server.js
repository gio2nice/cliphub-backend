// const express = require("express");
// const session = require("express-session");
// const cors = require("cors");
// const { sequelize } = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const app = express();
// const port = process.env.PORT || 3001;

// require('dotenv').config();

// const sess = {
//     secret: process.env.SESS_SECRET,
//     cookie: {sameSite: true},
//     resave: false,
//     saveUnitialized: false,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };
// // app.set('trust proxy', 1)
// app.use(session(sess));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cors({credentials: true}));

// app.use('/api', require("./routes"));

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
//     sequelize.sync({ force: false });
// }) 
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}!! `));
});