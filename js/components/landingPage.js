import NavbarContainer from "./navbarContainer.js";
import MusicPlayerContainer from "./musicPlayerContainer.js";
import ItemList from "./itemListContainer.js";
import data from "./fakeData.js";

const $template = document.createElement("template");
$template.innerHTML = /*html */ `
  <style>
    #landing-page-container {
      display: flex;
      max-width: 1170px;
      margin: auto;
    }
  </style>
  <div id="landing-page-container">
    <navbar-container></navbar-container>
    <div id="root"></div>
    <music-player-container></music-player-container>
  </div>
`;

export default class LandingPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$root = this.shadowRoot.getElementById("root");
  }

  connectedCallback() {
    let $itemList = new ItemList(data);
    this.$root.appendChild($itemList);
  }
}

window.customElements.define("landing-page", LandingPage);
