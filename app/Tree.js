import Pyramid from './Pyramid';
import Color from './Color';

export default class Tree extends Pyramid{

	constructor(x, y){
		let colors = [
			new Color(0, 82, 33),
			new Color(26, 102, 46),
			new Color(42, 111, 55),
			new Color(24, 134, 45),
			new Color(21, 119, 40)
		];
		let colorIndex = Math.floor(Math.random() * (colors.length - 1));
		super(x, y, colors[colorIndex]);
	}

}