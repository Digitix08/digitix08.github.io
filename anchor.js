//this script is meant to detect site path for mobile/desktop redirects
//DO NOT MOVE FROM ROOT OF (sub)SITE
function rootcheck(sfolder){
	var path = window.location.pathname;
	var fileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	if(sfolder) fileName += sfolder;
	console.log(fileName);
	path = path.substring(0, path.length - fileName.length);
	return path;
}