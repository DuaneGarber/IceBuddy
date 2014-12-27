var Err      = require(process.cwd() + '/api/lib/error').errorGenerator;
var Mongoman = require(process.cwd() + '/api/lib/mongoman');
var Joi      = require('joi');
var validate = require(process.cwd() + '/api/lib/validate');

var Game = Mongoman.model('game');

module.exports = function accountController (api) {
  return {

//
    // Read
    //
    read : function (req, res, next) {
      Game.findOne({
        '_id' : req.params.gameId
        }, function (error, game){
          if (game) {
            res.data = {
              success : true,
              game  : game
            };
            return next();
          } else {
            return next(Err.notFound('No game matches the provided ID'));
          }
      });
    },


    //
    // Update
    //
    update : function (req, res, next) {
      var inputs = req.body;
      Game.findOneAndUpdate({
        _id : req.params.gameId
      }, inputs, function (error, game) {
        if (game) {
          res.data = {
            success : true,
            game  : game
          };
          return next();
        } else {
          return next(Err.notFound('No game matches the provided ID'));
        }
      })
    },


    //
    // Destroy
    //
    destroy : function (req, res, next) {
      Game.findOneAndRemove({
        _id : req.params.gameId
      }, function (error, game){
        if (game) {
          res.data = {
            success : true,
            game  : game
          };
          return next();
        } else {
          return next(Err.notFound('No game matches the provided ID'));
        }
      });
    }
  };
}