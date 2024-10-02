/**
 * Created by GRID-2 on 13/09/2017.
 */
describe('LoginService', function () {
  request = require('supertest'),
    assert = require('assert');
  moment = require("moment")
  var walletid = ""
  var formationcentername = ""

  describe('#Login  test service searchQuer ', function () {
    it('Find user OK', function (done) {
      Login.find({}).exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject)
        searchQuery.password = resultObject[0].password
        searchQuery.username = resultObject[0].username
        LoginService.verify(searchQuery, function (err, result) {
          assert.equal(null, err)
          assert.notEqual(undefined, result.token)
          done()
        })
      })
    })
    it('Find user Bad', function (done) {
        Login.find({}).exec(function (err, resultObject) {
          var searchQuery = {}
          assert.notEqual(undefined, resultObject)
          searchQuery.password = resultObject[0].password
          searchQuery.username = "________"
          LoginService.verify(searchQuery, function (err, result) {
            assert.notEqual(null, err)
            assert.equal('Don´t exist user.', err)
            done()
          })
        })
    })
  })
 })
