define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;

      config.map([{
        route: ['', 'draft-aid'],
        name: 'draft-aid',
        moduleId: 'draft-aid',
        nav: true
      }, {
        route: 'rankings',
        name: 'rankings',
        moduleId: 'rankings',
        nav: true
      }, {
        route: 'about',
        name: 'about',
        moduleId: 'about',
        nav: true
      }]);
    };

    return App;
  }();
});
define('draft-aid',['exports', 'aurelia-framework', './services/ranking'], function (exports, _aureliaFramework, _ranking) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DraftAid = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DraftAid = exports.DraftAid = (_dec = (0, _aureliaFramework.inject)(_ranking.RankingService), _dec(_class = function () {
    function DraftAid(rankingService) {
      _classCallCheck(this, DraftAid);

      this.loading = true;

      this.rankingService = rankingService;
      this.loadRankings();
    }

    DraftAid.prototype.loadRankings = function loadRankings(format) {
      var _this = this;

      var week = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      this.rankingService.get(format, week).then(function (result) {
        _this.rankings = result.rankings;
        _this.loading = false;
      });
    };

    return DraftAid;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/ranking',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RankingService = undefined;


  var BASE_URL = 'https://draftaid-api.herokuapp.com/';

  var client = new _aureliaHttpClient.HttpClient();

  var RankingService = exports.RankingService = {
    get: function get(format, week) {
      return client.createRequest('rankings').asGet().withBaseUrl(BASE_URL).withParams({ format: format, week: week }).send().then(function (result) {
        return result.content;
      });
    }
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./app.css\"></require>\n\n    <nav class=\"navbar navbar-default\" role=\"navigation\">\n    <div class=\"container-fluid\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#js-navbar-collapse\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#/draft-aid\">Fantasy Football</a>\n      </div>\n\n      <div class=\"collapse navbar-collapse\" id=\"js-navbar-collapse\">\n        <ul class=\"nav navbar-nav\">\n          <li ng-class=\"getClass('/draft-aid')\"><a route-href=\"route: draft-aid\"><i class=\"fa fa-desktop\"></i> Draft Aid</a></li>\n          <li ng-class=\"getClass('/rankings')\"><a route-href=\"route: rankings\"><i class=\"fa fa-list-ol\"></i> Rankings</a></li>\n          <li ng-class=\"getClass('/about')\"><a route-href=\"route: about\"><i class=\"fa fa-male\"></i> About</a></li>\n        </ul>\n\n        <ul class=\"nav navbar-nav pull-right\">\n          <li><a><small>Last Updated: <strong>{{updatedAt | date: \"mediumDate\" }}</strong></small></a></li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <div id=\"wrap\">\n    <router-view></router-view>\n  </div>\n\n  <footer class=\"footer pull-right\">\n    <small>© 2016 <a href=\"https://github.com/jrparish/ff-app-aurelia\" target=\"_blank\">Jacob Parish</a></small>\n  </footer>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = ".container {\n  padding-left: 0;\n  padding-right: 5px; }\n\n.row {\n  margin-left: 0;\n  margin-right: -5px; }\n\n.row > div {\n  padding-left: 0;\n  padding-right: 5px; }\n\n.scrollable {\n  overflow-y: auto; }\n\n.table-condensed > tbody > tr > td {\n  padding: 2px;\n  font-size: 12px; }\n\n.aid-title {\n  text-align: center;\n  font-weight: bold;\n  background-color: #eee;\n  padding: 5px;\n  margin-bottom: 5px; }\n\n.position-title {\n  text-align: center;\n  font-weight: bold;\n  margin-bottom: 5px; }\n\n.settings {\n  padding-bottom: 10px;\n  padding-left: 15px; }\n\nhtml, body {\n  height: 100%; }\n\n#wrap {\n  min-height: 100%; }\n\n#main {\n  overflow: auto;\n  padding-bottom: 60px;\n  /* this needs to be bigger than footer height*/ }\n\n.footer {\n  position: relative;\n  margin-top: -50px;\n  /* negative value of footer height */\n  height: 50px;\n  clear: both;\n  padding: 10px; }\n\n.overall-rankings {\n  height: 250px;\n  margin-bottom: 10px; }\n\n.starred.fa-star-o {\n  color: lightgrey; }\n\n.btn-responsive {\n  padding: 4px 8px;\n  font-size: 90%; }\n\n.pointer {\n  cursor: pointer; }\n\n@media (min-width: 768px) {\n  .btn-responsive {\n    font-size: 100%;\n    padding: 5px 10px; }\n  .overall-rankings {\n    height: 710px;\n    margin-bottom: 10px; }\n  .draft-history {\n    height: 710px; }\n  .table-condensed > tbody > tr > td {\n    padding: 2px;\n    font-size: 13px; } }\n"; });
define('text!draft-aid.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"main\" class=\"container-fluid clear-top\">\n    <div class=\"row\">\n      <div class=\"col-md-3 col-sm-12 col-xs-12\">\n        <compose view=\"./overall-rankings.html\"></compose>\n      </div>\n\n      <div class=\"col-md-6 col-sm-12 hidden-xs\">\n        <compose view=\"./position-rankings.html\"></compose>\n      </div>\n\n      <div class=\"col-md-3 col-sm-12 col-xs-12\">\n        <compose view=\"./draft-history.html\"></compose>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!draft-history.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"aid-title hidden-xs\">\n    <i class=\"fa fa-history\"></i> Draft History\n  </div>\n\n  <div class=\"row form-group\">\n    <div class=\"col-md-12\">\n      <button class=\"btn btn-sm btn-info btn-responsive\" ng-disabled=\"drafted.length === 0\" ng-click=\"undraft()\">\n        <i class=\"fa fa-backward\"></i> Undo\n      </button>\n      <button class=\"pull-right btn btn-sm btn-warning btn-responsive\" ng-click=\"restart()\">\n        <i class=\"fa fa-eject\"></i> Restart\n      </button>\n    </div>\n  </div>\n\n  <div class=\"scrollable draft-history\">\n    <table class=\"table table-condensed table-hover table-striped\">\n      <tbody>\n        <tr ng-repeat=\"player in drafted | orderBy:'drafted':true\">\n          <td>{{player.drafted}}</td>\n          <td>{{player.name}}</td>\n          <td>{{player.position}}</td>\n          <td>{{draftGrade(player)}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</template>\n"; });
define('text!overall-rankings.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"aid-title hidden-xs\">\n    <i class=\"fa fa-sort-amount-asc\"></i> Overall Rankings\n  </div>\n\n  <div class=\"row form-group\">\n    <div class=\"form-group col-md-6\">\n      <select ng-model=\"format\"\n              ng-change=\"loadRankings(format)\"\n              name=\"format\"\n              class=\"form-control\"\n              required\n              ng-options=\"f.value as f.label for f in formats\"></select>\n    </div>\n\n    <div class=\"col-md-6\">\n      <input type=\"text\" class=\"form-control\" placeholder=\"Search\" ng-model=\"search.name\">\n    </div>\n  </div>\n\n  <div class=\"scrollable overall-rankings\">\n    <h4 if.bind=\"loading\"><i class=\"fa fa-spinner fa-spin\"></i> Loading Data...</h4>\n    <table show.bind=\"!loading\" class=\"table table-condensed table-hover\">\n      <tr show.bind='!player.drafted'\n          data-toggle=\"tooltip\"\n          title=\"{{player.name}}, rank: {{player.rank}}, tier: {{player.tier}}, adp: {{player.average_draft_position}}, bye: {{player.bye_week}}\"\n          class=\"pointer\"\n          ng-class=\"{active: player.tier % 4 === 0,\n                    success: player.tier % 4 === 1,\n                    warning: player.tier % 4 === 2,\n                    info: player.tier % 4 === 3,\n                    danger: player.tier % 1 !== 0 }\"\n          repeat.for=\"player of rankings\"\n          ng-click='draft(player)'>\n        <td>${player.rank}</td>\n        <td>Tier ${player.tier}</td>\n        <td>${player.position}</td>\n        <td>${player.name}</a></td>\n        <td>${player.team}</td>\n        <td>${player.bye_week}</td>\n        <td ng-click=\"$event.stopPropagation(); player.starred = !player.starred\">\n          <i class=\"starred fa\" ng-class=\"player.starred ? 'fa-star text-danger' : 'fa-star-o'\"></i>\n        </td>\n      </tr>\n    </table>\n  </div>\n\n</template>"; });
define('text!position-rankings.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"aid-title\">\n    <i class=\"fa fa-signal\"></i> Top Picks By Position\n    <div class=\"pull-right\">\n      <i class=\"fa fa-cog\"\n        ng-class=\"{ 'text-info': settings.active }\"\n        ng-click=\"settings.active = !settings.active\">\n      </i>\n    </div>\n  </div>\n\n  <div class=\"row settings\" ng-show=\"settings.active\">\n    <div class=\"col-sm-6 form-inline\">\n      <div class=\"form-group\">\n        <label>Position Limit</label>\n        <input type=\"number\"\n          class=\"form-control\"\n          placeholder=\"Limit\"\n          ng-model=\"settings.positionLimit\"\n          min=\"1\"\n          max=\"30\">\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col-sm-6\" ng-repeat=\"position in positions\">\n    <span class=\"col-sm-12 position-title\">{{positionText(position)}}</span>\n    <table ng-show=\"!loading\" class=\"table table-condensed table-hover table-striped\">\n      <tr ng-if='!player.drafted'\n          data-toggle=\"tooltip\"\n          title=\"{{player.name}}, rank: {{player.rank}}, tier: {{player.tier}}, adp: {{player.average_draft_position}}, bye: {{player.bye_week}}\"\n          class=\"pointer\"\n          ng-class=\"{active: player.tier % 4 === 0,\n                    success: player.tier % 4 === 1,\n                    warning: player.tier % 4 === 2,\n                    info: player.tier % 4 === 3,\n                    danger: player.tier % 1 !== 0 }\"\n          ng-repeat=\"player in rankings | orderBy:'rank' | filter:positionFilter(position) | limitTo: settings.positionLimit\"\n          ng-click='draft(player)'>\n        <td>Tier {{player.tier}}</td>\n        <td>{{player.name}}</a></td>\n        <td>{{player.team}}</td>\n        <td>{{player.bye_week}}</td>\n        <td ng-click=\"$event.stopPropagation(); player.starred = !player.starred\">\n          <i class=\"starred fa\" ng-class=\"player.starred ? 'fa-star text-danger' : 'fa-star-o'\"></i>\n        </td>\n      </tr>\n    </table>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map