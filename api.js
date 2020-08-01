//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express');

// Nous définissons ici les paramètres du serveur.
var hostname = 'lif.sci-web.net';
var port = 3000;

var myRouter = express.Router();


// Nous créons un objet de type Express.
var app = express();

// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose');

var uri = "mongodb+srv://dryisf:lifprojet@lifprojet-nba-datas-qpyjn.mongodb.net/nba-datas?authSource=admin&replicaSet=Lifprojet-NBA-Datas-shard-0&readPreference=primary&ssl=true";

mongoose.connect(uri, {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});

////////////////////////// EQUIPES //////////////////////////
var teamSchema = mongoose.Schema({
  id: String,
  abbreviation: String,
  city: String,
  conference: String,
  division: String,
  full_name: String,
  name: String
});

var Team = mongoose.model('Team', teamSchema);

myRouter.route('/teams')
  .get(function (req, res) {
    Team.find(function (err, teams) {
      if (err) {
        res.send(err);
      }
      res.json(teams);

    });
  })
  .post(function (req, res) {
    var team = new Team();

    team.id = req.body.id;
    team.abbreviation = req.body.abbreviation;
    team.city = req.body.city;
    team.conference = req.body.conference;
    team.division = req.body.division;
    team.full_name = req.body.full_name;
    team.name = req.body.name;

    team.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Bravo, la team est maintenant stockée en base de données'
      });
    })
  });

myRouter.route('/teams/:team_id')
  .get(function (req, res) {
    Team.findOne({
      id: req.params.team_id
    }, function (err, team) {
      if (err)
        res.send(err);
      res.json(team);
    });
  })

//////////////////// JOUEURS ///////////////////////////
var playerSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  position: String,
  height_feet: String,
  height_inches: String,
  weight_pounds: String,
  team: teamSchema,
});

var Player = mongoose.model('Player', playerSchema);

myRouter.route('/players')
  .get(function (req, res) {
    Player.find(function (err, players) {
      if (err) {
        res.send(err);
      }
      res.json(players);

    });
  })
  .post(function (req, res) {
    var player = new Player();

    player.id = req.body.id;
    player.first_name = req.body.first_name;
    player.last_name = req.body.last_name;
    player.position = req.body.position;
    player.height_feet = req.body.height_feet;
    player.height_inches = req.body.height_inches;
    player.weight_pounds = req.body.weight_pounds;
    player.team = req.body.team;

    player.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Bravo, le joueur est maintenant stocké en base de données'
      });
    })
  });

myRouter.route('/players/:player_id')
  .get(function (req, res) {
    Player.findOne({
      id: req.params.player_id
    }, function (err, player) {
      if (err)
        res.send(err);
      res.json(player);
    });
  })

myRouter.route('/players/team/:team_id')
  .get(function (req, res) {
    Player.find({
      "team.id": req.params.team_id
    }, function (err, player) {
      if (err)
        res.send(err);
      res.json(player);
    });
  })

//////////////////////////////////MATCHS////////////////////////////////////
var gameSchema = mongoose.Schema({
  id: String,
  date: String,
  home_team_score: String,
  visitor_team_score: String,
  season: String,
  period: String,
  status: String,
  time: String,
  postseason: String,
  home_team: teamSchema,
  visitor_team: teamSchema
});

var Game = mongoose.model('Game', gameSchema);

myRouter.route('/games')
  .get(function (req, res) {
    Game.find(function (err, games) {
      if (err) {
        res.send(err);
      }
      res.json(games);

    });
  })
  .post(function (req, res) {
    var game = new Game();

    game.id = req.body.id;
    game.date = req.body.date;
    game.home_team_score = req.body.home_team_score;
    game.visitor_team_score = req.body.visitor_team_score;
    game.season = req.body.season;
    game.period = req.body.period;
    game.status = req.body.status;
    game.time = req.body.time;
    game.postseason = req.body.postseason;
    game.home_team = req.body.home_team;
    game.visitor_team = req.body.visitor_team;

    game.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Bravo, le match est maintenant stocké en base de données'
      });
    })
  });

myRouter.route('/games/:game_id')
  .get(function (req, res) {
    Game.findOne({
      id: req.params.game_id
    }, function (err, game) {
      if (err)
        res.send(err);
      res.json(game);
    });
  })

myRouter.route('/games/team/:team_id')
  .get(function (req, res) {
    Game.find({
      $or: [{
        "home_team.id": req.params.team_id
      }, {
        "visitor_team.id": req.params.team_id
      }]
    }, function (err, game) {
      if (err)
        res.send(err);
      res.json(game);
    });
  })

//////////////////////////////////SEASON AVERAGES////////////////////////////////////
var seasonAverageSchema = mongoose.Schema({
  games_played: String,
  player_id: String,
  season: String,
  min: String,
  fgm: String,
  fga: String,
  fg3m: String,
  fg3a: String,
  ftm: String,
  fta: String,
  oreb: String,
  dreb: String,
  reb: String,
  ast: String,
  stl: String,
  blk: String,
  turnover: String,
  pf: String,
  pts: String,
  fg_pct: String,
  fg3_pct: String,
  ft_pct: String
});

var SeasonAverage = mongoose.model('SeasonAverage', seasonAverageSchema);

myRouter.route('/season_averages')
  .get(function (req, res) {
    SeasonAverage.find(function (err, seasonAverages) {
      if (err) {
        res.send(err);
      }
      res.json(seasonAverages);

    });
  })
  .post(function (req, res) {
    var seasonAverage = new SeasonAverage();

    seasonAverage.games_played = req.body.games_played;
    seasonAverage.player_id = req.body.player_id;
    seasonAverage.season = req.body.season;
    seasonAverage.min = req.body.min;
    seasonAverage.fgm = req.body.fgm;
    seasonAverage.fga = req.body.fga;
    seasonAverage.fg3m = req.body.fg3m;
    seasonAverage.fg3a = req.body.fg3a;
    seasonAverage.ftm = req.body.ftm;
    seasonAverage.fta = req.body.fta;
    seasonAverage.oreb = req.body.oreb;
    seasonAverage.dreb = req.body.dreb;
    seasonAverage.reb = req.body.reb;
    seasonAverage.ast = req.body.ast;
    seasonAverage.stl = req.body.stl;
    seasonAverage.blk = req.body.blk;
    seasonAverage.turnover = req.body.turnover;
    seasonAverage.pf = req.body.pf;
    seasonAverage.pts = req.body.pts;
    seasonAverage.fg_pct = req.body.fg_pct;
    seasonAverage.fg3_pct = req.body.fg3_pct;
    seasonAverage.ft_pct = req.body.ft_pct;

    seasonAverage.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Bravo, ces moyennes sont maintenant stockées en base de données'
      });
    })
  });

myRouter.route('/season_averages/:player_id')
  .get(function (req, res) {
    SeasonAverage.find({
      player_id: req.params.player_id
    }, function (err, seasonAverage) {
      if (err)
        res.send(err);
      res.json(seasonAverage);
    });
  })

myRouter.route('/season_averages/:player_id/:season_nb')
  .get(function (req, res) {
    SeasonAverage.findOne({
      $and: [{
        player_id: req.params.player_id
      }, {
        season: req.params.season_nb
      }]
    }, function (err, seasonAverage) {
      if (err)
        res.send(err);
      res.json(seasonAverage);
    });
  })

//////////////////////////////////STATS PAR MATCH POUR UN JOUEUR////////////////////////////////////
var statSchema = mongoose.Schema({
  id: String,
  ast: String,
  blk: String,
  dreb: String,
  fg3_pct: String,
  fg3a: String,
  fg3m: String,
  fg_pct: String,
  fga: String,
  fgm: String,
  ft_pct: String,
  fta: String,
  ftm: String,
  game: gameSchema,
  min: String,
  oreb: String,
  pf: String,
  player: playerSchema,
  pts: String,
  reb: String,
  stl: String,
  team: teamSchema,
  turnover: String
});

var Stat = mongoose.model('Stat', statSchema);

myRouter.route('/stats')
  .get(function (req, res) {
    Stat.find(function (err, stats) {
      if (err) {
        res.send(err);
      }
      res.json(stats);

    });
  })
  .post(function (req, res) {
    var stat = new Stat();

    stat.id = req.body.id;
    stat.ast = req.body.ast;
    stat.blk = req.body.blk;
    stat.dreb = req.body.dreb;
    stat.fg3_pct = req.body.fg3_pct;
    stat.fga = req.body.fga;
    stat.fg3m = req.body.fg3m;
    stat.fg_pct = req.body.fg_pct;
    stat.fga = req.body.fga;
    stat.fgm = req.body.fgm;
    stat.ft_pct = req.body.ft_pct;
    stat.fta = req.body.fta;
    stat.ftm = req.body.ftm;
    stat.game = req.body.game;
    stat.min = req.body.min;
    stat.oreb = req.body.oreb;
    stat.pf = req.body.pf;
    stat.player = req.body.player;
    stat.pts = req.body.pts;
    stat.reb = req.body.reb;
    stat.stl = req.body.stl;
    stat.team = req.body.team;
    stat.turnover = req.body.turnover;

    stat.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({
        message: 'Bravo, ces stats sont maintenant stockées en base de données'
      });
    })
  });

myRouter.route('/stats/:player_id')
  .get(function (req, res) {
    Stat.find({
      "player.id": req.params.player_id
    }, function (err, stat) {
      if (err)
        res.send(err);
      res.json(stat);
    });
  })

myRouter.route('/stats/:player_id/:game_id')
  .get(function (req, res) {
    Stat.find({
      $and: [{
        "player.id": req.params.player_id
      }, {
        "game.id": req.params.game_id
      }]
    }, function (err, stat) {
      if (err)
        res.send(err);
      res.json(stat);
    });
  })

myRouter.route('/stats/:stat_id')
  .delete(function (req, res) {

    Stat.remove({
      id: req.params.stat_id
    }, function (err, stat) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Bravo, stat supprimée"
      });
    });

  });

////////////////////////LANCEMENT DU SERVEUR//////////////////////////////////

var bodyParser = require("body-parser");
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(myRouter);
app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});


////////////////////////SCRIPTS DE RECUPERATION DES DONNEES/////////////////


/*Script de récupération des équipes
axios.get('https://www.balldontlie.io/api/v1/teams').then(response => {
    const teams = response.data.data;
    for (let i = 0; i < teams.length; i++) {
      const data = teams[i];
      new Team({
        id: data.id,
        abbreviation: data.abbreviation,
        city: data.city,
        conference: data.conference,
        division: data.division,
        full_name: data.full_name,
        name: data.name
      })
      .save(function (error) {
        if (error)
          console.log("ERREUR LORS DE LA SAUVEGARDE D'UNE EQUIPE :", error);
      });
    }

    console.log("Toutes les équipes ont été sauvegardées !");

  })
  .catch((error) => {
    console.log('ERREUR LORS DE LA RECUPERATION DES EQUIPES : \n \n', error);

  });*/

//Script de récupération des joueurs
/*axios.get('https://www.balldontlie.io/api/v1/players?per_page=100').then(response => {
  let total = response.data.meta.total_pages;
  let req = [];
  let url = 'https://www.balldontlie.io/api/v1/players?per_page=100&page=';
  for (let i = 1; i <= total; i++) {
    req.push(axios.get(url + i));
  }

  axios.all(req).then(axios.spread((...responses) => {
    for (let i = 0; i < responses.length; i++) {
      let jsonPlayers = responses[i].data.data;

      for (let j = 0; j < jsonPlayers.length; j++) {
        let data = jsonPlayers[j];

        if(data.position !== ''){ //Les joueurs n'ayant pas de poste (position) sont retraités, ici nous ne récupérons que les joueurs actifs
          new Player({
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              position: data.position,
              height_feet: data.height_feet,
              height_inches: data.height_inches,
              weight_pounds: data.weight_pounds,
              team: data.team,
            })
            .save(function (error) {
              if (error)
                console.log("ERREUR LORS DE LA SAUVEGARDE D'UN JOUEUR :", error);
            });
        }
      }
    }
    console.log("Tous les joueurs ont été sauvegardés !");
  }))
  .catch((error) => {
    console.log('ERREUR LORS DE LA RECUPERATION DES JOUEURS : \n \n ', error);

  });

});*/

//Script de récupération des matchs de la saison en cours (2019-2020)
/*axios.get('https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2019').then(response => {
  let total = response.data.meta.total_pages;
  let req = [];
  let url = 'https://www.balldontlie.io/api/v1/games?per_page=100&seasons[]=2019&page=';
  for (let i = 1; i <= total; i++) {
    req.push(axios.get(url + i));
    //setDelay(i, url, req);

  }

  axios.all(req).then(axios.spread((...responses) => {
    for (let i = 0; i < responses.length; i++) {
      let jsonGames = responses[i].data.data;

      for (let j = 0; j < jsonGames.length; j++) {
        let data = jsonGames[j];

        new Game({
            id: data.id,
            date: data.date,
            home_team_score: data.home_team_score,
            visitor_team_score: data.visitor_team_score,
            season: data.season,
            period: data.period,
            status: data.status,
            time: data.time,
            postseason: data.postseason,
            home_team: data.home_team,
            visitor_team: data.visitor_team
          })
          .save(function (error) {
            if (error)
              console.log("ERREUR LORS DE LA SAUVEGARDE D'UN MATCH :", error);
          });
      }
    }
    console.log("Tous les matchs ont été sauvegardés !");
  }))
  .catch((error) => {
    console.log('ERREUR LORS DE LA SAUVEGARDE DES MATCHS : \n \n', error);
  });

});*/

//Script des récupérations des stats moyennes pour chaque joueur
/*axios.get('http://localhost:3000/players').then(response => {
  let players = response.data;
  let req = [];
  let url = 'https://www.balldontlie.io/api/v1/season_averages?season=2015&player_ids[]=';
  for(let i = 720; i < 733; i++){
    req.push(axios.get(url+players[i].id));
  }

    axios.all(req).then(axios.spread((... responses) => {
      for (let j = 0; j < responses.length; j++) {
        let seasonAvg = responses[j].data.data[0];

        if (typeof seasonAvg != 'undefined'){
          if (seasonAvg.length != 0) {
            new SeasonAverage({
              games_played: seasonAvg.games_played,
              player_id: seasonAvg.player_id,
              season: seasonAvg.season,
              min: seasonAvg.min,
              fgm: seasonAvg.fgm,
              fga: seasonAvg.fga,
              fg3m: seasonAvg.fg3m,
              fg3a: seasonAvg.fg3a,
              ftm: seasonAvg.ftm,
              fta: seasonAvg.fta,
              oreb: seasonAvg.oreb,
              dreb: seasonAvg.dreb,
              reb: seasonAvg.reb,
              ast: seasonAvg.ast,
              stl: seasonAvg.stl,
              blk: seasonAvg.blk,
              turnover: seasonAvg.turnover,
              pf: seasonAvg.pf,
              pts: seasonAvg.pts,
              fg_pct: seasonAvg.fg_pct,
              fg3_pct: seasonAvg.fg3_pct,
              ft_pct: seasonAvg.ft_pct
            })
              .save(function (error) {
                if (error)
                  console.log("ERREUR LORS DE LA SAUVEGARDE D'UNE MOYENNE :", error);
              });
          }
        }
      }
    }))

}).catch((error) => {console.log('erreur :', error);
});*/

//Script des récupérations des stats sur plusieurs matchs pour chaque joueur
/*axios.get('http://localhost:3000/players').then(response => {
  let players = response.data;
  let req = [];
  let url = 'https://www.balldontlie.io/api/v1/stats?seasons[]=2019&per_page=100&player_ids[]=';
  for (let i = 720; i < 733; i++) { // TESTER 120 à 180
    req.push(axios.get(url + players[i].id));
  }

  axios.all(req).then(axios.spread((...responses) => {
    for (let j = 0; j < responses.length; j++) {
      let jsonStats = responses[j].data.data;

      for(let k = 0; k < jsonStats.length; k++){
        let stat = jsonStats[k];

        if (typeof stat != 'undefined') {
          if (stat.length != 0) {
            new Stat({
              id: stat.id,
              ast: stat.ast,
              blk: stat.blk,
              dreb: stat.dreb,
              fg3_pct: stat.fg3_pct,
              fg3a: stat.fg3a,
              fg3m: stat.fg3m,
              fg_pct: stat.fg_pct,
              fga: stat.fga,
              fgm: stat.fgm,
              ft_pct: stat.ft_pct,
              fta: stat.fta,
              ftm: stat.ftm,
              game: stat.game,
              min: stat.min,
              oreb: stat.oreb,
              pf: stat.pf,
              player: stat.player,
              pts: stat.pts,
              reb: stat.reb,
              stl: stat.stl,
              team: stat.team,
              turnover: stat.turnover
            })
              .save(function (error) {
                if (error)
                  console.log("ERREUR LORS DE LA SAUVEGARDE D'UNE STAT :", error);
              });
          }
        }
      }
    }
  }))

}).catch((error) => {
  console.log('erreur :', error);
});*/