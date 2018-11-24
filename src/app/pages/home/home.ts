// header-img

export default class HomePage {

  constructor() {
    this.setHeaderImg();
  }

  public init() {
    console.log("HomePage init");
    this.setHeaderImg();
  }

  private setHeaderImg() {
    console.log("setHeaderImg");
    // const img = require("@images/header/it-01.jpg");
    // document.getElementById("header-img").innerHTML = img;
  }

}
