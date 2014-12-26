var Err  = require(process.cwd() + '/api/lib/error').errorGenerator;
var Mongoman = require(process.cwd() + '/api/lib/mongoman');
var Joi      = require('joi');
var validate = require(process.cwd() + '/api/lib/validate');

var Game = Mongoman.model('game');

module.exports = function accountController (api) {
  return {

    //
    // Create
    //
    create : function (req, res, next) {
      var inputs = req.body;
      validate(inputs, {
        home     : Joi.object().keys({
          team_id : Joi.string().token().required(),
          players : Joi.array().optional().includes(Joi.token()),
          score   : Joi.number().integer()
        }),
        away     : Joi.object().keys({
          team_id : Joi.string().token().required(),
          players : Joi.array().optional().includes(Joi.token()),
          score   : Joi.number().integer()
        }),
        season_id : Joi.string().token().required(),
        refs : Joi.array().optional(),
        game     : Joi.object().keys({
          date : Joi.date().iso().required(),
          time : Joi.string().required()
        })
      }, function save (result, callback) {
        Mongoman.save('game', req.body, next, function ( game ) {
          res.data = {
            success : true,
            game  : game,
            message : 'Game ' + inputs.name + ' created'
          };
          return callback();
        });
      }, next);
    },


    //
    // Read
    //
    read : function (req, res, next) {
      var inputs = req.query;

      // take a game array and build the response body
      function getResult (games) {
        var success = !!(games && games.length);
        return {
          success : success,
          message : !success ? 'No games found' : undefined,
          games : games || []
        };
      }

      // if the client performed a search
      if (Object.keys(req.query).length) {
        validate(inputs, {}, function (result, callback) {
          Game.find(inputs, function (error, games) {
            res.data = getResult(games)
            return callback();
          });
        }, next);

      // otherwise, return the last 10 registered
      } else {
        Game.find({
          created : {
            $lte : new Date()
          }
        }).limit(10).exec(function (error, games) {
          res.data = getResult(games)
          return next();
        });
      }
    },


    //
    // Update
    //
    update : function (req, res, next) {
      return next();
    },


    //
    // Destroy
    //
    destroy : function (req, res, next) {
      return next();
    }
  };
}