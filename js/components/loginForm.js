import { getDataFromDoc, saveCurrentUser } from "../utils.js";
import InputWrapper from "./inputWrapper.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../../css/loginForm.css" />
    <form id="login-form">
    <h2>Dang nhap tai khoan</h2>
    <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
    <input-wrapper id="password"
      label="Mat khau"
      type="password"
      error=""
      value=""
    ></input-wrapper>
    <button id="login-btn">Dang nhap</button>
    </form>
`;

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$form = this.shadowRoot.getElementById("login-form");
        this.$email = this.shadowRoot.getElementById("email");
        this.$password = this.shadowRoot.getElementById("password");
    }

    connectedCallback() {
        this.$form.onsubmit = async (event) => {
            event.preventDefault();
            let email = this.$email.value();
            let password = this.$password.value();

            let isPassed =
                InputWrapper.validate(
                    this.$email,
                    (value) => value !== "",
                    "Nhap vao email"
                ) &
                InputWrapper.validate(
                    this.$password,
                    (value) => value !== "",
                    "Nhap vao password"
                );

            if (isPassed) {
                let result = await firebase
                    .firestore()
                    .collection("users")
                    .where("email", "==", email)
                    .where("password", "==", CryptoJS.MD5(password).toString())
                    .get();

                if (result.empty) {
                    alert("Email hoac mat khau khong chinh xac");
                } else {
                    console.log(result);
                    saveCurrentUser(getDataFromDoc(result.docs[0]));
                    location.reload();
                }
            }
            console.log(isPassed);
        };
    }
}

window.customElements.define("login-form", LoginForm);
