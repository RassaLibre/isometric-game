import Surface from './Surface';
import Point from './Point';

export default class Renderer{

	/**
	*	@param {Viewport} viewport
	*/
	constructor(viewport){
		this.registeredMaps = new Set();
		this.registeredTiles = new Map();
		this.viewport = viewport;
		this.generatedObjects = [];
	}

	/**
	*	@param {Array<number,Array>} map
	*/
	registerMap(map){
		this.registeredMaps.add(map);
	}

	/**
	*	Registers a new shape under a character connected to the tile
	*	@param {String} character
	*	@param {Shape} shape 
	*/	
	registerTile(character, shape){
		this.registeredTiles.set(character, shape);
	}

	/**
	*	Returns an element that lies on the given coordinates
	*	@param {Point} point
	*/
	getElementAt(point){
		let numberOfLayers = this.generatedObjects.length;
		let i = numberOfLayers;
		while(i--){
			let mapToBeSearched = this.generatedObjects[i];
			let numberOfRows = mapToBeSearched.length;
			let j = numberOfRows;
			while(j--){
				let rowToBeSearched = this.generatedObjects[i][j];
				let numberOfElements = rowToBeSearched.length;
				let k = numberOfElements;
				while(k--){
					let elementToBeSearched = this.generatedObjects[i][j][k];
					if(!elementToBeSearched) continue;
					let isIn = elementToBeSearched.getOutline().isPointInside(point);
					if(isIn) return elementToBeSearched;
				}
			}
		}
	}

	/**
	*
	*/
	render(){
		Array.from(this.registeredMaps).forEach((map, mapIndex)=>{
			if(!this.generatedObjects[mapIndex]) this.generatedObjects[mapIndex] = [];
			map.map((row, rowIndex)=>{
				if(!this.generatedObjects[mapIndex][rowIndex]) this.generatedObjects[mapIndex][rowIndex] = [];
				row.map((tile, tileIndex)=>{
					let shape = this.registeredTiles.get(tile);
					if(shape){
						if(this.generatedObjects[mapIndex][rowIndex][tileIndex]){
							let x = this.generatedObjects[mapIndex][rowIndex][tileIndex].x;
							let y = this.generatedObjects[mapIndex][rowIndex][tileIndex].y;
							if(this.viewport.isInsideViewport(new Point(x, y))){
								this.generatedObjects[mapIndex][rowIndex][tileIndex].draw();
							}
						}
						else{
							let x = (tileIndex - mapIndex) * CUBE_SIZE;
							let y = (rowIndex - mapIndex) * CUBE_SIZE;
							if(this.viewport.isInsideViewport(new Point(x, y))){
								this.generatedObjects[mapIndex][rowIndex][tileIndex] = 
									new shape(x, y);
								this.generatedObjects[mapIndex][rowIndex][tileIndex].draw();
							}
						}
					}
					else if(tile !== "0"){
						console.warn("The map with index " + mapIndex + " containes tile '" + tile + "'. This tile is not registered in the renderer.");
					}
				});
			});
		});
	}

}