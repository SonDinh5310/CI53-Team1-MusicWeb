const $template = document.createElement("template");

$template.innerHTML = /*html */ `
    <style>
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
        #page-nav {
            background-color: #2b7a78;
        }
        .fixed-nav-bar {
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 9999;
            width: 100%;
            height: 80px;
        }
        #page-logo {
            color: #feffff;
            font-style: none;
            text-decoration: none;
            font-family: "Lobster";
            font-size: 48px;
        }
        #search-bar {
            width: 400px;
            height: 30px;
            border: none;
            border-radius: 20px;
            outline: none;
            padding: auto;
        }
    </style>
    <nav id="page-nav" class="fixed-nav-bar">
        <ul>
            <li><a href="#" id="page-logo">.Music</a></li>
            <li>
            <form>
                <input type="text" placeholder="Write something ..." id="search-bar">
                <button>Seatch</button>
            </form>
            </li>
            <li>
                <button>Get Started</button>
            </li>
        </ul>
    </nav>
`;

export default class NavbarContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("navbar-container", NavbarContainer);
