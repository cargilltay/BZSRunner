function Person() {
	this.pos = createVector(50, height);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.img = loadImage("assets/BZSMan.png");

	this.jump = function() {
		var jump = createVector(0, -2.5);
		person.applyForce(jump);
		console.log(this.acc);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
		//console.log(this.acc)
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	}

	this.display = function() {
		fill(255);
		stroke(255);
		image(this.img, this.pos.x, this.pos.y - 50);
		this.w = this.img.width;
		this.h = this.img.height;
	}

	this.edges = function() {
		if (this.pos.y > height) {
			this.vel.y *= 0;
			this.pos.y = height;
		}
	}
}