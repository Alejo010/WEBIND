/**
 * Created by GRID-2 on 26/09/2017.
 */
var request = require('supertest');

const assert = require('assert');
const salis = require('sails');;
const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
const pathToFile = 'test/fixtures/'
describe('LoginCotroller', function() {

  describe('Search login', function () {
    it('Find Login', function (done) {
        Login.find({}).exec(function (err, resultObject) {
          var searchQuery = {}
          assert.notEqual(undefined, resultObject)
          searchQuery.password = resultObject[0].password
          searchQuery.username = resultObject[0].username
        request(sails.hooks.http.app)
          .post('/checklogin')
          .send(searchQuery)
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null, err)
            console.log(JSON.stringify(res.body.info))
            assert.notEqual(undefined, res.body.info.token)
            done()

          })
      })

    });
  })
})
