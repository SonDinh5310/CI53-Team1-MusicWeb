import { getCurrentUser } from "../utils.js";

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
            line-height: 40px;
            background-color: #feffff;
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
        #filesubmit {
          display: flex;
          flex-direction: column;
        }
        .file-submit-btn{
          width: 30% !important;
          hegiht: 10px;
          margin: auto;
          border-radius: 20px;
          outline: none;
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
            background-color: #feffff;
        }
        #popup-btn:hover{
          box-shadow: 0 0 11px #17252a; 
        }
    </style>
    <!-- Trigger/Open The Modal -->
    <button id="popup-btn">Upload</button>
    <!-- The Modal -->
    <div id="popup-modal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" id="close-btn">&times;</span>
        <div id="filesubmit">
          <div>
            <label for="audio">Select file</label>
            <input id="audio" type="file" class="file-select" accept="audio/*" required/>
          </div>
          <div>
            <label for="img">Select image</label>
            <input id="img" type="file" class="file-select" accept="image/*" required/>
          </div>
          <div>
            <label for="song-name-input">Write song name</label>
            <input id="song-name-input" type="text" required/>
          </div>
          <div>
            <label for="artist-name-input">Write artist name</label>
            <input id="artist-name-input" type="text" required/>
          </div>
          </div>
        <button id="file-submit-btn"class="file-submit-btn">SUBMIT</button>
      </div>
    </div>
`;

export default class UploadForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$fileSubmitBtn = this.shadowRoot.getElementById("file-submit-btn");
        this.$audioFile = this.shadowRoot.getElementById("audio");
        this.$coverImg = this.shadowRoot.getElementById("img");
        this.$songName = this.shadowRoot.getElementById("song-name-input");
        this.$artistName = this.shadowRoot.getElementById("artist-name-input");
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        let modal = this.shadowRoot.getElementById("popup-modal");
        let btn = this.shadowRoot.getElementById("popup-btn");
        let span = this.shadowRoot.getElementById("close-btn");

        btn.onclick = () => {
            modal.style.display = "block";
        };
        span.onclick = () => {
            modal.style.display = "none";
        };
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        //-----------------------------------------------------------------------
        let uploadData = [];
        let fileURL, coverURL;

        this.$audioFile.addEventListener("change", (e) => {
            let file = e.target.files[0];
            console.log(file);
            uploadData.push({ item: file, fileType: "audio" });
        });
        this.$coverImg.addEventListener("change", (e) => {
            let file = e.target.files[0];
            console.log(file);
            uploadData.push({ item: file, fileType: "image" });
        });
        this.$fileSubmitBtn.onclick = async () => {
            fileURL = await this.uploadFile(
                uploadData[0].item,
                uploadData[0].fileType
            );
            coverURL = await this.uploadFile(
                uploadData[1].item,
                uploadData[1].fileType
            );
            await this.addData(
                fileURL,
                coverURL,
                this.$songName.value,
                this.$artistName.value
            );
            alert("Upload complete");
            this.resetForm();
        };
    }
    async uploadFile(file, fileType) {
        const ref = firebase.storage().ref();
        let metadata = {
            contentType: file.type,
        };

        let task;
        if (fileType === "image") {
            task = await ref.child("image/" + file.name).put(file, metadata);
        }
        if (fileType === "audio") {
            task = await ref.child("audio/" + file.name).put(file, metadata);
        }
        let url = await task.ref.getDownloadURL();
        return url;
    }

    async addData(fileURL, imageURL, songName, artistName) {
        let currentUser = getCurrentUser();
        console.log(fileURL, imageURL, songName, artistName);
        await firebase
            .firestore()
            .collection("songsData")
            .add({
                file: fileURL,
                coverImage: imageURL,
                songName: songName,
                artist: artistName,
                isOwned: currentUser.id || "anonymous",
            });
    }
    resetForm() {
        this.$audioFile.value = "";
        this.$coverImg.value = "";
        this.$songName.value = "";
        this.$artistName.value = "";
        location.reload();
    }
    async readData() {
        let result = await firebase.firestore().collection("songsData").get();
        console.log(result.docs);
        result.docs.forEach(function (doc) {
            console.log(doc.data());
        });
    }
}

window.customElements.define("upload-form", UploadForm);
