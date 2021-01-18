const $template = document.createElement("template");
$template.innerHTML = /*html */ `
  <style>
* {
    font-family: "Roboto Mono", monospace;
}
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content/Box */
.modal-content {
    display: flex;
    flex-direction: column;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 50%; /* Could be more or less, depending on screen size */
    border-radius: 20px;
}

/* The Close Button */
.close {
    color: #aaa;
    float: left;
    align-items: right;
    right: 0;
    font-size: 28px;
    font-weight: bold;
    width: auto;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

#popup-btn {
  width: 100px;
    height: 30px;
    border-radius: 20px;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
}
#popup-btn:hover{
  box-shadow: 0 0 11px #17252a; 
}
.d-none {
    display: none;
}
#to-register {
  margin-top: 20px;
  text-align: center;
}
#to-login {
  margin-top: 20px;
  text-align: center;
}
.switch {
    text-align: center;
    margin-bottom: 20px;
}
.effect {
    text-decoration: underline;
    color: #3aafa9;
    font-weight: bold;
    cursor:pointer;
}
</style>
<!-- Trigger/Open The Modal -->
<button id="popup-btn">Get Started</button>
<!-- The Modal -->
<div id="popup-modal" class="modal">
<!-- Modal content -->
    <div class="modal-content">
        <span class="close" id="close-btn">&times;</span>
        <div>
          <img id="userAvatar" src="../../img/user default ava.png" alt="avatar"/>
          <div>
            <ul>
              <li>name</li>
              <li>email</li>
              <li><button>add information</button></li>
            </ul>
          </div>
        </div>
    </div>
</div>
`;

export default class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("user-profile", UserProfile);
