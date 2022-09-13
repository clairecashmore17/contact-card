import "./form";
import "./submit";
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
import Gon from "../images/gon.jpg";
//bootstrap imports
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//CSS
import "../css/index.css";

window.addEventListener("load", function () {
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
  document.getElementById("gonThumbnail").src = Gon;
});
