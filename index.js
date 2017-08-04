const router = require('express').Router();

// require default rules
const defaultMiddleware = require('./lib/defaultRules');

class Snowpot {
  constructor(customRules = [], mockRoutes = []) {

    // contains the ip table of the instance
    this.ipTable = {};

    // hold middleware generated from custom rules
    this.customRules = router;

    // generate initial middleware
    defaultMiddleware.forEach(rule => {
      this.customRules.use(rule(this.ipTable));
    })

    // router container
    this.router = router;
    // generate mock routes and behavior and make available to client through router object

    // **** instead just take in an array of urls and have the custom rule middleware do a request to those routes when appro.
    mockRoutes.forEach(route => {
      this.router.use('/mock' + route.url, route.action);
    })

    // generate ruleset middleware (1st one creates unique hash if none exist)
    this.customRules.use((req, res, next) => {

    })
  }
  // need to bind these methods into selected routes
  logActivity() {

  }

  rejectRequest() {

  }
}

// tests
const newPot = new Snowpot();
console.log(newPot.customRules);



// // export the honeypot, custom rules define honeypot's reactions
// // mockRoutes construct the routes and desired behavior
// module.exports = (customRules = [], mockRoutes = []) => {
//   // generate a route for each item provided in mockRoutes
//   mockRoutes.map(mockRoute => {
//     router.use(mockRoute.url, mockRoute.action);
//   })

//   return router;
// }
