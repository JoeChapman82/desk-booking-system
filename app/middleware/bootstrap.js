const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const addNunjucksFilters = require('../helpers/addNunjucksFilters');
const httpsRedirect = require('./httpsRedirect');
const config = require('../config/main');

module.exports = (app) => {

    app.set('trust proxy', 1);
    app.use(helmet({}));

    if(process.env.NODE_ENV === 'production') {
        app.use(httpsRedirect);
    }

    app.use(favicon(path.join(__dirname, '../assets/images/', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../assets/')));

    app.use(helmet.noCache({'Cache-Control': 'max-age=86400'}));
    app.set('view engine', 'njk');

    let nunjucksEnv = nunjucks.configure(path.join(__dirname, '../views/'), {
        autoescape: true,
        express: app,
        noCache: true,
        watch: true
    });

    addNunjucksFilters(nunjucksEnv);

    app.use(cookieParser(process.env.COOKIE_SECRET || 'oops,forgot the var'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( {extended : false} ));

    app.locals.showParking = process.env.SHOW_PARKING === 'true';
    app.locals.showTraining = process.env.SHOW_TRAINING === 'true';
    app.locals.siteLocation = process.env.SITE_LOCATION;


};
