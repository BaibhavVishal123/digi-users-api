var express = require('express');
var routes = express.Router();

const userService = require('../service/user');

// routes.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

routes.get('/login', function (req, res, next) {
  // TODO: render a basic login form with button post (/login)
  res.render('index', { title: 'Express' });
});

routes.get('/registration', function (req, res, next) {
  // TODO: render a basic reg form with button post (/registration)
  res.render('index', { title: 'Express' });
});

routes.post('/registration', async function (req, res, next) {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  //TODO: email validator
  const payload = { "userName": userName, "password": password, "email": email };
  const response = await userService.provision(payload);
  // response contains encrypted KEK  
  
  // use some form of these 2 to send multiple values, but cookie should be limited to a single Key:Value pair
  // res.cookie('Cookie', JSON.stringify({ "name": 12345, "password": response.password }),
  //   { maxAge: 900000, httpOnly: true }).send(response);
  // res.cookie('Cookie',`foo='bar'&baz=${response.password}`, { maxAge: 900000, httpOnly: true }).
  //   send(response);

  // http true false to set in browser
  res.cookie('Cookie', `${response.password}`, { maxAge: 900000, httpOnly: false }).
    cookie('Name', userName, { maxAge: 900000, httpOnly: false }).
    send(response);
  // render a button to get users
});

routes.post('/login', async function (req, res, next) {
  console.log(req.body);
  const userName = req.body.userName;
  const password = req.body.password;
  const payload = { "userName": userName, "password": password };

  const response = await userService.login(payload);
  if (response.success) {
    // maxage = min* sec* millisec
    res.cookie('Cookie', `${response.password}`, { maxAge: (15 * 60 * 1000), httpOnly: true }).
      cookie('Name', userName, { maxAge: (15 * 60 * 1000), httpOnly: true }).
      send(response); 
    // render a button to get users
  } else {
    res.status(403).send("Forbidden");
  }
});

routes.get('/users', async function (req, res, next) {
  // Cookie is the cookie name set earlier
  const cookiePassword = req.cookies.Cookie;
  if (cookiePassword === undefined) {
    res.status(403).send("Forbidden");
    return;
  }
  const name = req.cookies.Name;
  if (name === undefined) {
    res.status(403).send("Forbidden");
    return;
  }
  // Cookie expired?
  
  console.log("ccc", cookiePassword.toString());
  const response = await userService.listUsers(name, cookiePassword);

  res.send(response);
});

module.exports = routes;
