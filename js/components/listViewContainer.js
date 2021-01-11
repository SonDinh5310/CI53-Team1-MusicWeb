const $template = document.createElement("template");
$template.innerHTML = /*html */ `

        <style>
          .parent {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(2, 2fr) repeat(3, 1fr);
                grid-column-gap: 10px;
                grid-row-gap: 10px;
                justify-content: center;
                align-items: center;
            }

            .div-effect {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              text-align: center;
            }

            .div1 {
                grid-area: 1 / 1 / 2 / 2;
            }
            .div2 {
                grid-area: 1 / 2 / 2 / 3;
            }
            .div3 {
                grid-area: 1 / 3 / 2 / 4;
            }
            .div4 {
                grid-area: 1 / 4 / 2 / 5;
            }
            .div5 {
                grid-area: 1 / 5 / 2 / 6;
            }
            .div6 {
                grid-area: 2 / 1 / 3 / 2;
            }
            .div7 {
                grid-area: 2 / 2 / 3 / 3;
            }
            .div8 {
                grid-area: 2 / 3 / 3 / 4;
            }
            .div9 {
                grid-area: 2 / 4 / 3 / 5;
            }
            .div10 {
                grid-area: 2 / 5 / 3 / 6;
            }

        div > img {
          border-radius: 10px;
        }
        div > h2 {
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
        }
        </style>
        <div style="height: calc(100% - 80px - 66px);margin-top: 80px;margin-bottom: 66px;">
        <h2>FEATURE SONGS</h2>
            <div class="parent">
                <div class="div1 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div2 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div3 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div4 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div5 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div6 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div7 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div8 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div9 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div class="div10 div-effect">
                    <img src="https://picsum.photos/200"/>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
            </div>
        </div>
`;

export default class ListViewContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("list-view-container", ListViewContainer);
