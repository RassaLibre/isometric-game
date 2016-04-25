import Cuboid from './Cuboid';
import Color from './Color';

export default class Rock extends Cuboid{

	constructor(x, y){
		let color = new Color(192, 192, 192);
		super(x, y, color);
	}

}