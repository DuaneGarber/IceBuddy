var regexSet = require(process.cwd() + '/api/lib/validate').regex;
var Mongoman = require(process.cwd() + '/api/lib/mongoman');

module.exports = Mongoman.register('game', {
  home: {
    team_id: Mongoman('Home Team Id').string().required().fin(),
    players: Mongoman('Home Team Players').array().default([]).fin(),
    score  : Mongoman('Home Team score').string().required().fin()
  },
  away: {
    team_id: Mongoman('Away Team Id').string().required().fin(),
    players: Mongoman('Away Team Players').array().default([]).fin(),
    score  : Mongoman('Away Team score').number().required().fin()
  },
  //This the season id this game belongs to
  season_id : Mongoman('Season Id').string().required().fin(),
  //Array of ref ids
  refs : Mongoman('Referees').array().default([]).fin(),
  game :  {
    date:  Mongoman('Game Date').date().required().fin(),
    time : Mongoman('Game time').string().required().fin()
  }

});