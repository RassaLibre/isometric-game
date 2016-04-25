import Cube from './Cube';
import Color from './Color';
import Pyramid from './Pyramid';
import Renderer from './Renderer';
import MapNavigator from './MapNavigator';
import Tree from './Tree';
import Grass from './Grass';
import Water from './Water';
import Player from './Player';
import MapLoader from './MapLoader';
import Map from './Map';
import Rock from './Rock';
import Viewport from './Viewport';

let grassGreen = new Color(230,245,226)
let colorBlue = new Color(1,202,254);
let threeGreen = new Color(0,92,9);
let grey = new Color(211,211,211);
let pyramid = new Pyramid(200, 20, CUBE_SIZE * 1, threeGreen);

let player = new Player(40, 280);

let viewport = new Viewport();

/**
*	Load the map from the file
*/
let mapLoader = new MapLoader();
mapLoader.loadMapFromFile("/maps/map1.json").then(
	(mapLayers)=>{
		let renderer = new Renderer(viewport);
		let map = new Map(mapLayers);
		for(let mapLayer of map.layers){
			renderer.registerMap(mapLayer);
		}
		console.log("Map dimensions: ", map.getMapDimensions());

		/**
		*	register the tiles available for the map and render the scene
		*/
		renderer.registerTile("W", Water);
		renderer.registerTile("G", Grass);
		renderer.registerTile("T", Tree);
		renderer.registerTile("R", Rock);
		renderer.render();

		/**
		*	Make it possible to move with the map on drag and drop
		*/
		new MapNavigator(renderer);

	});
