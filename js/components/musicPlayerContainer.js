const $template = document.createElement("template");
$template.innerHTML = /*html */ `
        <style>
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
        <script>
            const ap = new APlayer({
            container: document.getElementById("aplayer"),
            audio: [
                {
                name: "name",
                artist: "artist",
                url: "url.mp3",
                cover: "cover.jpg",
                },
            ],
            });
        </script>
`;

export default class MusicPlayerContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("music-player-container", MusicPlayerContainer);
