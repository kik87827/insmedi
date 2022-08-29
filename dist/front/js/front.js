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
			// $gnb_bg.show();
			setTimeout(function(){
				if($gnb_bg.is(":visible")){
				}
				$gnb_two_dep_w.css({height : maxHeightValue});
				$gnb_bg.css({height : maxHeightValue - 2});
			},30);

		},
		out : function(){

		},
		interval : 50
	});

	$htop_gnb_list_w.hoverIntent({
		over : function(){
			
		},
		out : function(){
			$htop_gnb_li.find(".nav_two_wrap").css({height : 0});
			$gnb_bg.css({height : 0});
		},
		interval : 50
	});
}

function mainvisualFunc(){
	var main_visual_container = null;
	if($(".main-visual-container").length){
		main_visual_container = new Swiper(".main-visual-container", {
			speed : 800,
			loop : true,
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
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



function DesignModal(option) {
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.duration = option.duration !== undefined ? option.duration : 400;

    this.initShow(option);
}

DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
	var objThis = this;
    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_design_modal'></div>";
    innerPublish += "  <div class='design_modal_tb'>";
    innerPublish += "      <div class='design_modal_td'>";
    innerPublish += "          <div class='design_modal'>";
    innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
    innerPublish += "              <div class='btn_dmsm_wrap'>";
    innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
    if (option.type === "confirm") {
        innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
    }
    innerPublish += "              </div>";
    innerPublish += "          </div>";
    innerPublish += "      </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;

    if (option.type === "confirm" || option.type === "alert") {
        this.design_modal_text = document.querySelector(".design_modal_text");
        this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
        this.design_modal_text.innerHTML = option.message;
    }
    if (option.type === "confirm") {
        this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    this.pagewrap.style.zIndex = 0;
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
	this.design_modal_wrap.classList.add("active");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.add("motion");
	},30);
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
	var objThis = this;
	this.design_modal_wrap.classList.remove("motion");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.remove("active");
    	document.querySelector(".design_modal_insert_wrap").remove();
		objThis.design_modal_wrap.remove();
		objThis.domHtml.classList.remove("touchDis");
		objThis.domBody.style.marginTop = 0;
		
		window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
	},530);
}
DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    for (var i = 0; i < this.closetrigger.length; i++) {
        this.closetrigger[i].addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
    if (this.btn_dmsmidentify !== null) {
        this.btn_dmsmidentify.addEventListener("click", function () {
            if (option.identify_callback !== undefined) {
                option.identify_callback();
            }
        }, false);
    }
    if (this.btn_dmsmcancel !== null) {
        this.btn_dmsmcancel.addEventListener("click", function () {
            if (option.cancel_callback !== undefined) {
                option.cancel_callback();
            }
        }, false);
    }
}