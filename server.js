// set up enviroment variables
require('dotenv').config();

// import required packages
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

// import routes for controllers
const routes = require('./controllers');

// set up sequelize and session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import helper functions
const helpers = require('./utils/helpers');

// create express app
const app = express();

// assign port to server
const PORT = process.env.PORT || 3001;

// create an isolated handlebars environment
const hbs = exphbs.create({ helpers });

// register the handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// create session options object
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60,
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
}

// set up middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set up router
app.use(routes);

// sync database and start listening
const main = async () => {
	await sequelize.sync({ force: false });

	app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
};

main();