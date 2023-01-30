/*fade out header on scroll*/

let header = document.querySelector("#particles-js");
window.addEventListener("scroll", function () {
  let value = 1 + window.scrollY / -400;
  header.style.opacity = value;
});

/*Copy to clipboard*/


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


const target = window.document.getElementById('neon');

const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both ">${letter}</span>`
const colorLetter = letter => `<span style="color: hsla(${Math.random()*360}, 100%, 80%, 1);">${letter}</span>`;
const flickerAndColorText = text => 
  text
    .split('')
    .map(flickerLetter)
    .map(colorLetter)
    .join('');
const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);


neonGlory(target);
target.onclick = ({ target }) =>  neonGlory(target);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      neonGlory(entry.target);
      observer.disconnect();
    }
  });
});
observer.observe(target);
