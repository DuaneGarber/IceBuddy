var Err  = require(process.cwd() + '/api/lib/error').errorGenerator;
var Mongoman = require(process.cwd() + '/api/lib/mongoman');

var Team = Mongoman.model('team');

module.exports = function accountController (api) {
  return {

    //
    // Create
    //
    create : function (req, res, next) {
      Mongoman.save('team', req.body, next, function () {

        res.data = {
          success : true,
          message : 'Team ' + inputs.name + ' created'
        }

        return next();
      });
    },


    //
    // Read
    //
    read : function (req, res, next) {
      res.data = {
        success: true
      };
      return next();
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