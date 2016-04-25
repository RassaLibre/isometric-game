import graham from 'graham-fast';
import Point from './Point';
import Surface from './Surface';

/**
*	This function is used as a wrapper around the graham scan algorithm.
*	Graham scan algorithm is used for determining the boundary points
*	of shapes.
*	@param {Array<Number,Point>}
*	@return {Surface}
*/
export default function grahamScan(points){
	let pointsAsArray = [];
	for(let point of points){
		pointsAsArray.push(point.getIsoAsArray());
	}
	let results = graham(pointsAsArray);
	let arrayOfResultPoints = [];
	for(let point of results){
		arrayOfResultPoints.push(new Point(point[0], point[1], true));
	}
	return new Surface(arrayOfResultPoints, "transparent");
}