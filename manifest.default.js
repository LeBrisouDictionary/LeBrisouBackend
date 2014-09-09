var fs = require('fs')

var domain = 'localhost'

module.exports = {
  pack: {
    cache: {
      engine: require('catbox-memory')
      // engine: require('catbox-redis'),
      // partition: 'LeBrisouBackend',
      // host: '192.168.1.14',
      // port: 6379
    }
  },
  servers: [{
      port: process.env.PORT,
      // host : dic.local,
      options: {
        // tls: {
        //   key: fs.readFileSync( __dirname + /plugins/dictionary-api/cert/+domain+.key),
        //   cert: fs.readFileSync(__dirname + /plugins/dictionary-api/cert/+domain+.crt)
        // },
        labels: 'dictionary-api',
        cors: true,
        debug: {
          request: ['error', 'uncaught', 'log']
        }
      }
    }
    /*, {
    port: 8080,
    options: {
      labels: 'dictionary-web',
    }
  }*/
  ],
  plugins: {
    '../../../node_modules/good': [{
      options: {
        extendedRequests: true,
        // requestsEvent: response,
        subscribers: {
          console: ['request', 'log', 'error'],
          'logs/requests.log': ['request'],
          'logs/errors.log': ['error'],
          'logs/log.log': ['log'],
          'logs/ops.log': ['ops'],
        }
      }
    }],
    '../../../node_modules/lout': {
      endpoint: '/docs'
    },
    '../../../node_modules/tv': {
      endpoint: '/debug/console',
      queryKey: 'debug'
    },
    '../../../plugins/hapi-sequelize': [{
      options: {
        dialect: 'sqlite', // or sqlite, postgres, mariadb
        //port:    5432, // or 5432 (for postgres)
        storage: __dirname + '/plugins/dictionary-rdbms/LeBrisou.sqlite',
        sync: {
          force: true
        },
        logging: console.log,
        maxConcurrentQueries: 1,
        native: true,
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
        pool: {
          maxConnections: 1,
          maxIdleTime: 30
        }, //currently useless for sqlite maybe in another version
      },
      select: ['dictionary-api']
    }],
    '../../../plugins/dictionary-rdbms': [{
      options: {
        drop: false,
        sync: {
          force: true
        }
      },
      select: ['dictionary-api']
    }],
    '../../../plugins/dictionary-api': [{
      select: ['dictionary-api'],
      route: {
        prefix: '/api',
        //vhost : dic.local
      }
    }],
    '../../../plugins/dictionary-web': [{
      options: {
        sitename: 'LeBrisouBackend',
        author: 'Amaury Brisou'
      },
      select: ['dictionary-web']
    }],
    '../../../plugins/dictionary-parser': [{
      options: {
        inject: false,
        sheets: ['AB', 'C', 'D'],
        input: __dirname + '/assets/input/dictionary_database.xlsx',
        output: __dirname + '/assets/output/excel_dump.json'
      },
      select: ['dictionary-api']
    }],
    '../../../plugins/dictionary-error': [{
      options: {
        source: "LeBrisouBackend"
      }
    }],
  }
}