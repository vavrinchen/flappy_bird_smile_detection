function Bird(canvas, context) {
    this.radius = 15;
    this.y = 150
    this.x = canvas.width / 2;
    this.gravity = 1.5;
    this.lift = -12;
    this.velocity = 0;

    this.show = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
    }

    this.up = function () {
        this.velocity += this.lift;
    };

    this.update = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocity = 0;
        }

        if (this.y < this.radius) {
            this.y = this.radius;
            this.velocity = 0;
        }
    };
    
}