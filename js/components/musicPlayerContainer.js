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
                border-radius: 20px 20px 0 0;
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

    static get observedAttributes() {
        return ["url", "cover", "name", "artist"];
    }

    connectedCallback() {
        this.ap = new APlayer({
            container: this.$aplayer,
            // theme: "#2b7a78",
            listFolded: true,
            // audio: [
            //     {
            //         name: "name",
            //         artist: "artist",
            //         url: "url.mp3",
            //         cover: "cover.jpg",
            //     },
            // ],
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // console.log(typeof newValue);
        if (attrName == "url") {
            this.ap.addAudio({
                url: newValue,
            });
        }
        this.ap.play();
    }
}

window.customElements.define("music-player-container", MusicPlayerContainer);
