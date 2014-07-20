var Hapi = require('hapi'),
		server,
		options





module.exports = (function(){
	if(server){
		return {
			options : options,
		  server: server 
		}
	}

	options = [
			{
				'plugin': require('../../plugins/hapi-sequelize'),
				'options' : {
	    		'dialect': 'sqlite',
	    		"storage":  __dirname + '/../databases/LeBrisou.sqlite',
	    		"logging": false,//console.log
	    	}
			},
	    {
	    	'plugin': require('../../plugins/dictionary-rdbms'),
	    	"options" : {
					"drop": false,
					'sync': {'force': true }
				}
			},
	    {
	    	'plugin': require('../../plugins/dictionary-api'),
			},
			{
	    	'plugin': require('../../plugins/dictionary-error'),
			},
	  ]

	
	function getServer(){
		if(server){
			return server
		}
		server = new Hapi.Server('localhost', 8001);

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
		options : options,
	  getServer: getServer 
	}
		
}())