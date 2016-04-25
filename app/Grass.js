import Cube from './Cube';
import Color from './Color';

export default class Grass extends Cube{

	constructor(x, y){
		//let color = new Color(230,245,226);
		let color = new Color(109, 185, 102);
		super(x, y, color);
	}

}