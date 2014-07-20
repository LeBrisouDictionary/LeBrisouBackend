var Lab = require("lab"),
		Server = require('./servers/getSrv'),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Get Word", function() {
  var options = {},
      server,
      delay = 0

  Lab.before(function (done) {
    //switch to 2k word DB
    server = new Server.getServer()

    options.method = 'GET'
    options.headers = headers
    // Wait 1 second
    setTimeout(function () { done() }, 1000)
  })

  Lab.beforeEach(function (done) {
    options = {}
    options.headers = headers
    done()
  })



    
  Lab.test("missing params", function (done) {
    options.url = '/api/word'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.null


      setTimeout(done, delay)
    
    })
  })

  Lab.test("word by id", function (done) {
    options.url = '/api/word?id=1'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
     
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result[0].id).to.be.equal(1)

      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by id and extended", function (done) {
    options.url = '/api/word?id=1&extended=true'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      Lab.expect(result.result[0].id).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema", function (done) {
    options.url = '/api/word?lema=a'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and gerund", function (done) {
    options.url = '/api/word?lema=abanderar&gerund=abanderando'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and partial gerund", function (done) {
    options.url = '/api/word?lema=abanderar&gerund=abander%'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and participle", function (done) {
    options.url = '/api/word?lema=abanderar&participle=abanderado'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and partial participle", function (done) {
    options.url = '/api/word?lema=abanderar&participle=%bandera%'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and pos", function (done) {
    options.url = '/api/word?lema=abanderar&pos=vt'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("Word by lema and totally partial pos", function (done) {
    options.url = '/api/word?lema=abanderar&pos=%'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

   Lab.test("Word by lema and participle and gerund and pos", function (done) {
    options.url = '/api/word?lema=abanderar&pos=vt&gerund=abanderando&participle=abanderado'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.be.equal(1)
      setTimeout(done, delay)
    
    })
  })

})