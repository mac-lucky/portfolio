/*fade out header on scroll*/

let header = document.querySelector("#particles-js");
window.addEventListener("scroll", function () {
  let value = 1 + window.scrollY / -400;
  header.style.opacity = value;
});

/* Copy to clipboard */


function Clipboard_CopyTo(value) {
  var tempInput = document.createElement("input");
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied email to clipboard");
}

document.querySelector("#Copy").onclick = function () {
  Clipboard_CopyTo("maciejkedziora98@gmail.com");
};


