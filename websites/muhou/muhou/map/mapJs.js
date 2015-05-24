$(function(){
	maphover();
});

function maphover(){
	var self = "",y="";
	$(".city").mouseover(
		function(e){
			self = $(this);
			self.addClass("hover").children("div").show();
			var tt = $(this).attr('tt');
			var cs = $(this).attr('cs');
			var qy = $(this).attr('qy');
			var dom="<div class='mapDiv'><div class='tt'>"+tt+"</div><div class='cs'>"+cs+"</div><div class='cs'>"+qy+"</div></div>";
			$("body").append(dom);				
					if(e.pageY>400){
						var y=e.pageY-155;
					}else{
						var y=e.pageY+10;
					}
				$(".mapDiv").css({					
					top: (y)+"px",left: (e.pageX-80)+"px"
				}).show("fast");
		}).mouseout(function(){				
				$(".mapDiv").remove();
				self = $(this);
				self.children("div").hide();
				self.removeClass("hover");
		}).mousemove(function(e){
				self = $(this);
				self.addClass("hover").children("div").show();
				$(".mapDiv").css({
					top: (y)+"px",
					left: (e.pageX -80)+"px"
			})
		});		
};
