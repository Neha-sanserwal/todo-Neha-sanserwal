const sinon = require('sinon');
const { assert } = require('chai');
const { Session } = require('../libs/session');

describe('Session', function() {
  describe('createSession', function() {
    before(() => {
      sinon.stub(Math, 'random').returns(4);
      sinon.useFakeTimers(new Date('1/1/1997').getTime());
    });
    it('should create new session for given user', function() {
      const expected = new Session(852076840000, 'john');
      assert.deepStrictEqual(Session.createSession('john'), expected);
    });
  });
  describe('isEqualTo', function() {
    it('should give true if the object value are equal to the session values', function() {
      const actual = new Session(1, 'john');
      assert.ok(actual.isEqualTo('1'));
    });
    it('should give false if the object value are not equal to the session values', function() {
      const actual = new Session(1, 'john');
      assert.notOk(actual.isEqualTo('2'));
    });
  });
  describe('currentSessionId', function() {
    it('should give the sessionId and sessionUser ', function() {
      const actual = new Session(1, 'john');
      assert.deepStrictEqual(actual.currentSessionId, 1);
    });
  });
});
