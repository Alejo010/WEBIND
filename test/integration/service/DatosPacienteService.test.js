/**
 * Created by GRID-2 on 21/09/2017.
 */

describe('DatosPacienteService', function () {
  request = require('supertest'),
  assert = require('assert');
  moment = require("moment")
  var walletid = ""
  var formationcentername = ""

  describe('#Datos_Paciente  test service searchQuer ', function () {
    it('Find Pacient by HC', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject)
        searchQuery.hc = resultObject[0].hc
        DatosPacienteService.searchQuery(searchQuery, function (err, result) {
          assert.equal(null, err)
          assert.equal(resultObject[0].hc, result.datos_paciente.hc)
          done()
        })
      })
    })
    it('Find Pacient by Name', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject)
        searchQuery.persona = {}
        searchQuery.persona.name = resultObject[0].persona.name
        DatosPacienteService.searchQuery(searchQuery, function (err, result) {
          assert.equal(null, err)
          assert.equal(resultObject[0].persona.name, result.name)
          done()
        })
      })
    })
    it('Find Pacient by LastName', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject)
        searchQuery.persona = {}
        searchQuery.persona.lastname = resultObject[0].persona.lastname
        DatosPacienteService.searchQuery(searchQuery, function (err, result) {
          assert.equal(null, err)
          assert.equal(resultObject[0].persona.lastname, result.lastname)
          done()
        })
      })
    })
     it('Find Pacient by Name and  LastName', function (done) {
     Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
     var searchQuery = {}
     assert.notEqual(undefined,resultObject)
     searchQuery.persona = {}
     searchQuery.persona.name = resultObject[0].persona.name
     searchQuery.persona.lastname = resultObject[0].persona.lastname
     DatosPacienteService.searchQuery(searchQuery, function (err, result){
     assert.equal(null,err)
     assert.equal(resultObject[0].persona.lastname, result.lastname)
     assert.equal(resultObject[0].persona.name, result.name)
     done()
     })
     })
     })
     it('Find Pacient by Name , LastName, HC ', function (done) {
     Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
     var searchQuery = {}
     assert.notEqual(undefined,resultObject)
     searchQuery.hc = resultObject[0].hc
     searchQuery.persona = {}
     searchQuery.persona.name = resultObject[0].persona.name
     searchQuery.persona.lastname = resultObject[0].persona.lastname
     DatosPacienteService.searchQuery(searchQuery, function (err, result){
     assert.equal(null,err)
     assert.equal(resultObject[0].persona.lastname, result.lastname)
     assert.equal(resultObject[0].persona.name, result.name)
     assert.equal(resultObject[0].hc, result.datos_paciente.hc)
     done()
     })
     })
     })
     it('Find Pacient by CI', function (done) {
     Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
     var searchQuery = {}
     assert.notEqual(undefined,resultObject)
     searchQuery.persona = {}
     var ciTest = resultObject[1].persona.cival;
     searchQuery.persona.ci = resultObject[1].persona.cival
     DatosPacienteService.searchQuery(searchQuery, function (err, result){
     console.log("--" + JSON.stringify(result));
     assert.equal(null,err)
     assert.equal(ciTest, result.cival)
     done()
     })
     })
     })
      it('Find Pacient by LastName not exist', function (done) {
      Datos_paciente.find({}).populate("persona").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined,resultObject)
        searchQuery.persona = {}
        searchQuery.persona.fullname = "_______"
        DatosPacienteService.searchQuery(searchQuery, function (err, result){
          assert.equal(null,err)
          assert.equal(undefined, result)
          done()
        })
      })
    })
     })

  describe('#Datos_Paciente  test services ', function () {
    it('Find More Info by HC', function (done) {
      Persona.find({}).populate("datos_paciente").exec(function (err, resultObject) {
        var searchQuery = {}
        assert.notEqual(undefined, resultObject[0])

        DatosPacienteService.searchMoreQueryInfo(resultObject[0], function (err, result) {
          assert.equal(null, err)
          assert.notEqual(undefined, result)
          assert.notEqual(undefined, result.ant_pat_pers)
          assert.notEqual(undefined, result.datos_familia)
          assert.notEqual(undefined, result.antc_prenat)
          assert.notEqual(undefined, result.antc_perinat)
          assert.notEqual(undefined, result.area_salud)
          done()
        })
      })
    })
  })
})
