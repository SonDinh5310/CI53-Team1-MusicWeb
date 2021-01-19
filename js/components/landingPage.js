import NavbarContainer from "./navbarContainer.js";
import MusicPlayerContainer from "./musicPlayerContainer.js";
import ItemList from "./itemListContainer.js";

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
        // this.$aplayer = this.shadowRoot.getElementById("aplayer");
        this.$musicPlayer = this.shadowRoot.querySelector(
            "music-player-container"
        );
    }

    connectedCallback() {
        document.addEventListener("play-music-event", (event) => {
            console.log(event.detail);
            this.$musicPlayer.setAttribute("url", event.detail.source);
            this.$musicPlayer.setAttribute("cover", event.detail.image);
            this.$musicPlayer.setAttribute("name", event.detail.name);
            this.$musicPlayer.setAttribute("artist", event.detail.artist);
        });

        let $itemList = new ItemList();
        this.$root.appendChild($itemList);
    }
}

window.customElements.define("landing-page", LandingPage);
