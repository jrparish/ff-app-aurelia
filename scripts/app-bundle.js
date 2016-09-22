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
define('services/rankings',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RankingService = undefined;


  var BASE_URL = 'https://draftaid-api.herokuapp.com/';

  var client = new _aureliaHttpClient.HttpClient();

  var RankingService = exports.RankingService = {
    get: function get(format, week) {
      return client.createRequest('rankings').asGet().withBaseUrl(BASE_URL).withParams({ format: format, week: week }).send();
    }
  };
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
define('text!draft-aid.html', ['module'], function(module) { module.exports = "<template>\r\n  <div id=\"main\" class=\"container-fluid clear-top\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-3 col-sm-12 col-xs-12\">\r\n        <compose view=\"./overall-rankings.html\"></compose>\r\n      </div>\r\n\r\n      <div class=\"col-md-6 col-sm-12 hidden-xs\">\r\n        <compose view=\"./position-rankings.html\"></compose>\r\n      </div>\r\n\r\n      <div class=\"col-md-3 col-sm-12 col-xs-12\">\r\n        <compose view=\"./draft-history.html\"></compose>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!draft-history.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"aid-title hidden-xs\">\r\n    <i class=\"fa fa-history\"></i> Draft History\r\n  </div>\r\n\r\n  <div class=\"row form-group\">\r\n    <div class=\"col-md-12\">\r\n      <button class=\"btn btn-sm btn-info btn-responsive\" ng-disabled=\"drafted.length === 0\" ng-click=\"undraft()\">\r\n        <i class=\"fa fa-backward\"></i> Undo\r\n      </button>\r\n      <button class=\"pull-right btn btn-sm btn-warning btn-responsive\" ng-click=\"restart()\">\r\n        <i class=\"fa fa-eject\"></i> Restart\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"scrollable draft-history\">\r\n    <table class=\"table table-condensed table-hover table-striped\">\r\n      <tbody>\r\n        <tr ng-repeat=\"player in drafted | orderBy:'drafted':true\">\r\n          <td>{{player.drafted}}</td>\r\n          <td>{{player.name}}</td>\r\n          <td>{{player.position}}</td>\r\n          <td>{{draftGrade(player)}}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</template>\r\n"; });
define('text!overall-rankings.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"aid-title hidden-xs\">\r\n    <i class=\"fa fa-sort-amount-asc\"></i> Overall Rankings\r\n  </div>\r\n\r\n  <div class=\"row form-group\">\r\n    <div class=\"form-group col-md-6\">\r\n      <select ng-model=\"format\"\r\n              ng-change=\"loadRankings(format)\"\r\n              name=\"format\"\r\n              class=\"form-control\"\r\n              required\r\n              ng-options=\"f.value as f.label for f in formats\"></select>\r\n    </div>\r\n\r\n    <div class=\"col-md-6\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"Search\" ng-model=\"search.name\">\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"scrollable overall-rankings\">\r\n    <h4 if.bind=\"loading\"><i class=\"fa fa-spinner fa-spin\"></i> Loading Data...</h4>\r\n    <table show.bind=\"!loading\" class=\"table table-condensed table-hover\">\r\n      <tr show.bind='!player.drafted'\r\n          data-toggle=\"tooltip\"\r\n          title=\"{{player.name}}, rank: {{player.rank}}, tier: {{player.tier}}, adp: {{player.average_draft_position}}, bye: {{player.bye_week}}\"\r\n          class=\"pointer\"\r\n          ng-class=\"{active: player.tier % 4 === 0,\r\n                    success: player.tier % 4 === 1,\r\n                    warning: player.tier % 4 === 2,\r\n                    info: player.tier % 4 === 3,\r\n                    danger: player.tier % 1 !== 0 }\"\r\n          repeat.for=\"player of rankings\"\r\n          ng-click='draft(player)'>\r\n        <td>${player.rank}</td>\r\n        <td>Tier ${player.tier}</td>\r\n        <td>${player.position}</td>\r\n        <td>${player.name}</a></td>\r\n        <td>${player.team}</td>\r\n        <td>${player.bye_week}</td>\r\n        <td ng-click=\"$event.stopPropagation(); player.starred = !player.starred\">\r\n          <i class=\"starred fa\" ng-class=\"player.starred ? 'fa-star text-danger' : 'fa-star-o'\"></i>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n\r\n</template>"; });
define('text!position-rankings.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"aid-title\">\r\n    <i class=\"fa fa-signal\"></i> Top Picks By Position\r\n    <div class=\"pull-right\">\r\n      <i class=\"fa fa-cog\"\r\n        ng-class=\"{ 'text-info': settings.active }\"\r\n        ng-click=\"settings.active = !settings.active\">\r\n      </i>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row settings\" ng-show=\"settings.active\">\r\n    <div class=\"col-sm-6 form-inline\">\r\n      <div class=\"form-group\">\r\n        <label>Position Limit</label>\r\n        <input type=\"number\"\r\n          class=\"form-control\"\r\n          placeholder=\"Limit\"\r\n          ng-model=\"settings.positionLimit\"\r\n          min=\"1\"\r\n          max=\"30\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-sm-6\" ng-repeat=\"position in positions\">\r\n    <span class=\"col-sm-12 position-title\">{{positionText(position)}}</span>\r\n    <table ng-show=\"!loading\" class=\"table table-condensed table-hover table-striped\">\r\n      <tr ng-if='!player.drafted'\r\n          data-toggle=\"tooltip\"\r\n          title=\"{{player.name}}, rank: {{player.rank}}, tier: {{player.tier}}, adp: {{player.average_draft_position}}, bye: {{player.bye_week}}\"\r\n          class=\"pointer\"\r\n          ng-class=\"{active: player.tier % 4 === 0,\r\n                    success: player.tier % 4 === 1,\r\n                    warning: player.tier % 4 === 2,\r\n                    info: player.tier % 4 === 3,\r\n                    danger: player.tier % 1 !== 0 }\"\r\n          ng-repeat=\"player in rankings | orderBy:'rank' | filter:positionFilter(position) | limitTo: settings.positionLimit\"\r\n          ng-click='draft(player)'>\r\n        <td>Tier {{player.tier}}</td>\r\n        <td>{{player.name}}</a></td>\r\n        <td>{{player.team}}</td>\r\n        <td>{{player.bye_week}}</td>\r\n        <td ng-click=\"$event.stopPropagation(); player.starred = !player.starred\">\r\n          <i class=\"starred fa\" ng-class=\"player.starred ? 'fa-star text-danger' : 'fa-star-o'\"></i>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map