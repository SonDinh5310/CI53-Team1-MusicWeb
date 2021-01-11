import NavbarContainer from "./navbarContainer.js";
import MusicPlayerContainer from "./musicPlayerContainer.js";

const $template = document.createElement("template");

$template.innerHTML = /*html */ `
  <style>
    #landing-page-container {
      display: flex;
      max-width: 1200px;
      margin: auto;
    }
  </style>
  <div id="landing-page-container">
    <navbar-container></navbar-container>
    
    <music-player-container></music-player-container>
  </div>
`;

export default class LandingPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("landing-page", LandingPage);
