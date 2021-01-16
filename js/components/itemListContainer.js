import data from "./fakeData.js";
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
        this.setAttribute("data", JSON.stringify(data));
    }

    static get observedAttributes() {
        return ["data"];
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            console.log("this is ===>" + newValue);
            let data = JSON.parse(newValue);
            console.log(data);
            for (let item of data) {
                // console.log(item);
                let $itemContainer = new ItemContainer(
                    item.image,
                    item.songName,
                    item.artist
                );
                $itemContainer.setAttribute("image", item.image);
                $itemContainer.setAttribute("song-name", item.songName);
                $itemContainer.setAttribute("artist", item.artist);
                this.$itemList.appendChild($itemContainer);
            }
        }
    }
}

window.customElements.define("item-list", ItemList);
