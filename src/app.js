export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      {
        route: ['', 'draft-aid'],
        name: 'draft-aid',
        moduleId: 'components/draft-aid/index',
        nav: true
      },
      {
        route: 'rankings',
        name: 'rankings',
        moduleId: 'components/rankings/index',
        nav: true
      },
      {
        route: 'about',
        name: 'about',
        moduleId: 'components/about/index',
        nav: true
      }
    ]);
  }

}
