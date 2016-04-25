import Shape from './Shape';
import Surface from './Surface';
import Point from './Point';

/**
*
*/
export default class Pyramid extends Shape{

        /**
        *       @param {Number} x
        *       @param {Number} y
        *       @param {Color} color
        *       @param {Number?} height
        *       @param {Number?} size
        */
	constructor(x, y, color, height = CUBE_SIZE, size = CUBE_SIZE){
                super(x, y, color);
                this.size = size;
		this.height = height; 
	}

	/**
        *
	*/
	draw(){
                let left = new Surface([
                        new Point(this.x - this.height + this.size, this.y - this.height + this.size),
                        new Point(this.x + this.size, this.y + this.size + this.size),
                        new Point(this.x + this.size + this.size, this.y + this.size + this.size)
                ], this.color.getSecondaryColor());
                let right = new Surface([
                        new Point(this.x - this.height + this.size, this.y - this.height + this.size),
                        new Point(this.x + this.size + this.size, this.y + this.size + this.size),
                        new Point(this.x + this.size + this.size, this.y + this.size)
                ], this.color.getTertiaryColor());
                left.draw();
                right.draw();
                this.surfaces = [left, right];
	}
}