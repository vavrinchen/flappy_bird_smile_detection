function Pipe(canvas, context) {
    this.spacing = 205;
    this.top = Math.random() * (canvas.height/4 - canvas.height / 15) + (canvas.height / 15)
    this.bottom = canvas.height - (this.top + this.spacing);
    this.x = canvas.width;
    this.w = 80;
    this.speed = 8;
    this.highlight = false;

    this.hit = function (bird) {
        if (bird.y + bird.radius < this.top || bird.y > canvas.height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.show = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (this.highlight) {
            ctx.fillStyle = "#FF0000";
        } else {
            ctx.fillStyle = "#000000";
        }
        context.fillRect(this.x, 0, this.w, this.top);
        context.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    };

    this.update = function () {
        this.x -= this.speed;
    };

    this.offscreen = function () {
        if (this.x < 0) {
            return true;
        } else {
            return false;
        }
    };
}