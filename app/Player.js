import Cube from './Cube';
import Color from './Color';

export default class Player extends Cube{

	constructor(x, y){
		console.log(x,y)
		let color = new Color(255, 0, 0);
		super(x, y, color);
	}

}