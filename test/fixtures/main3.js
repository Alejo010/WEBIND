var a = {
  "domain": null,
  "_events": {},
  "_eventsCount": 1,
  "output": [],
  "outputEncodings": [],
  "outputCallbacks": [],
  "outputSize": 0,
  "writable": true,
  "_last": false,
  "upgrading": false,
  "chunkedEncoding": false,
  "shouldKeepAlive": true,
  "useChunkedEncodingByDefault": true,
  "sendDate": true,
  "_removedConnection": false,
  "_removedContLen": false,
  "_removedTE": false,
  "_contentLength": null,
  "_hasBody": true,
  "_trailer": "",
  "finished": false,
  "_headerSent": true,
  "socket": {
    "connecting": false,
    "_hadError": false,
    "_handle": {"reading": true, "owner": "~socket", "onconnection": null, "writeQueueSize": 0, "_consumed": true},
    "_parent": null,
    "_host": null,
    "_readableState": {
      "objectMode": false,
      "highWaterMark": 16384,
      "buffer": {"head": null, "tail": null, "length": 0},
      "length": 0,
      "pipes": null,
      "pipesCount": 0,
      "flowing": true,
      "ended": false,
      "endEmitted": false,
      "reading": true,
      "sync": false,
      "needReadable": true,
      "emittedReadable": false,
      "readableListening": false,
      "resumeScheduled": false,
      "destroyed": false,
      "defaultEncoding": "utf8",
      "awaitDrain": 0,
      "readingMore": false,
      "decoder": null,
      "encoding": null
    },
    "readable": true,
    "domain": null,
    "_events": {"end": [null, null], "drain": [null, null], "close": [null, null, null]},
    "_eventsCount": 10,
    "_writableState": {
      "objectMode": false,
      "highWaterMark": 16384,
      "finalCalled": false,
      "needDrain": false,
      "ending": false,
      "ended": false,
      "finished": false,
      "destroyed": false,
      "decodeStrings": false,
      "defaultEncoding": "utf8",
      "length": 450,
      "writing": false,
      "corked": 1,
      "sync": false,
      "bufferProcessing": false,
      "writecb": null,
      "writelen": 0,
      "bufferedRequest": {
        "chunk": "HTTP/1.1 200 OK\r\nX-Powered-By: Sails <sailsjs.org>\r\nAccess-Control-Allow-Origin: \r\nAccess-Control-Allow-Credentials: \r\nAccess-Control-Allow-Methods: \r\nAccess-Control-Allow-Headers: \r\nAccess-Control-Expose-Headers: \r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 68\r\nETag: W/\"44-uBkU3+yC7I7Yj0rVyKOsUQ\"\r\nDate: Tue, 28 Nov 2017 22:03:30 GMT\r\nConnection: keep-alive\r\n\r\n",
        "encoding": "latin1",
        "isBuf": false,
        "next": {
          "chunk": {
            "type": "Buffer",
            "data": [123, 10, 32, 32, 34, 101, 114, 114, 111, 114, 34, 58, 32, 34, 84, 117, 116, 111, 114, 32, 101, 115, 116, 195, 161, 32, 115, 105, 101, 110, 100, 111, 32, 117, 116, 105, 108, 105, 122, 97, 100, 111, 44, 32, 110, 111, 32, 115, 101, 32, 112, 117, 101, 100, 101, 32, 101, 108, 105, 109, 105, 110, 97, 114, 46, 34, 10]
          }, "encoding": "buffer", "isBuf": true, "next": null
        }
      },
      "lastBufferedRequest": "~socket~_writableState~bufferedRequest~next",
      "pendingcb": 2,
      "prefinished": false,
      "errorEmitted": false,
      "bufferedRequestCount": 2,
      "corkedRequestsFree": {"next": {"next": null, "entry": null}, "entry": null}
    },
    "writable": true,
    "allowHalfOpen": true,
    "_bytesDispatched": 110596,
    "_sockname": null,
    "_pendingData": null,
    "_pendingEncoding": "",
    "server": {
      "domain": null,
      "_events": {"connection": [null, null]},
      "_eventsCount": 4,
      "_connections": 2,
      "_handle": {"reading": false, "owner": "~socket~server", "onread": null, "writeQueueSize": 0},
      "_usingSlaves": false,
      "_slaves": [],
      "_unref": false,
      "allowHalfOpen": true,
      "pauseOnConnect": false,
      "httpAllowHalfOpen": false,
      "timeout": 120000,
      "keepAliveTimeout": 5000,
      "_pendingResponseData": 0,
      "maxHeadersCount": null,
      "_connectionKey": "6::::1337"
    },
    "_server": "~socket~server",
    "_idleTimeout": 120000,
    "_idleNext": {
      "_idleNext": "~socket",
      "_idlePrev": "~socket",
      "_timer": {"_list": "~socket~_idleNext"},
      "_unrefed": true,
      "msecs": 120000,
      "nextTick": false
    },
    "_idlePrev": "~socket~_idleNext",
    "_idleStart": 36096,
    "_destroyed": false,
    "parser": {
      "_headers": [],
      "_url": "",
      "_consumed": true,
      "socket": "~socket",
      "incoming": {
        "_readableState": {
          "objectMode": false,
          "highWaterMark": 16384,
          "buffer": {"head": null, "tail": null, "length": 0},
          "length": 0,
          "pipes": null,
          "pipesCount": 0,
          "flowing": null,
          "ended": true,
          "endEmitted": false,
          "reading": false,
          "sync": true,
          "needReadable": false,
          "emittedReadable": true,
          "readableListening": false,
          "resumeScheduled": false,
          "destroyed": false,
          "defaultEncoding": "utf8",
          "awaitDrain": 0,
          "readingMore": true,
          "decoder": null,
          "encoding": null
        },
        "readable": true,
        "domain": null,
        "_events": {},
        "_eventsCount": 0,
        "socket": "~socket",
        "connection": "~socket",
        "httpVersionMajor": 1,
        "httpVersionMinor": 1,
        "httpVersion": "1.1",
        "complete": true,
        "headers": {
          "host": "localhost:1337",
          "connection": "keep-alive",
          "accept": "application/json, text/plain, */*",
          "origin": "http://localhost:1337",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
          "referer": "http://localhost:1337/",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "es-ES,es;q=0.9,en;q=0.8",
          "cookie": "Lang=en; Theme=LookOut; User=user10@businessinfact.es; Webstorm-55192705=726642fd-b8ce-4e77-a1e6-a31f65a6e3b7; Gitblit=dd94709528bb1c83d08f3088d4043f4742891f4f; io=XovFgi1rJQNydfLxAAAA; sails.sid=s%3AYXbglN6h4PObL3DrqFbqvHrLK30DB7mA.%2BPdHpfNuIHE3HJ1Q70GaGpwRI2NCKOQ9WYbRMfNmUao; dcjq-accordion=19%2C28"
        },
        "rawHeaders": ["Host", "localhost:1337", "Connection", "keep-alive", "Accept", "application/json, text/plain, */*", "Origin", "http://localhost:1337", "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36", "Referer", "http://localhost:1337/", "Accept-Encoding", "gzip, deflate, br", "Accept-Language", "es-ES,es;q=0.9,en;q=0.8", "Cookie", "Lang=en; Theme=LookOut; User=user10@businessinfact.es; Webstorm-55192705=726642fd-b8ce-4e77-a1e6-a31f65a6e3b7; Gitblit=dd94709528bb1c83d08f3088d4043f4742891f4f; io=XovFgi1rJQNydfLxAAAA; sails.sid=s%3AYXbglN6h4PObL3DrqFbqvHrLK30DB7mA.%2BPdHpfNuIHE3HJ1Q70GaGpwRI2NCKOQ9WYbRMfNmUao; dcjq-accordion=19%2C28"],
        "trailers": {},
        "rawTrailers": [],
        "upgrade": false,
        "url": "/Parentezco/5a1dd90d28dc627c4f778050",
        "method": "DELETE",
        "statusCode": null,
        "statusMessage": null,
        "client": "~socket",
        "_consuming": false,
        "_dumped": false,
        "originalUrl": "/Parentezco/5a1dd90d28dc627c4f778050",
        "_parsedUrl": {
          "protocol": null,
          "slashes": null,
          "auth": null,
          "host": null,
          "port": null,
          "hostname": null,
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/Parentezco/5a1dd90d28dc627c4f778050",
          "path": "/Parentezco/5a1dd90d28dc627c4f778050",
          "href": "/Parentezco/5a1dd90d28dc627c4f778050",
          "_raw": "/Parentezco/5a1dd90d28dc627c4f778050"
        },
        "query": {},
        "res": "~",
        "_sails": {
          "config": {
            "blueprints": {
              "actions": true,
              "index": true,
              "shortcuts": true,
              "rest": true,
              "prefix": "",
              "restPrefix": "",
              "pluralize": false,
              "populate": true,
              "autoWatch": true
            },
            "connections": {
              "localDiskDb": {"adapter": "sails-disk"},
              "someMongodbServer": {
                "adapter": "sails-mongo",
                "host": "127.0.0.1",
                "port": 27017,
                "database": "db_webind"
              }
            },
            "cors": {
              "origin": "*",
              "allRoutes": false,
              "credentials": true,
              "methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
              "headers": "content-type",
              "exposeHeaders": "",
              "securityLevel": 0
            },
            "globals": {"adapters": true, "models": true, "services": true},
            "http": {
              "middleware": {
                "order": ["startRequestTimer", "cookieParser", "session", "bodyParser", "handleBodyParserError", "compress", "methodOverride", "poweredBy", "$custom", "router", "www", "favicon", "404", "500"],
                "compress": false
              }, "cache": 1
            },
            "i18n": {
              "defaultLocale": "es",
              "locales": ["en", "es", "fr", "de"],
              "localesDirectory": "/config/locales",
              "cookie": null,
              "directory": "C:\\farias\\WORK\\CODE\\node\\project-webind/config/locales",
              "updateFiles": false,
              "extension": ".json"
            },
            "log": {"level": "info"},
            "models": {"connection": "someMongodbServer", "migrate": "safe"},
            "orm": {
              "_hookTimeout": 60000,
              "skipProductionWarnings": false,
              "moduleDefinitions": {"models": {}, "adapters": {}}
            },
            "policies": {"*": true},
            "pubsub": {"_hookTimeout": 60000},
            "routes": {
              "/csrfToken": {
                "cors": {
                  "origin": "-",
                  "credentials": true,
                  "allRoutes": false,
                  "methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
                  "headers": "content-type",
                  "exposeHeaders": "",
                  "securityLevel": 0
                }
              },
              "/": {"view": "template/alpona/index"},
              "/login": {"view": "template/alpona/login"},
              "/maincotainer": {"view": "template/alpona/maincontainer"},
              "/makemedicalquery": {"view": "template/alpona/formationwizard/wizardpaginationDateBook"},
              "/royalmedicalquery": {"view": "template/alpona/querywizard/wizardpaginationDateBook"},
              "/viewquery": {"view": "template/alpona/basic-table"},
              "/wizard": {"view": "template/alpona/form-wizard"},
              "/newquery": {"view": "template/alpona/form-elements"},
              "/templates/formationwizard/customer.html": {"view": "template/alpona/formationwizard/customer1"},
              "/templates/formationwizard/licence.html": {"view": "template/alpona/formationwizard/licence1"},
              "/templates/formationwizard/payment.html": {"view": "template/alpona/formationwizard/observations1"},
              "/templates/formationwizard/recap.html": {"view": "template/alpona/formationwizard/recap1"},
              "/templates/querywizard/page1.html": {"view": "template/alpona/querywizard/page1"},
              "/templates/querywizard/page2.html": {"view": "template/alpona/querywizard/page2"},
              "/templates/querywizard/page3.html": {"view": "template/alpona/querywizard/page3"},
              "/wmodalMessage": {"view": "template/alpona/wmodalMessage"},
              "post /searchpacient": "PacienteController.findPacient",
              "post /searchpacientmoredata": "PacienteController.findMorePacientInfo",
              "post /checklogin": "LoginController.check",
              "/home": "DefaultController.homeAction",
              "GET /reporte/area-salud": "AreaSaludController.getReporte",
              "GET /reporte/especialidad": "EspecialidadController.getReporte"
            },
            "seeds": {"path": "seeds", "disable": true, "active": false},
            "session": {
              "secret": "9baed8346f21ef54de3d019babf32fdc",
              "adapter": "memory",
              "key": "sails.sid",
              "routesDisabled": [],
              "store": {
                "domain": null,
                "_events": {"disconnect": [null, null], "connect": [null, null]},
                "_eventsCount": 2,
                "sessions": {"YXbglN6h4PObL3DrqFbqvHrLK30DB7mA": "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}"}
              }
            },
            "sockets": {
              "adapterOptions": {},
              "sendResponseHeaders": true,
              "sendStatusCode": true,
              "grant3rdPartyCookie": true,
              "path": "/socket.io",
              "serveClient": false,
              "pingTimeout": 60000,
              "pingInterval": 25000,
              "maxHttpBufferSize": 100000000,
              "transports": ["polling", "websocket"],
              "allowUpgrades": true,
              "cookie": false
            },
            "views": {"engine": {"name": "ejs", "ext": "ejs"}, "layout": false, "partials": false},
            "environment": "development",
            "hooks": {},
            "appPath": "C:\\farias\\WORK\\CODE\\node\\project-webind",
            "paths": {
              "tmp": "C:\\farias\\WORK\\CODE\\node\\project-webind\\.tmp",
              "config": "C:\\farias\\WORK\\CODE\\node\\project-webind\\config",
              "controllers": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\controllers",
              "policies": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\policies",
              "services": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\services",
              "adapters": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\adapters",
              "models": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\models",
              "hooks": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\hooks",
              "blueprints": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\blueprints",
              "responses": "C:\\farias\\WORK\\CODE\\node\\project-webind\\api\\responses",
              "views": "C:\\farias\\WORK\\CODE\\node\\project-webind\\views",
              "layout": "C:\\farias\\WORK\\CODE\\node\\project-webind\\views\\layout.ejs",
              "public": "C:\\farias\\WORK\\CODE\\node\\project-webind\\.tmp\\public"
            },
            "middleware": {},
            "rootPath": "C:\\farias\\WORK\\CODE\\node\\project-webind",
            "sailsPackageJSON": {
              "_args": [[{
                "raw": "sails@0.12.14",
                "scope": null,
                "escapedName": "sails",
                "name": "sails",
                "rawSpec": "0.12.14",
                "spec": "0.12.14",
                "type": "version"
              }, "C:\\xampp7\\htdocs\\senior-first\\src\\SF\\ApiBundle\\Resources\\public\\senior-apps"]],
              "_from": "sails@0.12.14",
              "_id": "sails@0.12.14",
              "_inCache": true,
              "_location": "/sails",
              "_nodeVersion": "6.11.0",
              "_npmOperationalInternal": {
                "host": "s3://npm-registry-packages",
                "tmp": "tmp/sails-0.12.14.tgz_1506379712042_0.5432285552378744"
              },
              "_npmUser": {"name": "sgress454", "email": "sgress454@treeline.io"},
              "_npmVersion": "3.10.10",
              "_phantomChildren": {},
              "_requested": {
                "raw": "sails@0.12.14",
                "scope": null,
                "escapedName": "sails",
                "name": "sails",
                "rawSpec": "0.12.14",
                "spec": "0.12.14",
                "type": "version"
              },
              "_requiredBy": ["#USER"],
              "_resolved": "http://127.0.0.1:8081/repository/npm/sails/-/sails-0.12.14.tgz",
              "_shasum": "4ad8be98cfcf456e7d1c85f6e7731f31af332397",
              "_shrinkwrap": null,
              "_spec": "sails@0.12.14",
              "_where": "C:\\xampp7\\htdocs\\senior-first\\src\\SF\\ApiBundle\\Resources\\public\\senior-apps",
              "author": {"name": "Mike McNeil", "email": "@mikermcneil"},
              "bin": {"sails": "./bin/sails.js"},
              "bugs": {"url": "http://github.com/balderdashy/sails/issues"},
              "dependencies": {
                "@sailshq/express": "^3.21.3",
                "@sailshq/lodash": "^3.10.2",
                "anchor": "\\x7e0.10.5",
                "async": "1.5.0",
                "captains-log": "1.0.0",
                "chalk": "1.1.3",
                "commander": "2.9.0",
                "compression": "1.6.2",
                "connect": "3.4.1",
                "connect-flash": "0.1.1",
                "consolidate": "0.14.1",
                "cookie": "0.1.2",
                "cookie-parser": "1.3.5",
                "cookie-signature": "1.0.6",
                "csurf": "1.9.0",
                "ejs": "2.3.4",
                "ejs-locals": "1.0.2",
                "express-handlebars": "3.0.0",
                "express-session": "1.14.2",
                "flaverr": "^1.0.0",
                "glob": "5.0.15",
                "grunt": "1.0.1",
                "grunt-cli": "1.2.0",
                "grunt-contrib-clean": "1.0.0",
                "grunt-contrib-coffee": "1.0.0",
                "grunt-contrib-concat": "1.0.1",
                "grunt-contrib-copy": "1.0.0",
                "grunt-contrib-cssmin": "1.0.1",
                "grunt-contrib-jst": "1.0.0",
                "grunt-contrib-less": "1.3.0",
                "grunt-contrib-uglify": "1.0.1",
                "grunt-contrib-watch": "1.0.0",
                "grunt-sails-linker": "\\x7e0.10.1",
                "grunt-sync": "0.5.2",
                "i18n": "0.8.1",
                "include-all": "^1.0.0",
                "merge-defaults": "\\x7e0.2.1",
                "method-override": "2.3.5",
                "mock-req": "0.2.0",
                "mock-res": "0.3.0",
                "parseurl": "1.3.1",
                "path-to-regexp": "1.5.3",
                "pluralize": "1.2.1",
                "prompt": "0.2.14",
                "rc": "1.0.1",
                "reportback": "\\x7e0.1.9",
                "rttc": "9.3.3",
                "sails-disk": "\\x7e0.10.9",
                "sails-generate": "\\x7e0.13.0",
                "sails-hook-orm": "\\x7e1.0.9",
                "sails-hook-sockets": "^0.13.9",
                "sails-stringfile": "\\x7e0.3.2",
                "sails-util": "\\x7e0.11.0",
                "semver": "5.1.0",
                "serve-favicon": "2.3.0",
                "serve-static": "1.10.2",
                "skipper": "\\x7e0.7.0",
                "uid-safe": "1.1.0",
                "walk": "2.3.9"
              },
              "description": "API-driven framework for building realtime apps, using MVC conventions (based on Express and Socket.io)",
              "devDependencies": {
                "benchmark": "1.0.0",
                "checksum": "0.1.1",
                "coffee-script": "1.9.1",
                "expect.js": "0.3.1",
                "fs-extra": "0.30.0",
                "istanbul": "0.4.1",
                "machinepack-fs": "^8.0.2",
                "machinepack-process": "^2.0.2",
                "mocha": "3.0.0",
                "portfinder": "0.4.0",
                "request": "2.68.0",
                "root-require": "0.3.1",
                "should": "5.2.0",
                "socket.io-client": "1.4.6",
                "supertest": "1.1.0",
                "tmp": "0.0.30"
              },
              "directories": {"lib": "lib"},
              "dist": {
                "shasum": "4ad8be98cfcf456e7d1c85f6e7731f31af332397",
                "tarball": "http://127.0.0.1:8081/repository/npm/sails/-/sails-0.12.14.tgz"
              },
              "engines": {"node": ">= 0.10.0", "npm": ">= 1.4.0"},
              "gitHead": "575f746bbed95902bd5b593fd24a0b20c9b256ab",
              "homepage": "http://sailsjs.org",
              "keywords": ["mvc", "web-framework", "express", "sailsjs", "sails.js", "REST", "API", "orm", "socket.io"],
              "license": "MIT",
              "main": "./lib/index.js",
              "maintainers": [{"name": "particlebanana", "email": "particlebanana@gmail.com"}, {
                "name": "sgress454",
                "email": "sgress454@treeline.io"
              }, {"name": "mikermcneil", "email": "npm@sailsjs.com"}, {
                "name": "balderdashy",
                "email": "mike@balderdash.co"
              }],
              "name": "sails",
              "optionalDependencies": {},
              "readme": "ERROR: No README data found!",
              "repository": {"type": "git", "url": "git://github.com/balderdashy/sails.git"},
              "scripts": {"test": "mocha -b"},
              "version": "0.12.14"
            },
            "generators": {"modules": {}},
            "_": ["lift"],
            "configs": ["C:\\farias\\WORK\\CODE\\node\\project-webind\\.sailsrc"],
            "config": "C:\\farias\\WORK\\CODE\\node\\project-webind\\.sailsrc",
            "moduleloader": {"configExt": ["js", "json"], "sourceExt": ["js"]},
            "csrf": {
              "grantTokenViaAjax": false,
              "protectionEnabled": false,
              "origin": "-",
              "routesDisabled": "-",
              "route": "/csrfToken"
            },
            "port": 1337,
            "ssl": {},
            "cron": {}
          },
          "hooks": ["moduleloader", "logger", "request", "orm", "views", "blueprints", "responses", "controllers", "sockets", "pubsub", "policies", "services", "csrf", "cors", "i18n", "userconfig", "session", "grunt", "http", "userhooks", "cron", "mongo-auto-index"],
          "models": [{
            "attributes": {
              "descripcion": {"type": "text", "required": true},
              "parentezco": {"model": "parentezco", "required": true},
              "paciente": {"model": "paciente", "required": true},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~0~attributes~createdAt"
            },
            "identity": "antpatfamiliar",
            "globalId": "AntPatFamiliar",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "ant_pat_familiar"
          }, {
            "attributes": {
              "antPrenatal": {"model": "antprenatal", "columnName": "ant_prenatal"},
              "antPerinatal": {"model": "antperinatal", "columnName": "ant_perinatal"},
              "antPostnatal": {"model": "antpostnatal", "columnName": "ant_postnatal"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~1~attributes~createdAt"
            },
            "identity": "antpatpersonal",
            "globalId": "AntPatPersonal",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "ant_pat_personal"
          }, {
            "attributes": {
              "peso": {"type": "string", "required": true, "size": 250, "columnName": "peso_al_nacer"},
              "talla": {"type": "string", "required": true, "size": 250},
              "circunferenciaCefalica": {
                "type": "string",
                "required": true,
                "size": 250,
                "columnName": "circunferencia_cefalica"
              },
              "apgar": {"type": "integer", "required": true},
              "descripcionParto": {"type": "text", "required": true, "columnName": "descripcion_parto"},
              "observaciones": {"type": "text", "required": true},
              "tipoParto": {"model": "tipoparto", "columnName": "tipo_parto"},
              "llanto": {"model": "llanto", "columnName": "llanto"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~2~attributes~createdAt"
            },
            "identity": "antperinatal",
            "globalId": "AntPerinatal",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "ant_perinatal"
          }, {
            "attributes": {
              "descripcion": {"type": "text", "required": true},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~3~attributes~createdAt"
            },
            "identity": "antpostnatal",
            "globalId": "AntPostnatal",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "ant_postnatal"
          }, {
            "attributes": {
              "infecciones": {"type": "text", "required": true},
              "radiaciones": {"type": "boolean", "required": true},
              "historiaInfertilidad": {"type": "boolean", "required": true, "columnName": "historia_infertilidad"},
              "edadGestacional": {"type": "string", "required": true, "size": 250, "columnName": "edad_gestacional"},
              "enfermedadesMaternas": {"type": "text", "required": true, "columnName": "enfermedades_maternas"},
              "amenazaAborto": {"type": "boolean", "required": true, "columnName": "amenaza_aborto"},
              "droga": {"model": "droga", "required": true},
              "movimientoFetal": {"model": "movimientofetal", "columnName": "movimiento_fetal"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~4~attributes~createdAt"
            },
            "identity": "antprenatal",
            "globalId": "AntPrenatal",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "ant_prenatal"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "municipio": {"model": "municipio", "required": true},
              "pacientes": {"collection": "paciente", "via": "areaSalud"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~5~attributes~createdAt"
            },
            "identity": "areasalud",
            "globalId": "AreaSalud",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "area_salud"
          }, {
            "attributes": {
              "fecha": {"type": "date", "required": true},
              "motivo": {"type": "text", "required": true},
              "impresionDiagnostica": {"type": "text", "required": true, "columnName": "impresion_diagnostica"},
              "diagosticoDef": {"type": "text", "columnName": "diagostico_def"},
              "examenFisico": {"type": "text", "required": true, "columnName": "examen_fisico"},
              "tratamiento": {"type": "text"},
              "evolucion": {"type": "text"},
              "fechaProximaConsulta": {"type": "date", "required": true, "columnName": "fecha_proxima_consulta"},
             // "remitirA": {"model": "especialidad", "columnName": "remitir_a"},
              "remitidoDesde": {"model": "especialidad", "columnName": "remitido_desde"},
              "medico": {"model": "medico", "required": true},
              "paciente": {"model": "paciente", "required": true},
              "examenesIndicados": {"collection": "examenindicado", "via": "consulta"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~6~attributes~createdAt"
            },
            "identity": "consulta",
            "globalId": "Consulta",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "consulta"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "antPrenatales": {"collection": "antprenatal", "via": "droga"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~7~attributes~createdAt"
            },
            "identity": "droga",
            "globalId": "Droga",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "droga"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "medicos": {"collection": "medico", "via": "especialidad"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~8~attributes~createdAt"
            },
            "identity": "especialidad",
            "globalId": "Especialidad",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "especialidad"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "examenesIndicados": {"collection": "examenindicado", "via": "examen"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~9~attributes~createdAt"
            },
            "identity": "examen",
            "globalId": "Examen",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "examen"
          }, {
            "attributes": {
              "resultado": {"type": "text", "required": true},
              "consulta": {"model": "consulta", "required": true},
              "examen": {"model": "examen", "required": true},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~10~attributes~createdAt"
            },
            "identity": "examenindicado",
            "globalId": "ExamenIndicado",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "examen_indicado"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "size": 250},
              "apellidos": {"type": "string", "required": true, "size": 250},
              "telefono": {"type": "string", "required": false},
              "parentezco": {"model": "parentezco", "required": true},
              "paciente": {"model": "paciente", "required": true},
              "nivelEscolaridad": {"model": "nivelescolaridad", "required": true, "columnName": "nivel_escolaridad"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~11~attributes~createdAt"
            },
            "identity": "familiar",
            "globalId": "Familiar",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "familiar"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "pacientes": {"collection": "paciente", "via": "hospital"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~12~attributes~createdAt"
            },
            "identity": "hospital",
            "globalId": "Hospital",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "hospital"
          }, {
            "attributes": {
              //"isMainLogin": {"type": "boolean", "defaultsTo": false},
              "username": {"type": "string", "required": true},
              "password": {"type": "string", "required": true},
              "isActivated": {"type": "boolean", "defaultsTo": false},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~13~attributes~createdAt"
            },
            "identity": "login",
           // "globalId": "Login",
            "connection": ["someMongodbServer"],
            "schema": true,
            "tableName": "login"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "size": 250},
              "apellidos": {"type": "string", "required": true, "size": 250},
              "ci": {"type": "string", "required": true, "unique": true, "size": 11},
              "numeroMedico": {"type": "string", "size": 250, "columnName": "numero_medico"},
              "especialidad": {"model": "especialidad", "required": true},
              "consultas": {"collection": "consulta", "via": "medico"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~14~attributes~createdAt"
            },
            "identity": "medico",
            "globalId": "Medico",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "medico"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "antPrenatales": {"collection": "antprenatal", "via": "movimientoFetal"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~15~attributes~createdAt"
            },
            "identity": "movimientofetal",
            "globalId": "MovimientoFetal",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "movimiento_fetal"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "provincia": {"model": "provincia"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~16~attributes~createdAt"
            },
            "identity": "municipio",
            "globalId": "Municipio",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "municipio"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "familiares": {"collection": "familiar", "via": "nivelEscolaridad"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~17~attributes~createdAt"
            },
            "identity": "nivelescolaridad",
            "globalId": "NivelEscolaridad",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "nivel_escolaridad"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "familiares": {"collection": "familiar", "via": "nivelEscolaridad"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~18~attributes~createdAt"
            },
            "identity": "telefono",
            "globalId": "telefono",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "telefono"
          }, {
            "attributes": {
              "hc": {"type": "string", "required": true, "unique": true, "size": 250},
              "nombre": {"type": "string", "required": true, "size": 250},
              "apellidos": {"type": "string", "required": true, "size": 250},
              "direccion": {"type": "text", "required": true},
              "fechaNacimiento": {"type": "datetime", "required": true, "columnName": "fecha_nacimiento"},
              "areaSalud": {"model": "areasalud", "columnName": "area_salud", "required": true},
              "antPatPersonal": {"model": "antpatpersonal", "columnName": "ant_pat_personal", "required": true},
              "hospital": {"model": "hospital", "required": true},
              "sexo": {"model": "sexo", "required": true},
              "raza": {"model": "raza", "required": true},
              "familiares": {"collection": "familiar", "via": "paciente"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~19~attributes~createdAt"
            },
            "identity": "paciente",
            "globalId": "Paciente",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "paciente"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "antPatFamiliares": {"collection": "antpatfamiliar", "via": "parentezco"},
              "familiares": {"collection": "familiar", "via": "parentezco"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~20~attributes~createdAt"
            },
            "identity": "parentezco",
            "globalId": "Parentezco",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "parentezco"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~21~attributes~createdAt"
            },
            "identity": "provincia",
            "globalId": "Provincia",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "provincia"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~22~attributes~createdAt"
            },
            "identity": "raza",
            "globalId": "Raza",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "raza"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true},
              "descripcion": {"type": "text"},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~23~attributes~createdAt"
            },
            "identity": "rol",
            "globalId": "Rol",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "rol"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~24~attributes~createdAt"
            },
            "identity": "sexo",
            "globalId": "Sexo",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "sexo"
          }, {
            "attributes": {
              "nombre": {"type": "string", "required": true, "unique": true, "size": 250},
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~25~attributes~createdAt"
            },
            "identity": "tipoparto",
            "globalId": "TipoParto",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "tipo_parto"
          }, {
            "attributes": {
              "id": {"type": "string", "autoIncrement": true, "primaryKey": true, "unique": true},
              "createdAt": {"type": "datetime", "default": "NOW"},
              "updatedAt": "~socket~parser~incoming~_sails~models~26~attributes~createdAt"
            },
            "identity": "user",
            "globalId": "User",
            "connection": ["someMongodbServer"],
            "schema": false,
            "tableName": "user"
          }]
        },
        "_startTime": "2017-11-28T22:03:29.987Z",
        "secret": "9baed8346f21ef54de3d019babf32fdc",
        "cookies": {
          "Lang": "en",
          "Theme": "LookOut",
          "User": "user10@businessinfact.es",
          "Webstorm-55192705": "726642fd-b8ce-4e77-a1e6-a31f65a6e3b7",
          "Gitblit": "dd94709528bb1c83d08f3088d4043f4742891f4f",
          "io": "XovFgi1rJQNydfLxAAAA",
          "dcjq-accordion": "19,28"
        },
        "signedCookies": {"sails.sid": "YXbglN6h4PObL3DrqFbqvHrLK30DB7mA"},
        "_parsedOriginalUrl": {
          "protocol": null,
          "slashes": null,
          "auth": null,
          "host": null,
          "port": null,
          "hostname": null,
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/Parentezco/5a1dd90d28dc627c4f778050",
          "path": "/Parentezco/5a1dd90d28dc627c4f778050",
          "href": "/Parentezco/5a1dd90d28dc627c4f778050",
          "_raw": "/Parentezco/5a1dd90d28dc627c4f778050"
        },
        "sessionStore": "~socket~parser~incoming~_sails~config~session~store",
        "sessionID": "YXbglN6h4PObL3DrqFbqvHrLK30DB7mA",
        "session": {"cookie": {"originalMaxAge": null, "expires": null, "httpOnly": true, "path": "/"}},
        "body": {},
        "originalMethod": "DELETE",
        "_route_index": 421,
        "route": {
          "path": "/parentezco/:id?",
          "method": "delete",
          "callbacks": [null],
          "keys": [{"name": "id", "optional": true}],
          "regexp": {},
          "params": []
        },
        "params": "~socket~parser~incoming~route~params",
        "options": {
          "associations": [{
            "alias": "antPatFamiliares",
            "type": "collection",
            "collection": "antpatfamiliar",
            "via": "parentezco"
          }, {"alias": "familiares", "type": "collection", "collection": "familiar", "via": "parentezco"}],
          "actions": true,
          "index": true,
          "shortcuts": true,
          "rest": true,
          "prefix": "",
          "restPrefix": "",
          "pluralize": false,
          "populate": true,
          "autoWatch": true,
          "model": "parentezco",
          "action": "destroy",
          "controller": "parentezco",
          "detectedVerb": {"verb": "all", "original": "/*", "path": "/*"},
          "skipRegex": [],
          "_middlewareType": "CSRF HOOK: CSRF"
        },
        "port": 1337,
        "baseUrl": "http://localhost:1337",
        "explicitlyAcceptsHTML": false,
        "wantsJSON": true,
        "languages": ["es"],
        "regions": ["es"],
        "language": "es",
        "region": "es",
        "locale": "es"
      },
      "outgoing": null,
      "maxHeaderPairs": 2000
    },
    "_paused": false,
    "_peername": {"address": "::1", "family": "IPv6", "port": 50469},
    "_consuming": true,
    "_httpMessage": "~"
  },
  "connection": "~socket",
  "_header": "HTTP/1.1 200 OK\r\nX-Powered-By: Sails <sailsjs.org>\r\nAccess-Control-Allow-Origin: \r\nAccess-Control-Allow-Credentials: \r\nAccess-Control-Allow-Methods: \r\nAccess-Control-Allow-Headers: \r\nAccess-Control-Expose-Headers: \r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 68\r\nETag: W/\"44-uBkU3+yC7I7Yj0rVyKOsUQ\"\r\nDate: Tue, 28 Nov 2017 22:03:30 GMT\r\nConnection: keep-alive\r\n\r\n",
  "_sent100": false,
  "_expect_continue": false,
  "req": "~socket~parser~incoming",
  "locale": "es",
  "charset": "utf-8",
  "statusCode": 200,
  "statusMessage": "OK"
};
