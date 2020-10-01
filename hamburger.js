const burger = document.getElementById("burger");
const nav = document.querySelector(".mobile");
const body = document.querySelector("body");

function handleClick(e) {
  this.classList.toggle("active");
  nav.classList.toggle("show");

  if (this.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

burger.addEventListener("click", handleClick);
