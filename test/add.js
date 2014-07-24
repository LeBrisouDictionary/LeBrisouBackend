var Lab = require("lab"),
  Server = require("./servers/insertSrv"),
  fixtures = require('./fixtures'),
  headers = require('./fixtures/headers')


Lab.experiment("Add", function () {
  var options = {},
    server,
    delay = 0

  Lab.before(function (done) {
    server = new Server.getServer()

    options.headers = headers
    // Wait 1 second
    setTimeout(function () {
      done()
    }, 1000)
  })

  Lab.beforeEach(function (done) {
    options = {}
    options.headers = headers
    done()
  })


  Lab.test("Ensure Correct word insertion without optional params", function (done) {
    options = fixtures.load('add/success-partial', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result


      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)

    })
  })



  Lab.test("Ensure Correct word insertion with all params", function (done) {
    options = fixtures.load('add/success', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result
      var payload = options.payload

      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)

    })
  })

  Lab.test("Ensure Correct word insertion without optional params 2", function (done) {
    options = fixtures.load('add/success-partial-2', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(200)

      var result = response.result


      Lab.expect(result.success).to.be.true
      setTimeout(done, delay)

    })
  })

  Lab.test("Raise duplicate word", function (done) {
    options = fixtures.load('add/success', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(20053)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Word already exists')
      setTimeout(done, delay)

    })
  })

  Lab.test("Raise wrong gerund pattern", function (done) {
    options = fixtures.load('add/wrong-gerund', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(400)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      setTimeout(done, delay)

    })
  })



  Lab.test("Raise Unknow Language", function (done) {
    options = fixtures.load('add/unknow-language', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20001)

      var result = response.result

      Lab.expect(result.message).to.equal("Unknown Language")

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise Unknow Country", function (done) {
    options = fixtures.load('add/unknow-country', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20003)

      var result = response.result

      Lab.expect(result.message).to.equal("Unknown Country")

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise duplicate hyperlink", function (done) {
    options = fixtures.load('add/duplicate-hyperlink', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20056)

      var result = response.result
      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Hyperlink already exists')
      setTimeout(done, delay)

    })
  })

  Lab.test("Raise duplicate definition", function (done) {
    options = fixtures.load('add/duplicate-definition', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20054)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Definition already exists')

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise duplicate example", function (done) {
    options = fixtures.load('add/duplicate-example', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20055)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Example already exists')

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise unknow synonym", function (done) {
    options = fixtures.load('add/unknow-synonym', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20004)

      var result = response.result


      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Unknown Synonym')

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise word equal synonym", function (done) {
    options = fixtures.load('add/word-equal-synonym', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(20050)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Conflict : SynonymId equal WordId')
      setTimeout(done, delay)

    })
  })

  Lab.test("Raise unknow antonym", function (done) {
    options = fixtures.load('add/unknow-antonym', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20005)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Unknown Antonym')

      setTimeout(done, delay)

    })
  })

  Lab.test("Raise word equal antonym", function (done) {
    options = fixtures.load('add/word-equal-antonym', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(20051)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Conflict : AntonymId equal WordId')
      setTimeout(done, delay)

    })
  })

  Lab.test("Raise unknow relative", function (done) {
    options = fixtures.load('add/unknow-relative', options)

    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(20007)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Unknown Relative')


      setTimeout(done, delay)

    })
  })

  Lab.test("Raise word equal relative", function (done) {
    options = fixtures.load('add/word-equal-relative', options)

    server.inject(options, function (response) {

      Lab.expect(response.statusCode).to.equal(20052)

      var result = response.result

      Lab.expect(result.error).to.be.equal('Bad Request')
      Lab.expect(result.message).to.be.equal('Conflict : RelativeId equal WordId')
      setTimeout(done, delay)

    })
  })


  Lab.test("Raise unknow field", function (done) {
    options.method = "PUT",
    options.url = '/api',
    options.payload = {
      word: "bonjour",
    }


    server.inject(options, function (response) {


      Lab.expect(response.statusCode).to.equal(400)

      var result = response.result

      setTimeout(done, delay)

    })
  })


})