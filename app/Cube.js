import Shape from './Shape';
import Surface from './Surface';
import Point from './Point';

/**
*
*/
export default class Cube extends Shape{

    /**
    *
    */
    constructor(x, y, color, size = CUBE_SIZE){
        super(x, y, color);
        this.size = size;
    }
    
    /**
    *
    */
    draw(){
        let top = new Surface([
                new Point(this.x, this.y),
                new Point(this.x, this.y + this.size),
                new Point(this.x + this.size, this.y + this.size),
                new Point(this.x + this.size, this.y)
            ], this.color.getPrimaryColor(), this.color.getPrimaryColor(), 1);
        let left = new Surface([
                new Point(this.x, this.y + this.size),
                new Point(this.x + this.size, this.y + 2 * this.size),
                new Point(this.x + 2 * this.size, this.y + 2 * this.size),
                new Point(this.x + this.size, this.y + this.size)
            ], this.color.getSecondaryColor());
        let right = new Surface([
                new Point(this.x + this.size, this.y + this.size),
                new Point(this.x + 2 * this.size, this.y + 2 * this.size),
                new Point(this.x + 2 * this.size, this.y + this.size),
                new Point(this.x + this.size, this.y)
            ], this.color.getTertiaryColor());
        top.draw();
        left.draw();
        right.draw();
        this.surfaces = [top, left, right];
    }
};