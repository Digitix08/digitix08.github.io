function noStock() {
	if(prompt != "accept"){
		const bigDiv = document.createElement("div");
		bigDiv.style= "position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 10000; background:rgba(0,0,0,0.6);";
		bigDiv.id= "noclick"
		document.getElementsByTagName("body")[0].append(bigDiv);
		const newDiv = document.createElement("div");
		newDiv.style= "position:relative; z-index: 1; top:45%; margin: auto; height:100px; text-align: center; width:300px; background-color: #C0C0C0;";
		newDiv.id= "prompt";
		document.getElementById("noclick").append(newDiv);
		document.getElementById("prompt").innerHTML += "<strong style=\"font-size: x-large; color: #FF0000;\">OUT OF STOCK</strong><br>";
		document.getElementById("prompt").innerHTML += "<img id=\"img3\" alt=\"No\" fp-style=\"fp-btn: Border Bottom 3; fp-font-size: 20\" fp-title=\"No\" height=\"40\" onclick=\"popupRemove()\" onmousedown=\"FP_swapImg(1,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/buttonD1.jpg')\" onmouseout=\"FP_swapImg(0,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/buttonB1.jpg')\" onmouseover=\"FP_swapImg(1,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/buttonC.jpg')\" onmouseup=\"FP_swapImg(0,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/buttonC.jpg')\" src=\"https://digitix08.github.io/repository/images/buttons/buttonB1.jpg\" style=\"border: 0\" width=\"200\">"
	}
};
function popupRemove() {
	document.getElementById("noclick").outerHTML = "";
};
