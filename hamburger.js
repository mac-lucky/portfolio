const burger = document.getElementById("burger");
const nav = document.querySelector(".mobile");

function handleClick(e) {
  this.classList.toggle("active");
  nav.classList.toggle("show");
}

burger.addEventListener("click", handleClick);
