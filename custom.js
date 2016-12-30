var person;
var terrainObjects = [];
var scoreBoard;
var score = 0;
var difficultyModifier = 0;
var bg;

function setup() {
	bg = loadImage("assets/background.jpg");
	createCanvas(640, 360);
	createScoreBoard();
	person = new Person();
	terrainObjects.push(new TerrainObject(0));
}

function createScoreBoard() {
	scoreBoard = createElement('h2', '');
	updateScoreBoard();
	scoreBoard.style('color', 'white');
	scoreBoard.style('background-color', 'black');
	scoreBoard.position(20, 5);
}

function updateScoreBoard() {
	scoreBoard.html('SCORE: ' + score)
}

function checkDifficulty() {
	// switch (score) {
	// 	case 100:
	// 		difficultyModifier = 2;
	// 		break;
	// 	case 500:
	// 		difficultyModifier = 4;
	// 		break;
	// 	case 1000:
	// 		difficultyModifier = 20;
	// 		break;
	// 	case 10000:
	// 		difficultyModifier = 40;
	// 		break;
	// 	case 50000:
	// 		difficultyModifier = 80;
	// 		break;
	// }
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
	var gravity = createVector(0, 0.25);
	person.applyForce(gravity);
	translate(-person.pos.x + 50, 0);
}

function moveTerrainObjects() {
	for (var i = terrainObjects.length - 1; i >= 0; i--) {
		terrainObjects[i].show();
		terrainObjects[i].updatePosition();
		//console.log(terrainObjects[i].hits(person));
		if (terrainObjects[i].isHit(person)) {
			console.log('hit');
		} else if (terrainObjects[i].isCleared(person)) {
			score += 100;
			checkDifficulty();
			updateScoreBoard();
		}

		if (terrainObjects[i].isOffScreen()) {
			terrainObjects.splice(i, 1);
		}
	}
}

function addObjectsBasedOnFrameCount() {
	if (frameCount % (60) == 0) {
		terrainObjects.push(new TerrainObject(difficultyModifier));
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
	background(bg);

	applyPhysics();

	moveTerrainObjects();

	managePerson();

	addObjectsBasedOnFrameCount();

	//test terrain object
	//fill(255, 0, 100);
	//rect(400, height - 25, 25, 25);
}