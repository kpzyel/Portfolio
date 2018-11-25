// Routing
import Router from './router.config';

// Shared Elements
import Footer from '@shared/footer/footer';
import Header from '@shared/header/header';

// My styles
import '@styles/styles.scss';

class App {
  constructor() {
    //
  }

  public async start() {
    console.log('Starting Application..', window);
    this.render();
  }

  private render() {
    const main = document.getElementById('web-app');

    // Header always show onn page
    this.buildHeader(main);

    // Body changed by route
    this.buildView(main);

    // Footer always show onn page
    this.buildFooter(main);
  }

  // Attach header to Page
  private buildHeader(main: HTMLElement) {
    const headerElement = document.createElement('header');
    headerElement.id = 'web-header';
    main.appendChild(headerElement);

    new Header().init();
  }

  // Attach footer to Page
  private buildFooter(main: HTMLElement) {
    const footerElement = document.createElement('footer');
    footerElement.id = 'web-footer';
    main.appendChild(footerElement);

    new Footer().init();
  }

  // Attach view to page
  private buildView(main: HTMLElement) {
    const viewElement = document.createElement('main');
    viewElement.innerHTML = 'Loading Application..';
    viewElement.id = 'web-view';
    main.appendChild(viewElement);

    new Router().init();
  }
}

new App().start();
