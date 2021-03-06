const router = require('express').Router();
const router2 = require('express').Router();

// require default rules
const defaultMiddleware = require('./lib/defaultRules');

function Snowpot(customRules = [], mockRoutes = []) {

  // contains the ip table of the instance
  this.ipTable = {};
  this.blacklist = {};

  // hold middleware generated from custom rules
  this.customRules = router;

  // generate initial middleware
  this.customRules.use('/', (req, res, next) => {
    const newRoute = defaultMiddleware[0](this.blacklist);
    newRoute.call(this, req, res, next);
  })

  this.customRules.use('/', (req, res, next) => {
    const newRoute = defaultMiddleware[1](this.ipTable);
    newRoute.call(this, req, res, next);
  })

  this.customRules.use('/', (req, res, next) => {
    const newRoute = defaultMiddleware[2](this.ipTable, this.blacklist);
    newRoute.call(this, req, res, next);
  })

    this.customRules.use('/', (req, res, next) => {
    const newRoute = defaultMiddleware[3](this.blacklist);
    newRoute.call(this, req, res, next);
  })

  // router container
  this.router = router2;
  // generate mock routes and behavior and make available to client through router object
  mockRoutes.forEach(route => {
    this.router[route.method.toLowerCase()]('/mock' + route.url, (req, res, next) => {
      this.mockDataSet = route.mockDataSet;
      route.action.call(this, req, res, next);
    });
  })
}

Snowpot.prototype.blacklistUser = function (ip) {
  this.blacklist[ip] = {
    returnMockData: true
  }
}

module.exports = Snowpot;
