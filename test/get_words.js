var Lab = require("lab"),
		Server = require('./servers/getSrv'),
    fixtures = require('./fixtures'),
    headers = require('./fixtures/headers')


Lab.experiment("Get Words", function() {
  var options = {},
      server,
      delay = 0

  Lab.before(function (done) {
    //don't drop previous inserted data
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

    Lab.test("Count words", function (done) {
    options.url = '/api/words/count'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      

      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Number
      Lab.expect(result.result).to.be.ok
      setTimeout(done, delay)
    
    })
  })

  
  
  Lab.test("All words", function (done) {
    options.url = '/api/words'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result.length).to.be.ok;
      Lab.expect(result.result[0].createdAt).not.to.be.ok

      setTimeout(done, delay)
    
    })
  })

  Lab.test("All words with limit", function (done) {
    options.url = '/api/words?limit=1'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).not.to.be.ok
      Lab.expect(result.result.length).to.equal(1)

      setTimeout(done, delay)
    
    })
  })

  Lab.test("All words extended", function (done) {
    options.url = '/api/words?extended=true'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      setTimeout(done, delay)
    
    })
  })

  Lab.test("All words extended and limit ", function (done) {
    options.url = '/api/words?extended=true&limit=2'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result

      
      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      Lab.expect(result.result.length).to.equal(2)
      setTimeout(done, delay)
    
    })
  })

  Lab.test("All words extended and limit and offset", function (done) {
    options.url = '/api/words?extended=true&limit=2&offset=1'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      

      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      Lab.expect(result.result.length).to.equal(2)
      Lab.expect(result.result[0].id).to.equal(2)
      setTimeout(done, delay)
    
    })
  })



  Lab.test("All words extended and limit  and order id DESC", function (done) {
    options.url = '/api/words?extended=true&limit=2&order=id DESC'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      

      Lab.expect(result).to.be.Object
      Lab.expect(result.result).to.be.Array
      Lab.expect(result.result[0].createdAt).to.be.ok
      Lab.expect(result.result.length).to.equal(2)
      Lab.expect(result.result[0].id).to.equal(2)
      setTimeout(done, delay)
    
    })
  })


  Lab.test("All words wrong order", function (done) {
    options.url = '/api/words?order=id AAAA'

    server.inject(options, function(response) {

      Lab.expect(response.statusCode).to.equal(400)    

      var result = response.result

      Lab.expect(result).to.be.Object
      
      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.validation).to.be.Object
      Lab.expect(result.validation.source).to.be.equal('query')
      Lab.expect(result.validation.keys).to.be.Array
      Lab.expect(result.validation.keys[0]).to.be.equal('order')

      setTimeout(done, delay)
    
    })
  })

})