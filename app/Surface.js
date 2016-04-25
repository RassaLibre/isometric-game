/**
*   This class represents a surface colored in a certain color
*   on the canvas.
*/
export default class Surface{

    /**
    *   @param {Array<Point>} points
    *   @param {String} color
    *   @param {String?} strokeColor
    *   @param {Number?} strokeWidth
    */
    constructor(points, color, strokeColor = undefined, strokeWidth = undefined){
        this.points = points;
        this.color = color;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    /**
    *   Compares the coordinates of the point to the iso coordinates
    *   of this surface.
    *   @param {Point}
    */
    isPointInside(pt){
        for(var c = false, i = -1, l = this.points.length, j = l - 1; ++i < l; j = i)
            ((this.points[i].getIsoY() <= pt.y && pt.y < this.points[j].getIsoY()) || (this.points[j].getIsoY() <= pt.y && pt.y < this.points[i].getIsoY()))
            && (pt.x < (this.points[j].getIsoX() - this.points[i].getIsoX()) * (pt.y - this.points[i].getIsoY()) / (this.points[j].getIsoY() - this.points[i].getIsoY()) + this.points[i].getIsoX())
            && (c = !c);
        return c;
    }

    /**
    *   Draws the surface on a canvas
    */
    draw(){
        if(!this.points.length) return null;
        CANVAS_CONTEXT.beginPath();
        CANVAS_CONTEXT.moveTo(
            this.points[0].getIsoX(),
            this.points[0].getIsoY()
        );
        for(let point of this.points){
            CANVAS_CONTEXT.lineTo(point.getIsoX(), point.getIsoY());
        }
        //close the shape
        CANVAS_CONTEXT.lineTo(
            this.points[0].getIsoX(),
            this.points[0].getIsoY()
        );
        if(this.strokeColor && this.strokeWidth){
            CANVAS_CONTEXT.strokeWidth = this.strokeWidth;
            CANVAS_CONTEXT.strokeStyle = this.strokeColor;
            CANVAS_CONTEXT.stroke();
        }
        CANVAS_CONTEXT.fillStyle = this.color;
        CANVAS_CONTEXT.fill();
        CANVAS_CONTEXT.closePath();
    }
}