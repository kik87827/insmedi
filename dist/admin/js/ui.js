if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var Insmedi = Insmedi || {};
Insmedi = {
	/* 페이지 로드함수 */
	init : function(){
		var funcThis = this;
		$(function(){
			if(touchstart){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.layoutFunc();
			funcThis.formFunc();
			funcThis.datapickerCall();
			funcThis.dimLayerControl();
		});
		$(window).on("load",function(){
			
		});
	},
	formFunc(){
		$(".ready_fsel").each(function(){
			var $t = $(this),
				$t_option = $t.children("option:selected");
			if($t_option[0].value === "0"){
				$t.addClass("ready_fsel");
			}else{
				$t.removeClass("ready_fsel");
			}
		});
		$(document).on("change",".fsel",function(){
			var $t = $(this),
				$t_option = $t.children("option:selected");
			if($t_option[0].value === "0"){
				$t.addClass("ready_fsel");
			}else{
				$t.removeClass("ready_fsel");
			}
		});
	},
	datapickerCall : function(){
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
	},
	/* 서브메뉴 고정 함수(rock) */
	menuRock : function(target){
		$(function(){
			if($(target).length){
				if($(target).find(".pttm_list_w").length){
					$(target).find(".ptlm.has_tog").addClass("fold");
					$(target).find(".pttm_list_w").show();
					setTimeout(function(){
						$(window).trigger("resize");
					},50);
				}
				$(target).addClass("active");
			}
		});
	},
	layoutFunc : function(){

		var $page_wrap = $(".page_wrap"),
			$ptog_fold = $("#ptog_fold"),
			$ptleft_z = $(".ptleft_z"),
			$ptleft_in = $(".ptleft_in"),
			$ptog_open = $("#ptog_open"),
			$ptlmtog = $(".ptlm.has_tog"),
			$hd_util_item = $(".hd_util_item"),
			$hd_util_bullon = $(".hd_util_bullon");
		
		var window_left = $(window).scrollLeft();
		modeAction();
		$(window).on("scroll",function(){
			window_left = $(window).scrollLeft();
			modeAction();
		});
		function modeAction(){
			if(window_left==0){
				$page_wrap.removeClass("scroll_mode");
			}else{
				$page_wrap.addClass("scroll_mode");
			}
		}


		$ptog_fold.on("click",function(){
			$(this).hide();
			$ptog_open.show();
			$(".page_wrap").toggleClass("layfold");
			setTimeout(function(){
				$(window).trigger("resize");
			},420);
		});
		$(window).on("resize",function(){
			if($ptleft_z.length && $ptleft_in.length){
				if($ptleft_z.outerHeight() < $ptleft_in.outerHeight()){
					$ptleft_in.css("padding-right",getScrollBarWidth());
				}else{
					$ptleft_in.css("padding-right","");
				}
			}
		}).resize();
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
		$ptog_open.on("click",function(){
			$(this).hide();
			$ptog_fold.show();
			$(".page_wrap").toggleClass("layfold");
			
			setTimeout(function(){
				$(window).trigger("resize");
			},420);
		});
		$ptlmtog.on("click",function(){
			var $this = $(this),
				$t_tmlist_w = $this.next(".pttm_list_w");
			
			$this.toggleClass("fold");
			$t_tmlist_w.toggle();
			setTimeout(function(){
				$(window).trigger("resize");
			},50);
		});
		$hd_util_item.on("click",function(){
			$hd_util_bullon.toggle();
		});
		$(document).on("click",function(e){
			if(!$(e.target).parents(".hd_util_bullon , .hd_util_item").length && !$(e.target).is(".hd_util_item")){
				$hd_util_bullon.hide();
			}
		});
	},
	dimLayerControl : function(){
		var $modal = $(".dimlayer_z");
		if($modal.length===0){return;}
		
		
		var objThis = this;
		$modal.on("click",".btn_layerclose,.closetrigger,.fullpop_dim",function(e){
			var $this = $(this),
				$t_p = $this.parents(".dimlayer_z");
			e.preventDefault();
			objThis.dimLayerHide({ 
				target : $t_p,
				closeCallback : function(){
					
				}
			});
		});
	},
	dimLayerShow : function(option){
		var touchIs = "ontouchstart" in window,
			$modal = null,
			$target = null,
			$page_wrap = null,
			$fullpop_item = null,
			$fullpop_titlow = null,
			$fullpop_contlow = null,
			$page_wrap = null,
			$res_value = 0;
		
		$(function(){
			$modal = $(".dimlayer_z");
			
			$target = $(option.target);
			$page_wrap = $(".page_wrap");
			
			
			if($modal.length===0){return;}
			$modal.removeClass("active");
			$target.addClass("active");
			setTimeout(function(){
				$target.addClass("motion");
			},30);
			$page_wrap.css({"z-index":0});
			$page_wrap.append($target);
			heightcheck();
			if ($target.hasClass("fulltype")) {
				$fullpop_titlow = $target.find(".fullpop_titlow");
				$fullpop_contlow = $target.find(".fullpop_contlow");
				$fullpop_item = $target.find(".fullpop_item");
			}

			if("openCallback" in option){
				option.openCallback();
			}
			function heightcheck(){
				if(touchIs){
					$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
					$("html").addClass("touchDis");
				}
			}
		});
	},
	dimLayerHide : function(option){
		var touchIs = "ontouchstart" in window,
			$modal = null,
			$target = null,
			$t_box = null;
			
		$(function(){
			$modal = $(".dimlayer_z");
			$target = $(option.target);
			$t_box = $target.find(".layer_box");
			$t_td = $target.find(".dimlayer_td");
			$t_tpt = parseInt($t_td.css("padding-top"));
			$t_tpb = parseInt($t_td.css("padding-bottom"));
			
			if($modal.length===0){return;}
			$target.removeClass("motion");
			setTimeout(function(){
				$target.removeClass("active");
				$(".page_wrap").css({"z-index":""});
				$("html,body").removeClass("touchDis touchDis2");
				scrollEnd();
				if("closeCallback" in option){
					option.closeCallback();
				}
			},530);
			function scrollEnd(){
				if(touchIs){
					$("body").css({"margin-top":0});
					window.scrollTo(0,Number($("body").data("data-scr")));
				}
			}
		});
	}
};
Insmedi.init();



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