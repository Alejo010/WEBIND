/**
 * Created by Dionis on 02/10/2017.
 */

describe('ConsultaService', function () {

  request = require('supertest'),
   assert = require('assert');
  moment = require("moment")
  var walletid = ""
  var formationcentername = ""

/*  describe('#Consulta search_service findSearchQuery ', function () {
    it('Find Consulta by date' , function (done) {
      var query = {};
      var subquerymedico = {};
      var subqueryespecialidad = {};
      var page = 0;
      var len = 10;
      Consulta.find({})
        .populate("remitir_a")
        .populate("num_med")
        .populate("paciente")
        .populate("especialidad_remite")
        .populate("indic_exames")
        .exec(function (err, resultObject) {
        var searchQuery = {}
        searchQuery.fecha_prox_consulta = {}
        searchQuery.fecha_prox_consulta = {'gte':resultObject[0].fecha_prox_consulta};
        assert.notEqual(undefined, resultObject)

        ConsultaService.findSearchQuery(searchQuery, subquerymedico, subqueryespecialidad, page, len, function (err, result) {
          assert.equal(null, err)
          assert.equal(""+resultObject[0].fecha_prox_consulta, ""+result.fecha_prox_consulta)
          done()
        })
      })
    })
  })*/


  describe('#findConsultasByPaciente()', function () {
    it('should check find function', function (done) {
      const idPaciente = '5bfe243c154be30812511af7';
      ConsultaService.consultasPorPaciente(idPaciente)
        .then(function (result) {
          console.log(result);
          console.log(result.length);
          assert.notEqual(undefined, result);
          done();
        })
        .catch(done);
    });
  });


})



