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
    'Hi, My name is<br><span style="color: #f5c708;">TESTT</span> <br>I develop'
  )
  .pauseFor(100)
  .deleteChars(7)
  .typeString(
    'am <br>DevOps Engineer'
  )
  .start();
