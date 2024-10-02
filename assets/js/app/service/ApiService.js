/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 08/11/2017.
 */

myApp.service('ApiService',
  function ($rootScope, $http, $resource, $q) {
    /**
     * HTTP GET CALL
     * @param url
     * @returns {jQuery.promise|*|promise|Promise|f}
     */
    this.get = function (url) {
      let defered = $q.defer();
      let promise = defered.promise;
      $http.get(`${url}`)
        .then((response) => defered.resolve(response))
        .catch((err) => defered.reject(err));
      return promise;
    };

    /**
     * HTTP POST CALL
     * @param url
     * @param body
     * @returns {jQuery.promise|*|promise|Promise|f}
     */
    this.post = function (url, body) {
      let defered = $q.defer();
      let promise = defered.promise;
      $http.post(`${url}`, body)
        .then((response) => defered.resolve(response))
        .catch((err) => defered.reject(err));
      return promise;
    };

    /**
     * HTTP PUT CALL
     * @param url
     * @param body
     * @returns {jQuery.promise|*|promise|Promise|f}
     */
    this.put = function (url, body) {
      let defered = $q.defer();
      let promise = defered.promise;
      $http.put(`${url}`, body)
        .then((response) => defered.resolve(response))
        .catch((err) => defered.reject(err));
      return promise;
    };

    /**
     * HTTP DELETE CALL
     * @param url
     * @param body
     * @returns {jQuery.promise|*|promise|Promise|f}
     */
    this.delete = function (url, body) {
      let defered = $q.defer();
      let promise = defered.promise;
      $http.delete(`${url}`, body)
        .then((response) => defered.resolve(response))
        .catch((err) => defered.reject(err));
      return promise;
    };

  }
)

  .service('SexoResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.SEXO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('RazaResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.RAZA_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('AreaSaludResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.AREA_SALUD_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('MunicipioResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.MUNICIPIO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('EspecialidadResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.ESPECIALIDAD_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('ExamenResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.EXAMEN_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('HospitalResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.HOSPITAL_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('MovimientoFetalResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.MOVIMIENTO_FETAL_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('AntecedenteResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.ANTECEDENTE_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('AntPrenatalResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.ANT_PRENATAL_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )

  .service('NivelEscolaridadResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.NIVEL_ESCOLARIDAD_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('ParentezcoResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.PARENTEZCO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('TipoPartoResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.TIPO_PARTO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('LlantoResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.LLANTO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('ProvinciaResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.PROVINCIA_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )

  .service('AntFamiliarResource', function ($resource) {
    return $resource('/antFamiliar/:id', {id: '@id'}, {update: {method: 'PUT'}});
  })

  .service('FamiliarResource', function ($resource) {
    return $resource('/familiar/:id', {id: '@id'}, {update: {method: 'PUT'}});
  })


  .service('MedicoResource',
  function ($rootScope, $resource, API_ROUTE) {
    return $resource(`${API_ROUTE.MEDICO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
  }
)

  .service('PacienteResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.PACIENTE_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('EspecialidadResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.ESPECIALIDAD_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('RolResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.ROL_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('UsuarioResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.USUARIO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
  .service('ConsultaResource',
    function ($rootScope, $resource, API_ROUTE) {
      return $resource(`${API_ROUTE.CONSULTA_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
    }
  )
.service('UsuarioResource',
  function ($rootScope, $resource, API_ROUTE) {
    return $resource(`${API_ROUTE.USUARIO_RESOURCE}`, {id: '@id'}, {update: {method: 'PUT'}});
  }
)

  .service('RemisionResource', function ($resource) {
    return $resource('/remision/:id', {id: '@id'}, {update: {method: 'PUT'}});
  })

;
