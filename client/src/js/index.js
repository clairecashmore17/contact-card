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
import { initdb, getDb, postDb, deleteDb, editDb } from "./database";
// card import
import { fetchCards } from "./cards";
//form import
import { toggleForm, clearForm } from "./form";

window.addEventListener("load", function () {
  initdb();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
  document.getElementById("gonThumbnail").src = Gon;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
const installBtn = document.getElementById("installBtn");
let submitBtnToUpdate = false;
let profileId;

//install button
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installBtn.style.visibility = "visible";

  installBtn.addEventListener("click", () => {
    event.prompt();
    installBtn.setAttribute("disabled", true);
    installBtn.textContent = "Installed!";
  });
});
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
});

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
    // Obtains values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
    editDb(profileId, name, email, phone, profile);

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

window.deleteCard = (e) => {
  //Grabs the id from the button element attache to the contact card
  let id = parseInt(e.id);
  //Delete the card
  deleteDb(id);
  // reload teh DOM
  fetchCards();
};

window.editCard = (e) => {
  // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
  profileId = parseInt(e.dataset.id);

  // Grabs information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  // Toggles the submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};

//Registering our service worker
if ("serviceWorker" in navigator) {
  //Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
