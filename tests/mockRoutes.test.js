const { expect } = require('chai');
const app = require('./environment/server').app;
const mockData = require('./environment/server').mockData;
const request = require('supertest');

const agent = request.agent(app);

//const supertest = require('supertest').agent(app);

describe('If an instance of Snowpot is used on a server...', () => {

  // mock route and data is constructed in environment/server which is app
  it('will be unable to reach mock routes directly...', () => {
    const url = '/mock/users';
    return agent.get(url)
      .expect(404)
      .expect(res => {
        expect(res.body.message).to.be.deep.equal('Not found.')
      })
  })

  it('sends mock data is a user is blacklisted', () => {
    return agent.get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.deep.equal(mockData.users);
      })
  })
})

