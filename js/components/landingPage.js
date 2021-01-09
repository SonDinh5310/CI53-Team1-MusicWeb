import NavbarContainer from "./navbarContainer.js";
import MusicPlayerContainer from "./musicPlayerContainer.js";
const $template = document.createElement("template");

$template.innerHTML = /*html */ `
  <div>
    <navbar-container></navbar-container>
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
