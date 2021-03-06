var Err      = require(process.cwd() + '/api/lib/error').errorGenerator;
var Mon      = require('mongoman');
var Joi      = require('joi');
var validate = require(process.cwd() + '/api/lib/validate');

var Stat = Mon.model('stat');

module.exports = function accountController (api) {
  return {

    //
    // Create
    //
    create : function (req, res, next) {
      var inputs = req.body;
      Stat.create(inputs, function ( error, data ) {
        if ( error ) {
          return next(error);
        } else {
          res.data = {
              success : true,
              stat  : data || null
          }
          return next();
        }
      });
    },


    //
    // Read
    //
    read : function (req, res, next) {
      var inputs = req.query;

      var responseData = {};
      // if the client performed a search
      if (Object.keys(req.query).length) {
        validate(inputs, {
          player_id  : Joi.string().token().optional(),
          game_id    : Joi.string().token().optional(),
          season_id  : Joi.string().token().optional(),
        }, function (result, callback) {
          if ( inputs.player_id ) {
            if ( inputs.game_id ) {
              Stat.findByPlayerIdGameId(inputs, function ( error, data ) {
                return callback(error, data);
              });
            } else if( inputs.season_id ) {
              Stat.findByPlayerIdSeasonId(inputs, function ( error, data ) {
                return callback(error, data);
              });
            } else {
              Stat.findByPlayerId(inputs, function ( error, data ) {
                return callback(error, data);
              });
            }
          } else if( inputs.game_id ) {
            Stat.findByGameId(inputs, function ( error, data ) {
              return callback(error, data);
            });
          } else if( inputs.season_id ) {
            Stat.findBySeasonId(inputs, function ( error, data ) {
              return callback(error, data);
            });
          } else {
            return callback(Err('Stat search must include a Player Id, Game Id, OR Season Id'))
          }


        }, function (error, data){
          if ( error ) {
            return next(error);
          } else {
            res.data = {
                success : true,
                stats  : data || []
            }

            return next();
          }
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