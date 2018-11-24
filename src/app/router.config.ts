import * as appRoutes from "./routes";

// PAGES
import AboutMePage from "@pages/about-me/about-me";
import ContactPage from "@pages/contact/contact";
import HomePage from "@pages/home/home";
import NoPage from "@pages/no-page/no-page";
import PortfolioPage from "@pages/portfolio/portfolio";

// import * as stringMethod from "./helpers/stringMethods";
export default class Router {

  public pageJs: any = null;

  private pagesLocation: string;

  constructor() {
    this.pagesLocation = "app/pages/";
  }

  public setPage() {
    const template = appRoutes.templates.find((value) => {
      return window.location.pathname.substr(1) === value.hash;
    });

    if (template) {
      // set view when url is good
      this.loadTemplate(template.file);
    } else if (window.location.pathname === "/") {
      // set Default Home Page
      this.loadTemplate(appRoutes.templates.find((value) => value.hash === "home").file);
    } else {
      // set No Page when url is wrong
      this.loadTemplate(appRoutes.templates.find((value) => value.hash === "**").file);
    }
  }

  // Load View
  public loadTemplate(file: string) {
    this.pageJs = null;

    const myRoute = appRoutes.templates.find((route) => {
      return route.file === file;
    });

    switch (myRoute.hash) {
      case "home": {
        this.pageJs = new HomePage().init();
        break;
      }
      case "contact": {
        this.pageJs = new ContactPage().init();
        break;
      }
      case "portfolio": {
        this.pageJs = new PortfolioPage().init();
        break;
      }
      case "about-me": {
        this.pageJs = new AboutMePage().init();
        break;
      }
      case "**": {
        this.pageJs = new NoPage().init();
        break;
      }
      default: {
        this.pageJs = new HomePage().init();
        break;
      }
    }

    document.getElementById("web-view").innerHTML = myRoute.view;
    console.log("Aplication view loaded.");
  }

  // Get all templates and set to view
  public async init() {
    for (const route of appRoutes.templates) {
      if (route.hash !== "**") {
        const response = await fetch(this.pagesLocation + route.hash + "/" + route.file);
        route.view = await response.text();
      } else {
        const response = await fetch(this.pagesLocation + "no-page/" + route.file);
        route.view = await response.text();
      }
    }

    this.setPage();
  }
}
