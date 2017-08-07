const express = require('express');
const Snowpot = require('../../index');
const app = express();

const mockData = {
  users: [
    {
      id: 1,
      username: 'Mr. Test',
      age: 27
    },
    {
      id: 2,
      username: 'Mrs. Test',
      age: 28
    }
  ]
}

const mockRoutes = [
  {
    url: '/users',
    mockDataSet: mockData.users,
    method: 'GET',
    action: function (req, res, next) {
      // *** this if statement is what keeps clients from being able to visit
      // a mock route
      if (!this.blacklist[req.hostname]) return next();
      res.json(this.mockDataSet);
    }
  }
]


const newPot = new Snowpot({}, mockRoutes);

// automatically blacklist the user for test purposes
app.use((req, res, next) => {
  newPot.blacklistUser(req.hostname);
  next();
})

app.use(newPot.customRules);
app.use(newPot.router);

app.get('/', function (req, res) {
  res.send('test')
})

app.use((req, res) => {
  res.status(404);
  res.json({message: 'Not found.'});
})
const port = (process.env.PORT) ? process.env.PORT : 7777;

//do not need to start server when passing into supertest
app.listen(port, () => {
  console.log('Server started on port: ' + port)
});


module.exports = {
  app,
  mockData
};
