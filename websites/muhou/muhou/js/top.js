function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("con_"+name+"_"+i); 
menu.className=i==cursel?"hover":""; 
con.style.display=i==cursel?"block":"none"; 
} 
} 
// ����Ϊ��ҳ 
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
alert("�˲�����������ܾ���\n�����������ַ�����롰about:config�����س�\nȻ�� [signed.applets.codebase_principal_support]��ֵ����Ϊ'true',˫�����ɡ�"); 
} 
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
prefs.setCharPref('browser.startup.homepage',vrl); 
}else{ 
alert("�����������֧�֣��밴�����沽�������1.����������á�2.���������ҳ��3.���룺"+vrl+"���ȷ����"); 
} 
} 
} 
// �����ղ� ����360��IE6 
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
alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������"); 
} 
} 
} 


function copyText(text)   
{   
   	window.clipboardData.setData("text",text);   
	alert("��ַ�Ѹ��Ƶ�������");
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

function createAjax() {   //�ú���������XMLHTTP����ʵ��
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
