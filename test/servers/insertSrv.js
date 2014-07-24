var Hapi = require('hapi'),
  server,
  options





module.exports = (function () {
  if (server) {
    return {
      options: options,
      server: server
    }
  }

  options = [{
    'plugin': require('../../plugins/hapi-sequelize'),
    'options': {
      'dialect': 'sqlite',
      "storage": __dirname + '/../databases/test.sqlite',
      "logging": console.log,
      define: {
        underscored: false,
        freezeTableName: false,
        syncOnAssociation: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        // classMethods: {method1: function() {}},
        // instanceMethods: {method2: function() {}},
        timestamps: false
      },
    }
  }, {
    'plugin': require('../../plugins/dictionary-rdbms'),
    "options": {
      "drop": true,
      'sync': {
        'force': true
      }
    }
  }, {
    'plugin': require('../../plugins/dictionary-api'),
  }, {
    'plugin': require('../../plugins/dictionary-error'),
  }, ]


  function getServer() {
    if (server) {
      server.stop()
    }
    server = new Hapi.Server('localhost', 8000, {
      debug: {
        request: ['error']
      }
    });

    server.pack.register(options, {
      'route': {
        'prefix': '/api'
      }
    }, function (err) {
      if (err) {
        console.log('Failed loading plugin');
      }
    });

    return server
  }

  return {
    options: options,
    getServer: getServer
  }

}())