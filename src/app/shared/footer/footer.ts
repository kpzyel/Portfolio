export default class Footer {

  constructor() {
    //
  }

  public async init() {
    const response = await fetch("./app/shared/footer/footer.html");
    const footer = document.getElementById("web-footer");

    footer.innerHTML = await response.text();

    ($('[data-toggle="tooltip"]') as any).tooltip();
    ($('[data-toggle="popover"]') as any).popover();
  }
}
