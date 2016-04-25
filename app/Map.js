/**
*	This class represets the map. Its purpose is to provide API for
*	accessing the map layers.
*/
export default class Map{

	/**
	*	@param {[[[String]]]} layers
	*/
	constructor(layers){
		this.layers = layers;
	}

	/**
	*	@param {Int} x
	*	@param {Int} y
	*	@return {[String]} returns an array of chars representing
	*	content at [x,y]
	*/
	getCharsAt(x, y){
		let objects = [];
		for(let layer of this.layers){
			if(layer[y] && layer[y][x]){
				objects.push(layer[y][x]);
			}
		}
		return objects;
	}

	/**
	*	@param {Int} x
	*	@param {Int} y
	*	@return {String} returns a char representing the top most tile
	*/
	getTheTopCharAt(x, y){
		let i = this.layers.length;
		while(i--){
			if(this.layers[i][y] && this.layers[i][y][x]){
				return this.layers[i][y][x];
			}
		}
		return null;
	}

	/**
	*	The function returns the size of the map in tiles.
	*	@return {Object} in tiles
	*/
	getMapDimensions(){
		let dimensions = {width: 0, height: 0};
		this.layers.map((layer)=>{
			if(layer.length > dimensions.height)
				dimensions.height = layer.length;
			if(layer[0].length > dimensions.width)
				dimensions.width = layer[0].length;
		});
		return dimensions;
	}

};