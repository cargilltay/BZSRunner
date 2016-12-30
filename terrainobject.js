function TerrainObject() {
	//height of objects
	this.heightMod = random(height / 2);
	this.x = width;
	this.w = 20;
	this.speed = 2;
	this.highLight = false;
	this.wasHit = false;
	this.wasCleared = false;

	this.show = function() {
		fill(255);
		if (this.highLight) {
			fill(255, 0, 0);
		}
		rect(this.x, height - this.heightMod, this.w, this.heightMod);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.isOffScreen = function() {
		return this.x < -this.w;
	}

	this.isHit = function(obj) {
		if (obj.pos.y > height - this.heightMod) {
			if ((obj.pos.x + obj.w) > this.x && obj.pos.x < this.x + this.w) {
				this.highLight = true;
				this.wasHit = true;
				return true;
			}
		}
		return false;
	}

	this.isCleared = function(obj) {
		if (this.x < obj.pos.x && !this.wasHit && !this.wasCleared) {
			this.wasCleared = true;
			return true;
		}
		return false;
	}
}