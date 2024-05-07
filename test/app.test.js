// const request = require('supertest');
// const app = require('../index'); // Assuming your Express app file is named app.js
// // const expect = require('chai').expect;
// const expect = import('chai').then(chai => chai.expect);


// describe('GET /', function() {
//   it('responds with status 200 and "this is index.js page"', function(done) {
//     request(app)
//       .get('/')
//       .expect(200)
//       .expect('this is index.js page', done);
//   });
// });

// describe('POST /login', function() {
//   it('responds with status 404 when user does not exist', function(done) {
//     request(app)
//       .post('/login')
//       .send({ username: 'nonexistentuser', password: 'invalidpassword' })
//       .expect(404)
//       .expect('Content-Type', /json/)
//       .expect({ message: "User doesn't exist" }, done);
//   });

//   // Add more test cases for other scenarios...
// });

// // Add test cases for other endpoints (/test, /current-level, /leaderboard)
// Assuming your Express app file is named app.js
const app = require('../index.js');
const request = require('supertest');
// const expect = require('chai').expect;
// const expect = import('chai').then(chai => chai.expect);

describe('GET /', function () {
    it('responds with status 200 and "this is index.js page"', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('this is index.js page', done);
    });
});
describe('POST /login', function () {
    it('responds with status 404 when user does not exist', function (done) {
        request(app)
            .post('/login')
            .send({ username: 'nonexistentuser', password: 'invalidpassword' })
            .expect(404)
            .expect('Content-Type', /json/)
            .expect({ message: "User doesn't exist" }, done);
    });
    });
    // Add more test cases for other endpoints...

    // Start the Express server on port 3001 for testing
    const server = app.listen(3001, () => {
        console.log('Testing server running on port 3001');
    });

    // Close the server after all tests are done
    after(function (done) {
        server.close(done);
    });


