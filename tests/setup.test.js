const Snowpot = require('../index');
const expect = require('chai').expect;
const request = require('request');

describe('The Snowpot class...', () => {
  const newPot = new Snowpot();

  it('can load the initial Snowpot class...', () => {

    expect(newPot).to.be.instanceOf(Snowpot);
  })

  it('has it\'s instance methods...', () => {
    expect(newPot.blacklistUser).to.be.a('function');
  })

  it('can produce mock routes...', () => {
    const mockRoute = {
      url: '/test',
      action: (req, res, next) => {
        res.send('Never!');
      },
      method: 'GET'
    }
    const newPotWithRoutes = new Snowpot([], [mockRoute]);
    expect(newPotWithRoutes.router.stack).to.be.an('array').to.have.length.greaterThan(2);
  })
})
