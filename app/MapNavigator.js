import Point from './Point';
import Surface from './Surface';
import _ from 'underscore';

export default class MapNavigator{

	/**
	*	@param {Renderer} renderer... because I need to be able to rerender
	*	the canvas in this class when the user scrolls the map
	*/
	constructor(renderer){

		/**
		*	I need to store the mousedown event because I later use it
		*	for my calculations in the mousemove function
		*/
		let mouseDownEvent = null;

		/**
		*	because I need to redraw the canvas from here and figure out
		*	which element I clicked on
		*/
		this.renderer = renderer;

		/**
		*	Used for calculation of the correct map movement
		*/
		let lastMoveX = 0;
		let lastMoveY = 0;

		/**
		*	This variable is here because I want to distinguish when the user
		*	just clicked on the map and when scrolled. It variable is used to
		*	track if the map has been scrolled or not.
		*/
		let hasMapMoved = false;

		/**
		*	I am storing the last applied transformation, because I will later
		*	use it in order to calculate where on map the user actually clicked
		*/
		this.transformationX = 0;
		this.transformationY = 0;

		window.addEventListener('resize',()=>{
			CANVAS.height = window.innerHeight;
      		CANVAS.width = window.innerWidth;
      		renderer.render();
		}, false);

		CANVAS.addEventListener('mousedown', (event) => {
			mouseDownEvent = event;
		});

		CANVAS.addEventListener('mousemove', _.throttle((event) => {
			if(mouseDownEvent){
				hasMapMoved = true;
				let deltaX = mouseDownEvent.clientX - event.clientX;
				let deltaY = mouseDownEvent.clientY - event.clientY;
				let transX = (deltaX - lastMoveX);
				let transY = (deltaY - lastMoveY);
				CANVAS_CONTEXT.save();
				CANVAS_CONTEXT.setTransform(1, 0, 0, 1, 0, 0);
				CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
				CANVAS_CONTEXT.restore();
				this.transformationX += transX;
				this.transformationY += transY;
				CANVAS_CONTEXT.transform(1, 0, 0, 1, transX, transY); 	//2 * for better feeling
				renderer.render();
				lastMoveX = deltaX;
				lastMoveY = deltaY;
			}
		}, 50));

		CANVAS.addEventListener('mouseup', (event) => {
			if(hasMapMoved){
				mouseDownEvent = null;
				lastMoveY = 0;
				lastMoveX = 0;
				hasMapMoved = false;
			}
			else{
				this.onMapClick(mouseDownEvent);
				mouseDownEvent = null;
				lastMoveY = 0;
				lastMoveX = 0;
			}
		});

		CANVAS.addEventListener('mouseout', (event) => {
			mouseDownEvent = null;
			lastMoveY = 0;
			lastMoveX = 0;
		});
	}

	/**
	*
	*/
	onMapClick(event){
		console.log('Click at x: ' + (event.clientX - this.transformationX) + ' y: ' + (event.clientY - this.transformationY));
		let point = new Point(event.clientX - this.transformationX, event.clientY - this.transformationY);
		point.draw2D();
		let element = this.renderer.getElementAt(point);
		console.log(element)
		if(element){
			element.onClick();
			CANVAS_CONTEXT.save();
			CANVAS_CONTEXT.setTransform(1, 0, 0, 1, 0, 0);
			CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
			CANVAS_CONTEXT.restore();
			this.renderer.render();
		}
	}

	/**
	*
	*/
	gettransformationX(){
		return this.transformationX;
	}

	/**
	*
	*/
	gettransformationY(){
		return this.transformationY;
	}

}