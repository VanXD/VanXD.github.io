var t_DiglogX,t_DiglogY,t_DiglogW,t_DiglogH;
var moveable=false;
function Browser(){
	 var ua, s, i;
	 this.isIE = false;
	 this.isNS = false;
	 this.isOP = false;
	 this.isSF = false;
	 ua = navigator.userAgent.toLowerCase();
	 s = "opera";
	 if ((i = ua.indexOf(s)) >= 0){
	 this.isOP = true;return;
	 }
	 s = "msie";
	 if ((i = ua.indexOf(s)) >= 0) {
	 this.isIE = true;
	 return;
	 }
	 s = "netscape6/";
	 if ((i = ua.indexOf(s)) >= 0) {
	 this.isNS = true;
	 return;
	 }
	 s = "gecko";
	 if ((i = ua.indexOf(s)) >= 0) {
	 this.isNS = true;
	 return;
	 }
	 s = "safari";
	 if ((i = ua.indexOf(s)) >= 0) {
	 this.isSF = true;
	 return;
	 }
}
function DialogShow(url,w,h,t,c){
	 ScreenConvert();
	 var showdata="<div id=\"dialogtitle\" onmousedown='startDrag(this)' onmouseup='stopDrag(this)' onmousemove='drag(this)' style='width:762px; height:30px;background:url(/images/ts1.png) no-repeat left top; cursor:move;text-align:center;color:#ffffff;'>";
	 showdata+="<div id=\"string\" style='width:720px; height:30px;line-height:26px; float:left; text-align:center;color:#ffffff;font-size:14px; font-weight:bold'>"+t+"</div>";
	 showdata+="<div id=\"close\" style='width:12px;margin:4px 10px;float:left;cursor:pointer;color:#000;font-family:webdings;' onclick=\"DialogHide();\">r</div></div>";
	 showdata+="<div style='width:762px; height:auto;background:url(/images/ts2.png) repeat-y left top; '><iframe src=\""+url+"\" frameborder=\"0\" scrolling=\"auto\" style='width:740px; height:"+(h-10)+"px;'></iframe></div><div style='width:762px; height:12px;background:url(/images/ts3.png) no-repeat left top; '></div>";
	 var objDialog = document.getElementById("DialogMove");
	 if (!objDialog) 
	 objDialog = document.createElement("div");
	 t_DiglogW = w;
	 t_DiglogH = h;
	 DialogLoc();
	 objDialog.id = "DialogMove";
	 var oS = objDialog.style;
	 oS.display = "block";
	 oS.top = t_DiglogY + "px";
	 oS.left = t_DiglogX + "px";
	 oS.width = w + "px";
	 oS.height = h +20+ "px";
	 oS.border="solid #c5e3f3 0px";
	 oS.zIndex="5";
	 oS.position="absolute";
	 objDialog.innerHTML = showdata;
	 document.body.appendChild(objDialog);
}
function DialogHide(){
	 ScreenClean();
	 var objDialog = document.getElementById("DialogMove");
	 if (objDialog)
	 objDialog.style.display = "none";
}
function DialogHidea(){
	 ScreenCleana();
	 var objDialoga = parent.document.getElementById("DialogMove");
	 if (objDialoga)
	 objDialoga.style.display = "none";
}
function ScreenCleana()
{
	 var objScreena =  parent.document.getElementById("ScreenOver");
	 if (objScreena)
	 objScreena.style.display = "none";
}
function DialogLoc(){
	 var dde = document.documentElement;
	 if (window.innerWidth){
	 var ww = window.innerWidth;
	 var wh = window.innerHeight;
	 var bgX = window.pageXOffset;
	 var bgY = window.pageYOffset;
	 }
	 else{
	 var ww = dde.offsetWidth;
	 var wh = dde.offsetHeight;
	 var bgX = dde.scrollLeft;
	 var bgY = dde.scrollTop;
	 }
	 t_DiglogX = (bgX + ((ww - t_DiglogW)/2));
	 t_DiglogY = (bgY + ((wh - t_DiglogH)/2));
}
function ScreenConvert(){
	 var browser = new Browser();
	 var objScreen = document.getElementById("ScreenOver");
	 if(!objScreen) 
	 var objScreen = document.createElement("div");
	 var oS = objScreen.style;
	 objScreen.id = "ScreenOver";
	 oS.display = "block";
	 oS.top = oS.left = oS.margin = oS.padding = "0px";
	 if (document.documentElement.clientHeight)
	 {
	 var wh = document.documentElement.clientHeight + "px";
	 }
	 else if (window.innerHeight)
	 {
	 var wh = window.innerHeight + "px";
	 }
	 else
	 {
	 var wh = "100%";
	 }
if (document.documentElement.scrollHeight) 
     { 
         var wh = document.documentElement.scrollHeight + "px"; 
     }
	 oS.width = "100%";
	 oS.height = wh;
	 oS.position = "absolute";
	 oS.zIndex = "3";
	 if ((!browser.isSF) && (!browser.isOP))
	 {
	 oS.background = "#8b8b8b";
	 }
	 else
	 {
	 oS.background = "#8b8b8b";
	 }
	 oS.filter = "alpha(opacity=60)";
	 oS.opacity = 40/100;
	 oS.MozOpacity = 40/100;
	 document.documentElement.appendChild(objScreen);
}
function ScreenClean()
{
	 var objScreen = document.getElementById("ScreenOver");
	 if (objScreen)
	 objScreen.style.display = "none";
}

//开始拖动;
function startDrag(obj)
{
 if(event.button==1)
 {
  //锁定标题栏;
  obj.setCapture();
  //定义对象;
  var win = obj.parentNode;
  //记录鼠标和层位置;
  x0 = event.clientX;
  y0 = event.clientY;
  x1 = parseInt(win.style.left);
  y1 = parseInt(win.style.top);
  moveable = true;
 }
}
//拖动;
function drag(obj)
{
 if(moveable)
 {
  var win = obj.parentNode;
  win.style.left = x1 + event.clientX - x0;
  win.style.top  = y1 + event.clientY - y0;
 }
}

//停止拖动;
function stopDrag(obj)
{
 if(moveable)
 {
  var win = obj.parentNode;
  obj.releaseCapture();
  moveable = false;
 }
}