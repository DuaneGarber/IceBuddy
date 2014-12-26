var assert = require('assert');
var async  = require('async');
var tester = require(process.cwd() + '/test/tester');

//
// Setup
//

// initialize the test object
var test = tester();

test.stash.home = {
    team_id : '123456789',
    players : ['123', '456'],
    score   : 3
  };

test.stash.away = {
    team_id : '987654321',
    players : ['789', '210'],
    score   : 2
  };

test.stash.seasonId = '999999';
test.stash.refs = ['321', '654'];

test.stash.game = {
  date : '2015-02-01',
  time : '10:30PM'
}
// Test set execution

test.execSet('Game', [
  add,
  search,
  retrieve,
  update,
  remove,
]);


//
// Tests
//

// Add
//
// expects - nothing
function add (stash, next) {
  describe('Adding a Game', function () {
    it('should store a Game into the db', function (done) {
      test.request.post({
        route : '/games',
        form  : {
          home : stash.home,
          away : stash.away,
          seasonId : stash.seasonId,
          refs : stash.refs,
          game : stash.game
        }
      }, function (response, body) {
        return next(null, done);
      });
    });
  });
}

// Search
//
// expects - game name
function search (stash, next) {
  describe('Search for a game', function () {
    it('should return a list of matching games', function (done) {
      test.request.get({
        route : '/games',
        qs    : { name : stash.name },
      }, function (response, body) {
        assert.notEqual(body.games.length, 0, 'No games found from the search');
console.log('Body === ', body)
        var game = body.games[0];
        assert.equal(game.name, stash.name);
        assert.equal(game.league, stash.league);

        stash.gameId =  game['_id'];

        return next(null, done);
      });
    });
  });
}


// Retrieve
//
// expects - gameId
function retrieve (stash, next) {
  describe('Retrieving a game', function () {
    it('should retrieve previously stored game', function (done) {
      test.request.get({
        route : '/games/' + stash.gameId,
      }, function (response, body) {
        console.log('Body === ', body)
        assert.equal(body.game.name, stash.name);
        assert.equal(body.game.league, stash.league);

        stash.gameId =  body.game['_id'];

        return next(null, done);
      });
    });
  });
}


// Update
//
// expects - gameId
function update (stash, next) {
  describe('Updating a game', function() {
    it('should update game name', function (done) {
      var newName = 'New Name ' + test.seed;
      test.request.put({
        route : '/games/' + stash.gameId,
        form  : {
          name : newName
        }
      }, function (response, body) {
        assert.equal(body.game.name, newName);

        return next(null, done);
      });
    });
  });
}


// Remove
//
// expects - gameId
function remove (stash, next) {
  describe('Deleting a game', function () {
    it('delete the created game', function (done) {
      test.request.del({
          route : '/games/' + stash.gameId,
        }, function (response, body) {
          assert.equal(body.success, true);
          return next(null, done);
        })
    });
  });
}

// function addGameToGame (stash, next) {
//   describe('Create a game', function () {
//     it('creating a game', function (done) {

//       test.request.post({
//       route : '/games',
//       form  : {
//           name : {
//             first : 'John',
//             last  : test.seed
//           },
//             preferred_number : 15,
//           }
//         }, function (response, body) {
//           test.stash.testGame = body.game;
//           //Go to next Describe
//           return done();
//         }
//       );
//     });
//   });
//   describe('Add the game to the game', function () {
//     it('add game to the created game object', function (done) {
//       test.request.put({
//         route : '/games/' + stash.gameId + '/roster',
//         form  : { ids : [test.stash.testGame._id] },
//       }, function (response, body) {
//         assert.equal(body.game.games.length, 1);
//         assert.equal(body.game.games[0], test.stash.testGame._id);
//         //Go to next Describe
//         return done();
//       });
//     });
//   });
//   describe('Retrieve the game from the game', function () {
//     it('retrieve rostered game', function (done) {
//       test.request.get({
//         route : '/games/' + stash.gameId + '/roster'
//       }, function (response, body) {
//         assert.equal(body.game.games.length, 1);
//         assert.equal(body.game.games[0], test.stash.testGame._id);
//         //Go to next Describe
//         return done();
//       });
//     });
//   });
//   describe('Remove the game from the game', function () {
//     it('remove game from game', function (done) {
//       test.request.del({
//         route : '/games/' + stash.gameId + '/roster',
//         form  : { ids : [test.stash.testGame._id] }
//       }, function (response, body) {
//         assert.equal(body.game.games.length, 0);
//         //Go to next Describe
//         return next(null, done);
//       });
//     });
//   });

// }