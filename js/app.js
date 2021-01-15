import NavbarContainer from "./components/navbarContainer.js";
import LandingPage from "./components/landingPage.js";
import MusicPlayerContainer from "./components/musicPlayerContainer.js";
import ItemList from "./components/itemListContainer.js";
import data from "./components/fakeData.js";
import PopupForm from "./components/popupForm.js";

let $root = document.getElementById("root");

let $itemList = new ItemList(data);

$root.appendChild($itemList);
