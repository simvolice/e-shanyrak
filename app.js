require('dotenv').config();


let express = require('express');
let helmet = require('helmet');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let fsExtra = require('fs-extra');
const dbConnect = require('./utils/ConnectDB');

let bodyParser = require('body-parser');
const AuthService = require('./service/AuthService');
const MenuService = require('./service/MenuService');
let index = require('./routes/index');

let app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "1000mb"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
fsExtra.ensureDirSync(path.join(__dirname, 'public/uploads/'));


app.use('/', index);

app.use(helmet());
app.use(helmet.noCache());


async function initDB() {


    await dbConnect.connect();





}



initDB();

async function initApp() {





    await MenuService.createCappedCollection();



    await AuthService.createUserSuperRoot(process.env.hashAdmin);


}



initApp();






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
