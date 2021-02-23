var txt = document.getElementById("txt");

var typewriter = new Typewriter(txt, {
  cursorClassName: "typeCursor",
  wrapperClassname: "content h1",
  autoStart: true,
  cursor: "|",
  delay: 80,
});

typewriter
  .pauseFor(500)
  .typeString(
    'Hi, my name is<br><span style="color: #f5c708;">Maciej Ked</span>'
  )
  .pauseFor(100)
  .deleteChars(3)
  .typeString(
    '<span style="color: #f5c708;">Kędziora</span><br>I program websites &<br>microcontrollers'
  )
  .start();
