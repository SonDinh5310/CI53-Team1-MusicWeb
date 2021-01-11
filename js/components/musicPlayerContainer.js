const $template = document.createElement("template");
$template.innerHTML = /*html */ `
        <style>
            @import url("../../css/musicPlayerContainer.css");
            #aplayer {
                position: fixed;
                z-index: 9999;
                left: 0;
                bottom: 0;
                margin: 0;
                height: auto;
                width: 100%;
            }
        </style>
        <div id="aplayer"></div>
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
