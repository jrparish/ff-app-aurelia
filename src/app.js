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
        moduleId: 'draft-aid',
        nav: true
      },
      {
        route: 'rankings',
        name: 'rankings',
        moduleId: 'rankings',
        nav: true
      },
      {
        route: 'about',
        name: 'about',
        moduleId: 'about',
        nav: true
      }
    ]);
  }

}
