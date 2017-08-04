const idMaker = (ipTable) => {
  return (req, res, next) => {
    // check to see if ip address has a hash, if not create it
    if (ipTable[req.host]) {
      ipTable[req.host] = {
        cookie: (req.headers.cookie) ? req.headers.cookie : ''
      }
    }
    // if there is not a cookie stored in ip table but the req headers have it, add
    if (!ipTable[req.host].cookie && req.headers.cookie) {
      ipTable[req.host].cookie = req.headers.cookie;
    }
  }
}



const tamperChecker = (ipTable) => {
  return (req, res, next) => {
    if (ipTable[req.host].cookie !== req.headers.cookie) {
      //blackList(ipTable[req.host]);
    }
  }
}



module.exports = [
  idMaker,
  tamperChecker
];
