document.onreadystatechange = function (){if (document.readyState === 'complete')startChecks();}
if (typeof console == "undefined") {
	if (typeof external == "undefined")
    	this.console = { log: function (msg) { /*alert(msg);*/ } };
    else this.console = { log: function (msg) { external.log(msg); } };
}
//polifills
document.getElementsByClassName = function(cl) {
  var retnode = [];
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    if((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1) retnode.push(elem[i]);
  }
  return retnode;
}; 
function parseJSON(str) {
  return eval("(" + str + ")");
};
//for xmlhttp
function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        return null;
      }
    }
  }
};
function checkBody() {
	if(document.body) {console.log("correct");startChecks();}
	else {console.log("no");setTimeout(checkPrompt(), 3000);}
};
function FP_swapImg() {//v1.0
 var doc=document,args=arguments,elm,n; doc.$imgSwaps=new Array(); for(n=2; n<args.length;
 n+=2) { elm=FP_getObjectByID(args[n]); if(elm) { doc.$imgSwaps[doc.$imgSwaps.length]=elm;
 elm.$src=elm.src; elm.src=args[n+1]; } }
}
function FP_getObjectByID(id,o) {//v1.0
 var c,el,els,f,m,n; if(!o)o=document; if(o.getElementById) el=o.getElementById(id);
 else if(o.layers) c=o.layers; else if(o.all) el=o.all[id]; if(el) return el;
 if(o.id==id || o.name==id) return o; if(o.childNodes) c=o.childNodes; if(c)
 for(n=0; n<c.length; n++) { el=FP_getObjectByID(id,c[n]); if(el) return el; }
 f=o.forms; if(f) for(n=0; n<f.length; n++) { els=f[n].elements;
 for(m=0; m<els.length; m++){ el=FP_getObjectByID(id,els[n]); if(el) return el; } }
 return null;
}
function changeHomedir(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
	if(typeof document.getElementById("toChange") != "null"){
		bc1 = document.getElementById("home").href
		document.getElementById("home").href = document.getElementById("toChange").href
		document.getElementById("toChange").href = bc1
		document.getElementById("toChange").innerHTML = "Home"
		document.getElementById("toChange").className = "menu"
	}
}
function mobileCheck(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		if(document.getElementById("darkH1")!=null){
			document.getElementById("title").innerHTML = document.getElementById("darkH1").innerHTML
			document.getElementById("darkH1").outerHTML = "";
			document.getElementById("body").style.maxWidth="";
			document.getElementById("home").innerHTML="<img border=\"0\" id=\"img4\" src=\"http://digitix08.github.io/repository/images/buttons/back_cmp_aftrnoon000_back.gif\" style=\"height:21; width:100;\" alt=\"Back\" onmouseover=\"FP_swapImg(1,0,/*id*/'img4',/*url*/'http://digitix08.github.io/repository/images/buttons/back_cmp_aftrnoon000_back_p.gif')\" onmouseout=\"FP_swapImg(0,0,/*id*/'img4',/*url*/'http://digitix08.github.io/repository/images/buttons/back_cmp_aftrnoon000_back.gif')\" onmousedown=\"FP_swapImg(1,0,/*id*/'img4',/*url*/'http://digitix08.github.io/repository/images/buttons/back_cmp_aftrnoon000_back_p_s.gif')\" onmouseup=\"FP_swapImg(0,0,/*id*/'img4',/*url*/'http://digitix08.github.io/repository/images/buttons/back_cmp_aftrnoon000_back_p.gif')\"/>"
			}
		}
}
function checkPrompt() {
	var prompt = getCookie("prompt");
	if(prompt != "accept"){
		var newDiv = document.createElement("div");
		newDiv.id= "prompt";
		document.getElementsByTagName("body")[0].appendChild(newDiv);
		document.getElementById("prompt").innerHTML += "To use &quot;premium&quot; features such as dark theme you <strong>MUST</strong> agree to save <strong>LOCAL</strong> cookies containing the theme preference";
		document.getElementById("prompt").innerHTML += "<br>Do you want to use cookies?";
		document.getElementById("prompt").innerHTML += "<br><img id=\"img2\" alt=\"Yes\" fp-style=\"fp-btn: Border Bottom 2; fp-font-size: 20\" fp-title=;\"Yes\" height=\"40\" tabindex=\"0\" onkeypress=\"promptRemove(1)\" onclick=\"promptRemove(1)\" onmousedown=\"FP_swapImg(1,0,/*id*/'img2',/*url*/'https://digitix08.github.io/repository/images/buttons/button14.jpg')\" onmouseout=\"FP_swapImg(0,0,/*id*/'img2',/*url*/'https://digitix08.github.io/repository/images/buttons/button1E.jpg')\" onmouseover=\"FP_swapImg(1,0,/*id*/'img2',/*url*/'https://digitix08.github.io/repository/images/buttons/button1F.jpg')\" onmouseup=\"FP_swapImg(0,0,/*id*/'img2',/*url*/'https://digitix08.github.io/repository/images/buttons/button1F.jpg')\" src=\"https://digitix08.github.io/repository/images/buttons/button1E.jpg\" style=\"border: 0\" width=\"200\">";
		document.getElementById("prompt").innerHTML += "<img id=\"img3\" alt=\"No\" fp-style=\"fp-btn: Border Bottom 3; fp-font-size: 20\" fp-title=\"No\" height=\"40\" tabindex=\"0\" onkeypress=\"promptRemove(1)\" onclick=\"promptRemove(0)\" onmousedown=\"FP_swapImg(1,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/button1D.jpg')\" onmouseout=\"FP_swapImg(0,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/button1B.jpg')\" onmouseover=\"FP_swapImg(1,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/button1C.jpg')\" onmouseup=\"FP_swapImg(0,0,/*id*/'img3',/*url*/'https://digitix08.github.io/repository/images/buttons/button1C.jpg')\" src=\"https://digitix08.github.io/repository/images/buttons/button1B.jpg\" style=\"border: 0\" width=\"200\">"
		document.getElementById("prompt").className= "prompt";
	}
};
function getTheme(){
	var darkmode = getCookie("dark");
	if (darkmode == "yes")return "yes";
	if (darkmode == "black")return "black";
	if (darkmode == "no")return "no";
	if (typeof window.matchMedia != "undefined"){
		var mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
		var isDarkMode = mediaQueryObj.matches;
		if (isDarkMode){
			if(darkmode.indexOf("black")!=-1)return "black";
			return "yes";
		}
	}
	return "no";
}
function tabCheck(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )return;
	else{
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(width < 995&&document.getElementsByClassName("menu").length>0){console.log("narrow view (" + width + "px)")
		var n=document.getElementsByClassName("menu"),m=document.getElementsByClassName("menucurrent"),i
		if (!Math.trunc) {
		Math.trunc = function (v) {
			return v < 0 ? Math.ceil(v) : Math.floor(v);
			};
		}
		var nr=Math.trunc(width/6)-20 + "px"
		isTD = false
		console.log(nr);console.log(n[5].innerHTML);
		for(i=0; i<n.length; i++){
			if(n[i].tagName == "A")n[i].style.width=nr;
			else if(n[i].tagName == "TD" && !isTD){n[i].style.width=nr; isTD = true;}
			if(n[i].innerHTML=="Photo Gallery")n[i].innerHTML="Gallery";
			else if(width < 400&&n[i].innerHTML=="Minecraft srvrs")n[i].innerHTML="MC";
			else if(n[i].innerHTML=="Minecraft srvrs")n[i].innerHTML="MC srv";
		}
		if(m.length>0){
			m[0].style.width=nr;
			if(width < 400&&m[0].innerHTML=="Minecraft srvrs")m[0].innerHTML="MC";
			else if(m[0].innerHTML=="Minecraft srvrs")m[0].innerHTML="MC srv";
			if(m[0].innerHTML=="Index casete")m[0].innerHTML="Casete";
		}
	}}
}
function startChecks(){
	console.log("page start code, width is " + window.innerWidth);
	mobileCheck();
	checkPrompt();
	//tabCheck();
}
function setCookie(cname, cvalue, exdays){
	if (exdays!=null&&exdays.toString().indexOf("actualdate+") != -1){
		console.log("actual date");
		exdays = exdays.substring(11)
		console.log(exdays);
		var expires = "expires="+ exdays;
		console.log(expires)
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	else{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
};
function getCookie(cname) {
	var name=cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookie=decodedCookie.split(';');
	for(var i=0; i<cookie.length;i++){
		var c=cookie[i];
		while (c.charAt(0)==' '){
			c=c.substring(1);
		}
		if(c.indexOf(name)==0){
			return c.substring(name.length, c.length);
		}
	}	
	return"";
};
function checkCookie(){
	if (darkmode == "yes"){
		var elements = document.getElementsByName("lnk");
		for (var i = 0; i < elements.length; i++) {
 			elements[i].style.color = "#AAB3FF";
		}
	}
};
function promptRemove(yes) {
	if(yes){
		document.getElementById("prompt").outerHTML = "";
		setCookie("prompt", "accept", 90);
		console.log("yes");
	}
	else {
		document.getElementById("prompt").outerHTML = "";
	}
};
function tab(e){
	var tabPressed = false;
	if(e.keyCode == 9) {
		tabPressed = true;
	}
}
function FP_swapImg() {//v1.0
	var doc=document,args=arguments,elm,n;
	doc.$imgSwaps=new Array();
	for(n=2; n<args.length;n+=2) {
		elm=FP_getObjectByID(args[n]);
		if(elm) {
			doc.$imgSwaps[doc.$imgSwaps.length]=elm;
			elm.$src=elm.src;
			elm.src=args[n+1];
		}
	}
}
function FP_getObjectByID(id,o) {//v1.0
	var c,el,els,f,m,n;
	if(!o)o=document;
	if(o.getElementById) el=o.getElementById(id);
	else if(o.layers) c=o.layers;
	else if(o.all) el=o.all[id];
	if(el) return el;
	if(o.id==id || o.name==id) return o;
	if(o.childNodes) c=o.childNodes;
	if(c)
		for(n=0; n<c.length; n++) {
			el=FP_getObjectByID(id,c[n]);
			if(el) return el;
		}
	f=o.forms;
	if(f)
		for(n=0; n<f.length; n++) {
			els=f[n].elements;
			for(m=0; m<els.length; m++){
				el=FP_getObjectByID(id,els[n]);
				if(el) return el;
			} 
		}
	return null;
}