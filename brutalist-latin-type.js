// Distortion of Brutalist-inspired Letters //
// by Riyash Lughmani //

// pls ignore my excessive notes, it keeps me on track with my lines of code (as of now) //


// global variable section
let brutalistTypeface; // variable for font
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); // variable for letters (before selection)
let letterBoxes = []; // variable for letters in their boxes
let letterPoints = []; // variable for letter points
let boxSize = 30; // variable for box size


// distortion of letters variable section
let brutalistTypefaceSize = 200; // variable for letter size
let distortedPoints = []; // variable for distortion
let selectedLetter = null; // variable for the chosen letter
let dragStart; // variable for dragging the letter
let isDragging = false; // variable for dragging the letter


function preload() {
  // typeface loader to use throughout the entire code
  brutalistTypeface = loadFont('assets/BrutalistLatinCoding-Regular.ttf'); // brutalist typeface file
}


function setup() {
  createCanvas(windowWidth, windowHeight); // canvas size fills whole screen

  textFont(brutalistTypeface); // typeface will display as brutalist typeface file
  textSize(boxSize - 10); // positioning of the main letter before distortion
  textAlign(CENTER, CENTER); // positioning the main letter before distortion
  createLetterBoxes(); // function for letter boxes
}


function createLetterBoxes() {
  let cols = 26; // 26 boxes horizontal
  let margin = 10; // spacing between the boxes
  let row1Y = height - boxSize * 2 - 20; // box size
  let row2Y = height - boxSize - 5; // box size

  for (let i = 0; i < letters.length; i++) { // for loop for letter boxes
    let x = (i % cols) * (boxSize + margin) + margin; // ibid
    let y = i < 26 ? row1Y : row2Y; // ibid

    letterBoxes.push({
      letter: letters[i],
      x, y, w: boxSize, h: boxSize
    });
  }
}


function draw() {
  background(255); // colour of canvas

  textSize(30);
  text("Distortion of Brutalist inspired letters", width/2, 50);
  textSize(17);
  text("Riyash Lughmani", width/2, 100);
  textSize(20);
  text("Choose a letter", width/1.25, 930);
  text("Distort by dragging the body of the letter", width/1.25, 965);


  // draw the distorted letter
  if (selectedLetter !== null && distortedPoints.length > 0) {
    push(); // creates a new state
    translate(width / 2, height / 2 - 50); // adjusted so the letter stays above the boxes
    fill(0); // colour of text
    noStroke(); // text being displayed has no stroke
    beginShape(); // begins adding vertices to a custom shape
    for (let pt of distortedPoints) { // for loop for distortion
      vertex(pt.x, pt.y); // getting the chosen text to distort
    }
    endShape(CLOSE); // stops adding vertices to a custom shape
    pop(); // restores the state that is created by the previous push function
  }

  // letter selection boxes
  for (let box of letterBoxes) {
    stroke(10); // box stroke
    noFill(); // box internal colour
    rect(box.x, box.y, box.w, box.h); // box surrounding the letter choice

    fill(0); // text colour within box
    noStroke(); // text has no stroke
    text(box.letter, box.x + box.w / 2, box.y + box.h / 2); // box
  }
}


function mousePressed() {
  // clicking on the letter box
  for (let box of letterBoxes) { // for loop for choosing of letter in their box
    if (
      mouseX >= box.x && mouseX <= box.x + box.w && // ibid
      mouseY >= box.y && mouseY <= box.y + box.h // ibid
    ) {
      selectedLetter = box.letter; // choosing the letter
      generatePoints(selectedLetter); // gaining the chosen letter's body

      let letterOffset = createVector(width / 2, height / 2 - 50); // distortion
      dragStart = createVector(mouseX - letterOffset.x, mouseY - letterOffset.y); // distortion
      isDragging = true; // distortion
      return; // end of distortion
    }
  }

  // clicking elsewhere on the letter
  if (selectedLetter !== null) { // means not equal
    let letterOffset = createVector(width / 2, height / 2 - 50); // letter offset
    dragStart = createVector(mouseX - letterOffset.x, mouseY - letterOffset.y); // letter offset
    isDragging = true;
  }
}


function mouseDragged() {
  // moving the chosen letter from the box
  if (!isDragging || selectedLetter === null) return;

  let letterOffset = createVector(width / 2, height / 2 - 50); // distortion
  let dragCurrent = createVector(mouseX - letterOffset.x, mouseY - letterOffset.y); // distortion
  let dragDelta = p5.Vector.sub(dragCurrent, dragStart); // distortion

  for (let i = 0; i < letterPoints.length; i++) { // for loop for distortion
    let bp = letterPoints[i]; // distortion
    let distToClick = dist(bp.x, bp.y, dragStart.x, dragStart.y); // distortion

    if (distToClick < 50) { // distortion
      distortedPoints[i].x = bp.x + dragDelta.x * (1 - distToClick / 50); // distortion
      distortedPoints[i].y = bp.y + dragDelta.y * (1 - distToClick / 50); // distortion
    }
  }
}


function mouseReleased() {
  isDragging = false;
}


function generatePoints(letter) {
  let pts = brutalistTypeface.textToPoints(letter, -100, 100, brutalistTypefaceSize, { // converts a letter into an array of vector points
    sampleFactor: 0.2
  });

  letterPoints = pts; // distortion
  distortedPoints = pts.map(p => ({ x: p.x, y: p.y })); // distortion
}


// END // END // END // END // END //
