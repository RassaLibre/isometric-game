import Surface from './Surface';
import Point from './Point';

/**
*	Viewport represents the rectangle user see. It is used when rendering,
*	because then we can easily figure our if it makes sent to render the 
*	element (because it is in the viewport) or it does not (it is out of)
*	the viewport.
*/
export default class Viewport{

	/**
	*	
	*	@param {Number} x1
	*	@param {Number} x2
	*	@param {Number} y1
	*	@param {Number} y2
	*/
	constructor(
		x1 = 0,
		y1 = 0,
		x2 = window.innerWidth,
		y2 = window.innerHeight){
			this.x1 = x1;
			this.x2 = x2;
			this.y1 = y1;
			this.y2 = y2;

		let mouseDownEvent;

		let lastMoveEvent;

		CANVAS.addEventListener('mousedown', (event) => {
			mouseDownEvent = event;
		});

		CANVAS.addEventListener('mousemove', (event) => {
			if(mouseDownEvent){
				let deltaX, deltaY;
				if(!lastMoveEvent){
					deltaX = mouseDownEvent.clientX - event.clientX;
					deltaY = mouseDownEvent.clientY - event.clientY;
				}
				else{
					deltaX = lastMoveEvent.clientX - event.clientX;
					deltaY = lastMoveEvent.clientY - event.clientY;
				}
				this.x1 -= deltaX;
				this.x2 -= deltaX;
				this.y1 -= deltaY;
				this.y2 -= deltaY;
				lastMoveEvent = event;
			}
		});

		CANVAS.addEventListener('mouseup', (event) => {
			mouseDownEvent = null;
			lastMoveEvent = null;
		});
	}

	/**
	*	becase When I am rendering the map I always wants to check first
	*	if the rendered object is inside of the viewport and render it
	*	only if it is.
	*	@param {Point} pt
	*	@return {bool}
	*/
	isInsideViewport(pt) {
		let poly = this.getViewportAsArrayOfPoints();
	    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
	        ((poly[i].y <= pt.getIsoY() && pt.getIsoY() < poly[j].y) || (poly[j].y <= pt.getIsoY() && pt.getIsoY() < poly[i].y))
	        && (pt.getIsoX() < (poly[j].x - poly[i].x) * (pt.getIsoY() - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
	        && (c = !c);
	    return c;
	}

	/**
	*	Returns the current viewport as an instance of Surface
	*	@return {Surface}	
	*/
	getViewportAsSurface(){
		return new Surface([
			new Point(this.x1, this.y1),
			new Point(this.x1, this.y2),
			new Point(this.x2, this.y2),
			new Point(this.x2, this.y1)
		], "red");
	}

	/**
	*	@return {Array<Number, Point>}
	*/
	getViewportAsArrayOfPoints(){
		return [
			new Point(this.x1, this.y1),
			new Point(this.x1, this.y2),
			new Point(this.x2, this.y2),
			new Point(this.x2, this.y1)
		];
	}

}