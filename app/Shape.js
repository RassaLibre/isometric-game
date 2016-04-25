import Color from './Color';
import grahamScan from './grahamScan';

/**
*
*/
export default class Shape{

	/**
	*
	*/
	constructor(x, y, color){
		this.color = color;
		this.x = x;
		this.y = y;
		this.surfaces = [];
	}

	/**
	*	This function is used to get the outline of each element. This outline
	*	is then used to calculate if points are inside of this polygon or not
	*/
    getOutline(){
        if(!this.surfaces.length) return null;
        let pointsFromSurfaces = [];
        for(let surface of this.surfaces){
            pointsFromSurfaces = pointsFromSurfaces.concat(surface.points);
        }
        return grahamScan(pointsFromSurfaces);
    }

	/**
	*
	*/
	draw(){
		console.error('The draw method of the Shape class has not been overwritten');
	};

	/**
	*
	*/
	onClick(){
		this.color = new Color(255,215,0);
	}	

}