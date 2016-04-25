/**
*	This class is used to load maps
*/
export default class MapLoader{

	/**
	*
	*/
	constructor(){}

	/**
	*	@param {String} pathToTheFile
	*	@return {[[[String]]]}
	*/
	loadMapFromFile(pathToTheFile){
		return fetch(pathToTheFile).then(
			(map)=>{
				return map.json();
			},
			(error)=>{
				throw new Error(error);
			});
	}

}