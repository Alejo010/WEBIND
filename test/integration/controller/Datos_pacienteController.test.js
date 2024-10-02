
var request = require('supertest');

const assert = require('assert');
const salis = require('sails');;
const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
const pathToFile = 'test/fixtures/'

describe('Datos_pacienteController', function() {

  describe('#Datos_Paciente  test controller', function() {
    it('Find Pacient by HC', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.hc = resultObject[0].hc;
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'HC':searchQuery.hc })
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            console.log(JSON.stringify(res.body.info))
            assert.equal(resultObject[0].hc, res.body.info.datos_paciente.hc)
            done()
          })
      })

    });

    it('Find Pacient by Name', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.persona = {}
        searchQuery.persona.name = resultObject[0].persona.name
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'name':searchQuery.persona.name })
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            assert.equal(resultObject[0].persona.name, res.body.info.name)
            done()
          })
      })

    });

    it('Find Pacient by LastName', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.persona = {}
        searchQuery.persona.name = resultObject[0].persona.name
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'name':searchQuery.persona.name })
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            assert.equal(resultObject[0].persona.lastname, res.body.info.lastname)
            done()
          })
      })

    });

    it('Find Pacient by Name and  LastName', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.persona = {}
        searchQuery.persona.fullname = resultObject[0].persona.name
        searchQuery.persona.fullname += " " +  resultObject[0].persona.lastname
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'fullname':searchQuery.persona.fullname })
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            assert.equal(true,  (searchQuery.persona.fullname.indexOf( res.body.info.fullname) !== -1) )
            done()
          })
      })

    });

    it('Find Pacient by Name, LastName, HC', function (done) {

      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.hc = resultObject[0].hc;
        searchQuery.persona = {}
        searchQuery.persona.fullname = resultObject[0].persona.name
        searchQuery.persona.fullname += " " +  resultObject[0].persona.lastname
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'HC':searchQuery.hc,
                 'fullname':searchQuery.persona.fullname})
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            assert.equal(true,  (searchQuery.persona.fullname.indexOf( res.body.info.fullname) !== -1) )
            assert.equal(resultObject[0].hc, res.body.info.datos_paciente.hc)
            done()
          })
      })

    });

    it('Find Pacient by CI', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.persona = {}
        searchQuery.persona.ci = resultObject[0].persona.ci
        request(sails.hooks.http.app)
          .post('/searchpacient')
          .send({'CI':searchQuery.persona.ci })
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null,err)
            assert.equal(resultObject[0].persona.ci, res.body.info.cival)
            done()
          })
      })

    });

  })
  describe('#Datos_Paciente  test controller search more Info', function() {
    it('Find Pacient by HC', function (done) {
      Persona.find({}).populate("datos_paciente").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject[0])
        searchQuery = resultObject[0];
        request(sails.hooks.http.app)
          .post('/searchpacientmoredata')
          .send(searchQuery)
          .expect(200, function (err, res) {
            ///It's xml file with update information
            assert.equal(null, err)
            console.log(JSON.stringify(res.body.info))
            assert.notEqual(undefined, res.body.info.ant_pat_pers)
            assert.notEqual(undefined, res.body.info.datos_familia)
            assert.notEqual(undefined, res.body.info.antc_prenat)
            assert.notEqual(undefined, res.body.info.antc_perinat)
            assert.notEqual(undefined, res.body.info.area_salud)
            done()
          })
      })

    });
  })
});
