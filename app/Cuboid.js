import Shape from './Shape';
import Surface from './Surface';
import Point from './Point';

/**
*
*/
export default class Cuboid extends Shape{

    /**
    *   @param {Number} x
    *   @param {Number} y
    *   @param {Color} color
    *   @param {Number?} height
    *   @param {Number?} size
    */
	constructor(x, y, color, height = 2 * CUBE_SIZE, size = CUBE_SIZE){
		super(x, y, color);
		this.height = height;
        this.size = size;
	}

    /**
    *
    */
	draw(){
        let top = new Surface([
                new Point(this.x + this.size - this.height, this.y + this.size - this.height),
                new Point(this.x + this.size - this.height, this.y + 2 * this.size - this.height),
                new Point(this.x + 2 * this.size - this.height, this.y + 2 * this.size - this.height),
                new Point(this.x + 2 * this.size - this.height, this.y + this.size - this.height)
            ], this.color.getPrimaryColor(), this.color.getPrimaryColor(), 1);
        let left = new Surface([
                new Point(this.x + this.size, this.y + 2 * this.size),
                new Point(this.x + 2 * this.size, this.y + 2 * this.size),
                new Point(this.x + 2 * this.size - this.height, this.y + 2 * this.size - this.height),
                new Point(this.x + this.size - this.height, this.y + 2 * this.size - this.height)
            ], this.color.getSecondaryColor());
        let right = new Surface([
                new Point(this.x + 2 * this.size, this.y + 2 * this.size),
                new Point(this.x + 2 * this.size, this.y + this.size),
                new Point(this.x + 2 * this.size - this.height, this.y + this.size - this.height),
                new Point(this.x + 2 * this.size - this.height, this.y + 2 * this.size - this.height)
            ], this.color.getTertiaryColor());
        top.draw();
        left.draw();
        right.draw();
        this.surfaces = [top, left, right];
	}

}