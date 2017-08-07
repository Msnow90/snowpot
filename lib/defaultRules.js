const request = require('request');

const idMaker = (ipTable) => {
  return (req, res, next) => {
    // check to see if ip address has a hash, if not create it
    if (!ipTable[req.hostname]) {
      ipTable[req.hostname] = {
        cookie: (req.headers.cookie) ? req.headers.cookie : undefined
      }
    }
    // if there is not a cookie stored in ip table but the req headers have it, add
    if (!ipTable[req.hostname].cookie && req.headers.cookie) {
      ipTable[req.hostname].cookie = req.headers.cookie;
    }
    next();
  }
}

const checkBlackList = (blacklistTable) => {
  return (req, res, next) => {
    // do stuff
    next();
  }
}


const tamperChecker = (ipTable, blacklistTable) => {
  return (req, res, next) => {
    if (ipTable[req.hostname]) {
      if (ipTable[req.hostname].cookie !== req.headers.cookie) {
        blacklistTable[req.hostname] = {
          sendMockData: true
        }
      }
    }
    next();
  }
}

const routeToMockData = (blacklistTable) => {
  return (req, res, next) => {

    if (blacklistTable[req.hostname]) {

      if (blacklistTable[req.hostname].returnMockData) {
        // *** Only need to modify the url to reach mock routes and still hide from client
        req.url = '/mock' + req.url;
        return next();
      }
    }
    next();
  }
}



module.exports = [
  checkBlackList,
  idMaker,
  tamperChecker,
  routeToMockData
];
