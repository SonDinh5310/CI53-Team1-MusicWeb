const $template = document.createElement("template");
$template.innerHTML = /*html */ `
        <style>
            @import url("../../css/musicPlayerContainer.css");
            #aplayer {
                max-width: 1080px;
                z-index: 2;
                left: 0;
                bottom: 0;
                margin: auto;
                width: 100%;
            }
            #player-container {
                background-color: transparent;
                position: fixed;
                z-index: 2;
                align-items: center;
                left: 0;
                bottom: 0;
                margin: auto;
                height: auto;
                width: 100%;
            }
        </style>
        <div id="player-container">
            <div id="aplayer"></div>
        </div>
`;

export default class MusicPlayerContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$aplayer = this.shadowRoot.getElementById("aplayer");
    }

    connectedCallback() {
        const ap = new APlayer({
            container: this.$aplayer,
            // theme: "#2b7a78",
            audio: [
                {
                    name: "name",
                    artist: "artist",
                    url: "url.mp3",
                    cover: "cover.jpg",
                },
            ],
        });
    }
}

window.customElements.define("music-player-container", MusicPlayerContainer);
