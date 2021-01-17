import { getCurrentUser } from "../utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html */ `
    <style>
    * {
            font-family: "Roboto Mono", monospace;
        }
       /* Dropdown Button */
.dropbtn {
  background-color: #feffff;
  color: #17252a;
  width: 100px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 20px;
  height: 30px;
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus {
  box-shadow: 0 0 11px #17252a; 
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #feffff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 20px;
  width: 100%;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 12px;
  border-radius: 20px;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display:block;
} 
    </style>
    <div class="dropdown">
      <button class="dropbtn" id="dropdownBtn">Dropdown</button>
      <div id="menuDropdown" class="dropdown-content">
        <a href="">Profile</a>
        <a id="logOutBtn">Log out</a>
      </div>
    </div> 
`;

export default class UserMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$dropdownBtn = this.shadowRoot.getElementById("dropdownBtn");
        this.$menuDropdown = this.shadowRoot.getElementById("menuDropdown");
        this.$logOutBtn = this.shadowRoot.getElementById("logOutBtn");
    }

    connectedCallback() {
        let currentUser = getCurrentUser();
        console.log(currentUser);
        this.$dropdownBtn.innerHTML = currentUser.name;
        /* When the user clicks on the button,
        toggle between hiding and showing the dropdown content */
        this.$dropdownBtn.onclick = () => {
            this.$menuDropdown.classList.toggle("show");
        };
        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function (event) {
            if (!event.target.matches(".dropbtn")) {
                let dropdowns = document.getElementsByClassName(
                    "dropdown-content"
                );
                for (let i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains("show")) {
                        openDropdown.classList.remove("show");
                    }
                }
            }
        };

        this.$logOutBtn.onclick = () => {
            window.localStorage.removeItem("current-user");
            location.reload();
        };
    }
}

window.customElements.define("user-menu", UserMenu);
