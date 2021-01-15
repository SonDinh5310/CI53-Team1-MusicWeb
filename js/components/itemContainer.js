const $template = document.createElement("template");
$template.innerHTML = /*html */ `
  <style>
    #item-container {
      width: 200px;
      margin: 0;
      padding: 0;
      line-height: 25px;
    }
    #image {
      width: 200px;
      border-radius: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      cursor: pointer;
      object-fit: cover;
    }
    #image:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    #song-name {
      font-size: 15px;
      text-align: center;
    }
    #artist {
      font-size: 13px;
      text-align: center;
    }
  </style>
  <div id="item-container">
    <img id="image" src="https://picsum.photos/200" />
    <div id="song-name">Chan gai 707</div>
    <div id="artist">Low G</div>
  </div>
`;

export default class ItemContainer extends HTMLElement {
    constructor(image, songName, artist) {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.setAttribute("image", image);
        this.setAttribute("song-name", songName);
        this.setAttribute("artist", artist);
    }

    static get observedAttributes() {
        return ["image", "song-name", "artist"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(attrName + " = " + newValue);
        switch (attrName) {
            case "image":
                this.shadowRoot.getElementById("image").src = newValue;
                break;
            case "song-name":
                this.shadowRoot.getElementById(
                    "song-name"
                ).innerHTML = newValue;
                break;
            case "artist":
                this.shadowRoot.getElementById("artist").innerHTML = newValue;
                break;
        }
    }
}

window.customElements.define("item-container", ItemContainer);
