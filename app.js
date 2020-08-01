var app = new Vue({
  el: '#app',
  data: {
    about: false,
    teamSelection: false,
    playerSelection: false,
    teams: [],
    selectedTeamPlayers: [],
    selectedPlayer: '',
    selectedTeam: '',
    playerStats: [],
    playerGames: [],
    player2019Averages: {
      season: '2019',
      games_played: '',
      pts: '',
      fg_pct: '',
      fg3_pct: '',
      ft_pct: '',
      ast: '',
      reb: '',
      stl: '',
      blk: '',
      turnover: '',
    },
    playerAverages: [],
    teamStats: [],
    chart: '',
    compChart: '',
    graphOptions: [{
        text: 'Points',
        value: 'pts'
      },
      {
        text: 'Tirs tentés',
        value: 'fga'
      },
      {
        text: 'Tirs marqués',
        value: 'fgm'
      },
      {
        text: 'Tirs à 3pts tentés',
        value: 'fg3a'
      },
      {
        text: 'Tirs à 3pts marqués',
        value: 'fg3m'
      },
      {
        text: 'Lancers francs tentés',
        value: 'fta'
      },
      {
        text: 'Lancers francs marqués',
        value: 'ftm'
      },
      {
        text: 'Passes décisives',
        value: 'ast'
      },
      {
        text: 'Rebonds',
        value: 'reb'
      },
      {
        text: 'Interceptions',
        value: 'stl'
      },
      {
        text: 'Contres',
        value: 'blk'
      },
      {
        text: 'Pertes de balle',
        value: 'turnover'
      }
    ],
    graphChoice: {
      text: 'Points',
      value: 'pts'
    },
    compGraphChoice: {
      text: 'Points',
      value: 'pts'
    }
  },
  methods: {
    getTeams() {
      axios.get('http://lif.sci-web.net:3000/teams').then(response =>
        (this.teams = response.data.sort(function (a, b) {
          return a.city < b.city ? -1 : 1;
        })))
    },
    getTeamPlayers(teamId) {
      axios.get('http://lif.sci-web.net:3000/players/team/' + teamId).then(response => {
        this.selectedTeamPlayers = response.data.sort(function (a, b) {
          return a.last_name < b.last_name ? -1 : 1;
        });
        this.getTeamStats();
      });
    },
    selectTeam(team) {
      this.teamSelection = true;
      this.selectedTeam = team;
      this.getTeamPlayers(team.id);
    },
    displayAbout() {
      this.teamSelection = false;
      this.playerSelection = false;
      this.about = true;
    },
    displayAllTeams() {
      this.about = false;
      this.teamSelection = false;
      this.playerSelection = false;
    },
    displaySelectedTeam() {
      this.playerSelection = false;
    },
    selectPlayer(player) {
      this.playerSelection = true;
      this.selectedPlayer = player;
      this.getPlayerAverages(player.id);
      this.getPlayerStats(player.id);
      this.compGraphChoice = {
        text: 'Points',
        value: 'pts'
      }
      this.drawCompChart();
    },
    getPlayerStats(playerId) { // Méthode pour récupérer les statistiques du joueur sélectionné sur tous les matchs de la saison 2019-2020
      const url = "http://lif.sci-web.net:3000/stats/" + playerId;
      axios.get(url)
        .then(response => {
          this.playerStats = response.data;
          this.getPlayerGames();
          this.getPlayer2019Averages();
        })
        .catch(reason => alert('GET failed. ' + reason));
    },
    getPlayerAverages(playerId) { // Méthode qui récupère les statistiques moyennes du joueur sélectionné sur plusieurs saisons (2015-2016 à 2019-2020)
      const url = "http://lif.sci-web.net:3000/season_averages/" + playerId;
      axios.get(url)
        .then(response => {
          let playerAverages = [];
          for (const avg of response.data) {
            if (avg.season != "2019") playerAverages.push(avg); // On récupère les moyennes de toutes les saisons sauf celles de la saison 2019-2020 car pour certains joueurs ces dernières sont erronées (leurs calculs se font dans la méthode getPlayer2019Averages)
          }
          this.playerAverages = playerAverages;
        });
    },
    getPlayer2019Averages() { // Méthode qui détermine les statistiques moyennes du joueur sélectionné pour la saison 2019-2020 car elles sont erronnées dans l'API pour certains joueurs
      let keys = Object.keys(this.playerStats[0]);
      let usefulKeys = [];
      let ast = keys[2];
      let blk = keys[3];
      let fg3a = keys[6];
      let fg3m = keys[7];
      let fga = keys[9];
      let fgm = keys[10];
      let fta = keys[12];
      let ftm = keys[13];
      let pts = keys[19];
      let reb = keys[20];
      let stl = keys[21];
      let turnover = keys[23];
      usefulKeys.push(ast, blk, fg3a, fg3m, fga, fgm, fta, ftm, pts, reb, stl, turnover);

      let sumFga, sumFgm, sumFg3a, sumFg3m, sumFta, sumFtm;
      let nbGames = this.playerStats.length;
      for (const key of usefulKeys) {
        let sum = 0.0;
        for (const stat of this.playerStats) {
          sum += parseFloat(stat[key]);
        }
        if (key == fga) sumFga = sum;
        else if (key == fgm) sumFgm = sum;
        else if (key == fg3a) sumFg3a = sum;
        else if (key == fg3m) sumFg3m = sum;
        else if (key == fta) sumFta = sum;
        else if (key == ftm) sumFtm = sum;
        else {
          if (sum / nbGames == 0) this.player2019Averages[key] = 0;
          else this.player2019Averages[key] = (sum / nbGames).toFixed(2);
        }
      }

      this.player2019Averages["games_played"] = nbGames;
      if (sumFga != 0.0 && sumFgm != 0.0) this.player2019Averages["fg_pct"] = (sumFgm / sumFga).toFixed(3);
      else this.player2019Averages["fg_pct"] = 0;
      if (sumFg3a != 0.0 && sumFg3m != 0.0) this.player2019Averages["fg3_pct"] = (sumFg3m / sumFg3a).toFixed(3);
      else this.player2019Averages["fg3_pct"] = 0;
      if (sumFta != 0.0 && sumFtm != 0.0) this.player2019Averages["ft_pct"] = (sumFtm / sumFta).toFixed(3);
      else this.player2019Averages["ft_pct"] = 0;
    },
    getPlayerGames() { // Méthode qui récupère les matchs correspondant aux stats du joueur sélectionné
      let url = "http://lif.sci-web.net:3000/games/"
      let req = [];
      for (const stat of this.playerStats) {
        req.push(axios.get(url + stat.game.id));
      }
      axios.all(req).then(axios.spread((...responses) => {
        for (const response of responses) {
          this.playerGames.push(response.data);
        }
        this.graphChoice = {
          text: 'Points',
          value: 'pts'
        }
        this.drawChart();
      }))
    },
    getTeamStats() { // Méthode qui récupère les statistiques moyennes de toute l'équipe pour la saison 2019-2020
      if (this.teamStats.length != 0) this.teamStats = [];
      const url = "http://lif.sci-web.net:3000/stats/";
      let req = [];
      for (const player of this.selectedTeamPlayers) {
        req.push(axios.get(url + player.id));
      }

      axios.all(req).then(axios.spread((...responses) => {
        for (const response of responses) {
          this.teamStats.push(response.data);
        }
      }))


    },
    initChart() { // Méthode pour initialiser le graph des statistiques sur les 10 derniers matchs du joueur sélectionné
      this.chart = anychart.line();
      this.chart.container('chart');
    },
    initCompChart() { // Méthode pour initialiser le graph de comparaison joueur/équipe des statistiques moyennes sur la saison 2019-2020
      this.compChart = anychart.pie();
      this.compChart.container('compChart');
    },
    drawChart() { // Méthode permettant de mettre à jour le graphique selon la stat sélectionnée
      let key = this.graphChoice.value;
      const data = this.playerStats.map(item => {
        const date = new Date(item.game.date);
        const gameId = item.game.id
        const dateN = date.toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        });
        return [dateN, item[key], gameId];
      });

      data.sort(function (a, b) { // Tri des données dans l'odre croissant des dates
        let dateA = a[0].split('/').reverse().join('');
        let dateB = b[0].split('/').reverse().join('');
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
      });

      let dataMin = []; // On récupère uniquement les 10 derniers matchs
      if (data.length - 10 >= 0) {
        for (let i = data.length - 10; i < data.length; i++) {
          dataMin.push(data[i]);
        }
      } else {
        dataMin = data;
      }

      let dataFinal = [];
      for (const stat of dataMin) { // On ajoute dans les données l'équipe affrontée pour la stat correspondante
        for (const game of this.playerGames) {
          if (stat[2] == game.id) {
            let opponent;
            if (game.home_team.id === this.selectedPlayer.team.id) {
              opponent = game.visitor_team.full_name;
            } else {
              opponent = game.home_team.full_name;
            }
            dataFinal.push({
              x: stat[0],
              value: stat[1],
              opponent: opponent
            })
          }
        }
      }

      this.chart.data(dataFinal);
      this.chart.title(this.graphChoice.text + ' sur les 10 derniers matchs');
      this.chart.tooltip().format("contre les {%opponent} : {%value}");
      this.chart.draw();
    },
    drawCompChart() { // Méthode permettant de mettre à jour le graphique selon la stat sélectionnée
      let key = this.compGraphChoice.value;
      let restSum = 0.0;
      let restNbGames = 0;
      let playerSum = 0.0;
      let playerNbGames = 0;
      for (const playerStats of this.teamStats) {
        for (const stat of playerStats) {
          if (stat.player.id != this.selectedPlayer.id) {
            restSum += parseFloat(stat[key]);
            if (restNbGames < playerStats.length) restNbGames = playerStats.length;
          } else {
            playerSum += parseFloat(stat[key]);
            playerNbGames += 1;
          }
        }
      }

      let playerAvg = (playerSum / playerNbGames).toFixed(2);
      let restAvg = (restSum / restNbGames).toFixed(2);
      let data = [{
          x: this.selectedPlayer.first_name + " " + this.selectedPlayer.last_name,
          value: playerAvg
        },
        {
          x: "Reste de l'équipe",
          value: restAvg
        }
      ];

      this.compChart.data(data);
      this.compChart.title('Contribution en ' + this.compGraphChoice.text.toLowerCase() + " durant la saison 2019-2020 (moyenne par matchs)");
      this.compChart.draw();
    }
  },
  watch: {
    graphChoice() { // On appelle cette méthode dès que la variable graphChoice est modifiée (lorsqu'on change la stat que l'on veut afficher)
      this.drawChart();
    },
    compGraphChoice() { // Pareil pour la variable compGraphChoice
      this.drawCompChart();
    }
  },
  mounted() { // Les méthodes ci-dessous s'exécutent dès que la Vue est instanciée
    this.getTeams();
    this.initChart();
    this.initCompChart();

  }

})