import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
import Gon from "../images/gon.jpg";
//bootstrap imports
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//CSS
import "../css/index.css";

//importing db
import { initdb, getDb, postDb } from "./database";
// card import
import { fetchCards } from "./cards";
//form import
import { toggleForm, clearForm } from "./form";

window.addEventListener("load", function () {
  initdb();
  getDb();
  postDb("Claire", "claire@gmail.com", "5555555555", "Gon");
  getDb();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
  document.getElementById("gonThumbnail").src = Gon;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});
