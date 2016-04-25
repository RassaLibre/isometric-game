/**
*	This class represents one single point on canvas.
*	This point is described by x and y.
*/
export default class Point{

	/**
	*	@param {Number} x
	*	@param {Number} y
	*/
	constructor(x, y, isIso = false){
		if(isIso){
			this.y = (2 * y - x) / 2;
			this.x = x + this.y;
		}
		else{
			this.x = x;
			this.y = y;
		}
	}

	/**
	*	@return {Number}
	*/
	getIsoX(){
		return this.x - this.y;
	}

	/**
	*	@return {Number}
	*/
	getIsoY(){
		return (this.x + this.y) / 2;
	}

	/**
	*	@return {Array<Number, Number>}
	*/
	getIsoAsArray(){
		return [
			this.getIsoX(),
			this.getIsoY()
		];
	}

	/**
	*	Draws a circle on the canvas
	*	FOR DEBUG PURPOSES ONLY!
	*/
	draw2D(){
		CANVAS_CONTEXT.beginPath();
		CANVAS_CONTEXT.arc(
			this.x,
			this.y, 2, 0, 2 * Math.PI);
        CANVAS_CONTEXT.strokeWidth = 1;
        CANVAS_CONTEXT.strokeStyle = "blue";
        CANVAS_CONTEXT.stroke();
		CANVAS_CONTEXT.fillStyle = "red";
		CANVAS_CONTEXT.fill();
		CANVAS_CONTEXT.closePath();
	}

	/**
	*	Draws a circle on the canvas in ISO
	*	FOR DEBUG PURPOSES ONLY!
	*/
	drawIso(){
		CANVAS_CONTEXT.beginPath();
		CANVAS_CONTEXT.arc(
			this.getIsoX(),
			this.getIsoY(), 5, 0, 2 * Math.PI);
        CANVAS_CONTEXT.strokeWidth = 1;
        CANVAS_CONTEXT.strokeStyle = "blue";
        CANVAS_CONTEXT.stroke();
		CANVAS_CONTEXT.fillStyle = "red";
		CANVAS_CONTEXT.fill();
		CANVAS_CONTEXT.closePath();
	}

}