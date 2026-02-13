let run = false;
let theta;
let count;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(50);
  background("black");
  fill("palegreen");
  textFont("Courier New");
}

// adapted from https://processing.org/examples/tree.html
// replaced the mouseX with a frame counter
function tree() {
  background(0);
  frameRate(30);
  stroke(255);
  stroke("green");
  // start the "bloom" at the bottom, let it grow to the top
  let a = count++;
  // Convert it to radians
  theta = radians(a);
  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  // Draw a line 120 pixels
  let offset = -height / 3;
  strokeWeight(3);
  line(0, 0, 0, offset);
  // Move to the end of that line
  translate(0, offset);
  // Start the recursive branching!
  strokeWeight(1);
  stroke("pink");
  branch(-offset);
}

function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta); // Rotate by theta
    line(0, 0, 0, -h); // Draw the branch
    translate(0, -h); // Move to the end of the branch
    branch(h); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}

function draw() {
  if (run) {
    tree();
  } else {
    text("tap to bloom", width / 2, height / 2);
  }
}

function mousePressed() {
  count = 180;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    run = !fullscreen();
    fullscreen(run);
  }
}
