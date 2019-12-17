require('dotenv').config();

const express = require('express');
const app = express();
const api = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const errorHandler = require(path.join(__dirname, '/app/middleware/errorHandler'));
const authorisation = require(path.join(__dirname, '/app/middleware/authorisation'));
const roleAuthorisation = require(path.join(__dirname, '/app/middleware/roleAuthorisation'));
const dbBackup = require(path.join(__dirname, '/app/helpers/dbBackup'));
const clearHistoricDbRecords = require(path.join(__dirname, '/app/helpers/clearHistoricDbRecords'));
const createTrainingSessions = require(path.join(__dirname, 'app/helpers/createTrainingSessions'));
const bootstrap = require(path.join(__dirname, '/app/middleware/bootstrap'));
const csrfMiddleware = require(path.join(__dirname, '/app/middleware/csrf'));
const unprotectedRoutes = require(path.join(__dirname, '/app/routes/unprotectedRoutes'));
const apiRoutes = require(path.join(__dirname, '/app/routes/apiRoutes'));
const routes = require(path.join(__dirname, '/app/routes/routes'));
const dbConnect = require(path.join(__dirname, '/app/model/init'));

dbConnect();

bootstrap(app);

app.set('json spaces', 4); // pretty json
app.use('/api', api);
apiRoutes(api);

csrfMiddleware(app);
unprotectedRoutes(app);


app.use(authorisation);
app.all('/admin/*', roleAuthorisation.admin);
app.all('/super/*', roleAuthorisation.super);
routes(app);

app.all('*', (req, res, next) => {
    return res.redirect('/');
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`));

// This system is hosted on heroku. All heroku apps are restarted daily so I
// haven't wrapped these in a setInterval
clearHistoricDbRecords();
createTrainingSessions();
dbBackup();
