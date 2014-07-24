var Lab = require("lab"),
  Server = require('./servers/insertSrv'),
  fixtures = require('./fixtures'),
  headers = require('./fixtures/headers')


Lab.experiment("Delete Word", function () {
  var options = {},
    server,
    delay = 0

  Lab.before(function (done) {
    //switch to 2k word DB
    Server.options[1].options.drop = false
    server = new Server.getServer()


    // Wait 1 second
    setTimeout(function () {
      done()
    }, 1000)
  })

  Lab.beforeEach(function (done) {
    options = {
      method: 'DELETE',
      url: '/api'
    }
    options.headers = headers
    done()
  })




  Lab.test("No such Id", function (done) {

    options.payload = {
      id: 20000
    }

    console.log(options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(20009)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('No Such Id')

      setTimeout(done, delay)

    })
  })

})