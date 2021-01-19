import { getCurrentUser, getDatafromDocs } from "../utils.js";
// import data from "./fakeData.js";
import ItemContainer from "./itemContainer.js";

const $template = document.createElement("template");
$template.innerHTML = /*html */ `

        <style>
            #container {
                justify-content: center; 
                max-width: 1170px;
                margin: 66px auto 66px;
            }
            #container > h2 {
                color: #feffff;
                max-width: 1125px;
                margin-left: auto;
                margin-bottom: 0;
            }
        #item-list {
            display:flex;
            justify-content: center; 
            flex-wrap: wrap;
            max-width: 1170px;
        }
        item-container {
            margin: 10px;
        }
        </style>
        <div id="container">
            <h2>Feature Songs</h2>
            <div id="item-list"></div>
        </div>
`;

export default class ItemList extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$itemList = this.shadowRoot.getElementById("item-list");
    }

    async connectedCallback() {
        let songsData = await this.loadSongs();
        this.$itemList.setAttribute("data", JSON.stringify(songsData));
    }
    static get observedAttributes() {
        return ["data"];
    }

    async loadSongs() {
        let currentUser = getCurrentUser();
        let result = await firebase.firestore().collection("songsData").get();
        // console.log(result);
        let existSongs = getDatafromDocs(result.docs);
        for (let existSong of existSongs) {
            let $itemContainer = new ItemContainer(
                existSong.coverImage,
                existSong.songName,
                existSong.artist,
                existSong.file
            );
            this.$itemList.appendChild($itemContainer);
        }
    }
}

window.customElements.define("item-list", ItemList);
