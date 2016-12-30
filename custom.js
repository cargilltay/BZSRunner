var person;
var terrainObjects = [];
var scoreBoard;
var score = 0;


function setup() {
	createCanvas(640, 360);
	createScoreBoard();
	person = new Person();
	terrainObjects.push(new TerrainObject());
}

function createScoreBoard() {
	scoreBoard = createElement('h2', '');
	updateScoreBoard();
	scoreBoard.style("color", "red");
	scoreBoard.position(20, 5);
}

function updateScoreBoard(){
	scoreBoard.html('SCORE: ' + score)
}

function keyPressed() {
	if (key == ' ') {
		//remove this if statement to basically get flappy bird physics 
		//if (person.pos.y == height) {
			person.jump();
		//}
	}
}

function applyPhysics() {
	var gravity = createVector(0, 0.1);
	person.applyForce(gravity);
	translate(-person.pos.x + 50, 0);
}

function moveTerrainObjects() {
	for (var i = terrainObjects.length - 1; i >= 0; i--) {
		terrainObjects[i].show();
		terrainObjects[i].update();
		//console.log(terrainObjects[i].hits(person));
		if (terrainObjects[i].isHit(person)) {
			console.log('hit');
		}

		else if (terrainObjects[i].isCleared(person)) {
			score += 100;
			updateScoreBoard();
		}

		if (terrainObjects[i].isOffScreen()) {
			terrainObjects.splice(i, 1);
		}
	}
}

function addObjectsBasedOnFrameCount() {
	if (frameCount % 100 == 0) {
		terrainObjects.push(new TerrainObject());
	}
}

function managePerson() {
	//for now doesnt do much, can modify their accel, horizontally in the future and update with this
	person.update();
	person.edges();
	person.display();
}

function draw() {
	background(51);

	applyPhysics();

	moveTerrainObjects();

	managePerson();

	addObjectsBasedOnFrameCount();

	//test terrain object
	//fill(255, 0, 100);
	//rect(400, height - 25, 25, 25);
}