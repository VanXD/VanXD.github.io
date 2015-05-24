function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("con_"+name+"_"+i); 
menu.className=i==cursel?"hover":""; 
con.style.display=i==cursel?"block":"none"; 
} 
} 
// 设置为主页 
function SetHome(obj,vrl){ 
try{ 
obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); 
} 
catch(e){ 
if(window.netscape) { 
try { 
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
} 
catch (e) { 
alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"); 
} 
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
prefs.setCharPref('browser.startup.homepage',vrl); 
}else{ 
alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。"); 
} 
} 
} 
// 加入收藏 兼容360和IE6 
function shoucang(sTitle,sURL) 
{ 
try 
{ 
window.external.addFavorite(sURL, sTitle); 
} 
catch (e) 
{ 
try 
{ 
window.sidebar.addPanel(sTitle, sURL, ""); 
} 
catch (e) 
{ 
alert("加入收藏失败，请使用Ctrl+D进行添加"); 
} 
} 
} 


function copyText(text)   
{   
   	window.clipboardData.setData("text",text);   
	alert("网址已复制到剪贴板");
}   

function correctPNG() 
{
for(var i=0; i<document.images.length; i++)
{
var img = document.images[i];
var imgName = img.src.toUpperCase();
if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
{
var imgID = (img.id) ? "id='" + img.id + "' " : "";
var imgClass = (img.className) ? "class='" + img.className + "' " : "";
var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
var imgStyle = "display:inline-block;" + img.style.cssText;
if (img.align == "left") imgStyle = "float:left;" + imgStyle;
if (img.align == "right") imgStyle = "float:right;" + imgStyle;
if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
var strNewHTML = "<span "+ imgID + imgClass + imgTitle + "style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src='" + img.src + "', sizingMethod='scale');\"></span>";
img.outerHTML = strNewHTML;
i = i-1;
}
}
}
window.attachEvent("onload", correctPNG);

function createAjax() {   //该函数将返回XMLHTTP对象实例
 var _xmlhttp;
 try { 
  _xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
 }
 catch (e) {
  try {
   _xmlhttp=new XMLHttpRequest(); 
  }
  catch (e) {
   _xmlhttp=false;  
  }
 }
 return _xmlhttp; 
}
 function showAndHide(obj,types){
    var Layer=window.document.getElementById(obj);
    switch(types){
  case "show":
    Layer.style.display="block";
  break;
  case "hide":
    Layer.style.display="none";
  break;
}
  }
  function getValue(obj,str){
    var input=window.document.getElementById(obj);
input.value=str;
  }
function boxs(v){
 window.scrollTo(0,0);
 var bo = document.getElementsByTagName('body')[0];
 var ht = document.getElementsByTagName('html')[0];
 var boht = document.getElementById('boxs');    
 boht.innerHTML = '';
 bo.style.height='auto';
 bo.style.overflow='auto';
 ht.style.height='auto'; 
}  
