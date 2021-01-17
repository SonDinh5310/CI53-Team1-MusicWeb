import UploadForm from "./uploadForm.js";
import GetStartedForm from "./getStartedForm.js";
import { getCurrentUser, removeClass } from "../utils.js";
import UserMenu from "./userMenu.js";

const $template = document.createElement("template");
$template.innerHTML = /*html */ `
    <style>
        * {
            font-family: "Roboto Mono", monospace;
        }
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            max-width: 1080px;
            margin: auto;
            padding: inherit;
            
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
            height: 60px;
        }
        #page-logo {
            color: #feffff;
            font-style: none;
            text-decoration: none;
            font-family: Lobster;
            font-size: 48px;
            cursor: pointer;
        }
        #page-logo:hover {
            text-shadow: 0 0 11px #17252a;
        }
        #input-bar {
            width: 40vh;
            height: 30px;
            border: none;
            border-radius: 20px;
            outline: none;
            padding: auto;
        }
        #search-bar {
            background-color: #feffff;
            border-radius: 20px;
            padding-left: 8px;
            padding-right: 8px;
        }
        #search-bar > button {
            font-size: 16px;
            border-radius: 20px;
            outline: none;
            background-color: transparent;
            color: #3aafa9;
            border: none;
            cursor: pointer;
        }
        
        #get-started-btn {
            width: 100px;
            height: 30px;
            border-radius: 20px;
            outline: none;
            border: none;
            cursor: pointer;
            font-size: 12px;
        }
        #get-started-btn:hover {
            box-shadow: 0 0 11px #17252a; 
        }
        .d-none {
            display: none;
        }
        #auth-container {
            display: flex;
            justify-content: space-between;
        }
    </style>
    <nav id="page-nav" class="fixed-nav-bar">
        <ul>
            <li><a href="#" id="page-logo">.Music</a></li>
            <li>
            <form id="search-bar">
                <input type="text" placeholder="Write something ..." id="input-bar">
                <button>Search</button>
            </form>
            </li>
            <li id="un-auth">
                <get-started-form></get-started-form>
            </li>

            <li id="auth" class="d-none">
             <div id="auth-container">
                <upload-form></upload-form>
                <div id="root"></div>
            </div>
            </li>
        </ul>
    </nav>
`;

export default class NavbarContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$unAuth = this.shadowRoot.getElementById("un-auth");
        this.$auth = this.shadowRoot.getElementById("auth");
        this.$root = this.shadowRoot.getElementById("root");
    }

    connectedCallback() {
        let currentUser = getCurrentUser();
        if (!currentUser) {
            return;
        }
        this.$unAuth.className = "d-none";
        this.$auth.className = "";

        let $userMenu = new UserMenu();
        this.$root.appendChild($userMenu);
    }
}

window.customElements.define("navbar-container", NavbarContainer);
