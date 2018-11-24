export default class Header {

  constructor() {
    //
  }

  public async init() {
    const response = await fetch("./app/shared/header/header.html");
    const header = document.getElementById("web-header");

    header.innerHTML = await response.text();
  }
}
