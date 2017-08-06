const idMaker = (ipTable) => {
  return (req, res, next) => {
    // *** use this initially until a cookie can be defined
    next();
    // check to see if ip address has a hash, if not create it
    if (!ipTable[req.host]) {
      ipTable[req.host] = {
        cookie: (req.headers.cookie) ? req.headers.cookie : ''
      }
    }
    // if there is not a cookie stored in ip table but the req headers have it, add
    if (!ipTable[req.host].cookie && req.headers.cookie) {
      ipTable[req.host].cookie = req.headers.cookie;
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
    // *** use this initially until a cookie can be defined
    next();
    if (ipTable[req.host]) {
      if (ipTable[req.host].cookie !== req.headers.cookie) {
        blacklistTable[req.host] = {
          restrictedUntil: 'permanent'
        }
      }
    }
    //next();
  }
}



module.exports = [
  checkBlackList,
  idMaker,
  tamperChecker
];
