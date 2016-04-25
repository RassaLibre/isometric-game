export default class Color{

	/**
	*
	*/
	constructor(r, g, b){
		this.r = r;
		this.g = g;
		this.b = b;
	}

	/**
	*
	*/
	getPrimaryColor(){
	  return "rgb("+this.r+", "+this.g+", " +this.b+ ")";
	};

	/**
	*
	*/
	getSecondaryColor(){
	  return "rgb("
	    +parseInt(this.r * 0.735)+", "
	    +parseInt(this.g* 0.735)+", "
	    +parseInt(this.b* 0.735)+ ")";
	};

	/**
	*
	*/
	getTertiaryColor(){
	  return "rgb("
	    +parseInt(this.r + (0.25 * (255 - this.r)))+", "
	    +parseInt(this.g + (0.25 * (255 - this.g)))+", "
	    +parseInt(this.b + (0.25 * (255 - this.b)))+ ")"; 
	};

}