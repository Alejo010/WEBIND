/**
 * Created by GRID-2 on 21/09/2017.
 */
var faker = require('faker');
var healthAreaSize = 7
faker.locale = "fr"
module.exports = {
  searchQuery: function (_objectPrm, callback) {
    if (!_objectPrm) {
      callback("error", "No hay datos para realizar la búsqueda")
    }
    else {
      ///Verificar si esta la persona para hacer busqueda por carnet
      ///de identidad nombre y apellidos
      query = {}
      subquery = {}
      if (_objectPrm.hc) {
        query.hc = _objectPrm.hc
      }

      if (_objectPrm.persona) {
        if (_objectPrm.persona.ci) {
          subquery = {'cival': '' + _objectPrm.persona.ci + ''};
        }
        if (_objectPrm.persona.name && _objectPrm.persona.lastname) {
          subquery.or = [{name: {'contains': _objectPrm.persona.name}}, {lastname: {'contains': _objectPrm.persona.lastname}}]
        }
        else if (_objectPrm.persona.name) {
          subquery.name = _objectPrm.persona.name;
        }
        else if (_objectPrm.persona.lastname) {
          subquery.lastname = _objectPrm.persona.lastname;
        }
        else {
          subquery.fullname = _objectPrm.persona.fullname;
        }
      }

      console.log("Subconsulta " + JSON.stringify(subquery))
      console.log("Query " + JSON.stringify(query))
      Persona.find(subquery).populate('datos_paciente',{where: query}
      )
        .populate('sexo')
        .populate('raza')
        .exec(function pacientDataFounded(err, pacientData) {

          if (err) {
            console.log(err)
            callback("err", err)
          }
          else {
            callback(null, pacientData[0])
          }
        })
    }
  },

  searchMoreQueryInfo: function (_objectPrm, callback) {
    if (!_objectPrm) {
      callback("error", "No hay datos para realizar la búsqueda")
    }
    else {
      ///Verificar si esta la persona para hacer busqueda por carnet
      ///de identidad nombre y apellidos
      query = {}
      subquery = {}
      if (typeof _objectPrm.datos_paciente === "undefined" || typeof _objectPrm.datos_paciente.id === "undefined") {
        callback("error", "No hay datos para realizar la búsqueda")
      }
      else {
        Datos_paciente.findOne({id: _objectPrm.datos_paciente.id}).populate("datos_familia")
          .populate("area_salud").populate("ant_pat_pers").populate("ant_pat_fam")
          .populate("hosp_nacim").exec(function (err, resultObject) {

          if (!resultObject || !resultObject.ant_pat_pers) {
            callback("No se encuentra la información deseada", null)
          }
          else {
            Antecedentes_patologicos_pers.findOne({id: resultObject.ant_pat_pers.id}).populate("antc_perinat")
              .populate("antc_post").populate("antc_prenat").exec(function (err, resultObjetAntec) {
              if (resultObjetAntec) {
                Area_salud.find({id: resultObject.area_salud.id}).populate("municipio").exec(function (err, areasSObject) {
                  resultObject.antc_prenat = resultObjetAntec.antc_prenat;
                  resultObject.antc_perinat = resultObjetAntec.antc_perinat;
                  resultObject.antc_post = resultObjetAntec.antc_post;
                  resultObject.area_salud = areasSObject[0];
                  callback(null, resultObject);
                })

              }


            })
          }
        })

      }
    }
  }
}
