import Cube from './Cube';
import Color from './Color';

export default class Water extends Cube{

	constructor(x, y){
		let color = new Color(1, 202, 254);
		super(x, y, color);
	}

}