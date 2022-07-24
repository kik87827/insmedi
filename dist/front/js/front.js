if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
var focusGlobalItem = "a,button,textarea,input[type='button'],input[type='image'],input[type='input'],input[type='password'],input[type='checkbox'],input[type='radio'],select,[tabindex]";
var userAgent=navigator.userAgent.toLowerCase();
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){
	subvisualFunc();
	calendarFunc();
});
$(window).on("load",function(){
	headerFunc();
});

function menurock(target){
	$(function(){
		var target_obj = $(target);
		if(target_obj.length){
			target_obj.addClass("active");
		}
	});
}

function calendarFunc(){
	var $datepicker = $(".calendar_call");
	if($datepicker.length){
		$datepicker.datepicker({
			monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
			dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
			changeMonth: true,
			changeYear: true,
			dateFormat: 'yy-mm-dd'
		});
		var $windowWidth = 0;
		$(window).on("resize",function(){
			if($windowWidth == $(window).width() && touchstart){return;}
			$datepicker.datepicker("hide");
			$windowWidth = $(window).width();
		});
	}
}

function headerFunc(){
	var $htop_gnb_list_w = $(".nav_wrap");
	var $htop_gnb_list = $(".nav_list");
	var $gnb_two_dep_w = $(".nav_two_wrap");
	var $htop_gnb_li = $(".nav_list > li");
	var $gnb_bg = $(".nav_bg");
	var maxHeightValue = 0;
	var maxheight = [];

	// init
	$gnb_two_dep_w.css({"height" : "" });
	$gnb_two_dep_w.each(function(){
		var $this = $(this);
		maxheight.push($this.height());
	});
	maxHeightValue = Math.max.apply(null,maxheight);
	$htop_gnb_list.addClass("ready");

	$htop_gnb_list.hoverIntent({
		over : function(){
			$gnb_two_dep_w.show();
			$gnb_bg.show();
			setTimeout(function(){
				$gnb_two_dep_w.css({height : maxHeightValue});
				$gnb_bg.css({height : maxHeightValue - 2});
			},30);

		},
		out : function(){

		},
		interval : 30
	});

	$htop_gnb_list_w.hoverIntent({
		over : function(){
			
		},
		out : function(){
			$htop_gnb_li.find(".nav_two_wrap").css({height : 0});
			$gnb_bg.css({height : 0});
			setTimeout(function(){
				$gnb_bg.hide();
			},510);
		},
		interval : 30
	});
}

function subvisualFunc(){
	var sub_visual_container = null;
	if($(".sub-visual-container").length){
		sub_visual_container = new Swiper(".sub-visual-container", {
			speed : 800,
			loop : true,
			pagination: {
				clickable: true,
				el: ".swiper-pagination.sub_visual_paging",
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
	}
}