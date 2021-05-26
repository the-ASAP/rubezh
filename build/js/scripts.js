"use strict";function stopScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",t=parseInt(document.documentElement.clientWidth),o=parseInt(window.innerWidth),n=o-t;$(e).attr("style","overflow: hidden; padding-right: "+n+"px")}function freeScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(e).attr("style","")}var contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(e){e.forEach(function(e){var t=$(e.trigger),o=$(e.modal);t.on("click",function(){stopScroll("body"),o.addClass("active")}),o.on("click",function(e){$(e.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),o.find(".modal__close").on("click",function(){o.removeClass("active"),freeScroll()}),$(document).keydown(function(e){return 27===e.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},owlGallery=function(e,t){void 0==t&&(t="");var o=$(e);o.each(function(e,o){$(o).addClass("owl-carousel owl-theme").owlCarousel(Object.assign(t,{smartSpeed:1e3,navText:['<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30057 1.12305L1.41016 10.553L9.30057 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>','<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.69943 1.12305L9.58984 10.553L1.69943 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>']}))}).trigger("refresh.owl.carousel")},openSearch=function(e){var t=e.clone().prop("type","submit");e.parent().addClass("active"),e.replaceWith(t),t.hide(),t.fadeIn(200)},closeSearch=function(e){e.parent().removeClass("active"),e.siblings("button").prop("type","button")},closeMenu=function(e,t){e.removeClass("active"),t.removeClass("active"),freeScroll()},toggleMenu=function(e,t){e.hasClass("active")?closeMenu(e,t):(e.addClass("active"),t.addClass("active"),stopScroll())},switchActive=function(e,t,o){$(t).removeClass(o),$(e).addClass(o)},tabs=function(e,t,o){$(t).each(function(n,a){$(a).attr(o)===$(e).attr(o)&&($(t).removeClass("active").hide(),$(a).fadeIn())})},buttonScroll=function(e,t){$(window).scrollTop()>$(e).offset().top?$(t).addClass("visible"):$(t).removeClass("visible")},removeDisable=function(e){$(e).prop("disabled",!1)};$(".profile__checkbox").on("change",function(){removeDisable(".profile__submit--subscribe")}),$().ready(function(){if($(document).on("click",'.header__search-btn[type="button"]',function(){openSearch($(this))}),$(".header__search-closeBtn").on("click",function(){closeSearch($(this))}),$(".header__burger").on("click",function(){toggleMenu($(this),$(".menu"))}),owlGallery(".promo__sliderBox",{loop:!0,nav:!0,dots:!1,navContainer:".promo__sliderNav",responsive:{0:{items:3,margin:40}}}),owlGallery(".events__sliderBox",{loop:!0,nav:!0,dots:!1,navContainer:".events__sliderNav",responsive:{0:{items:3,margin:40}}}),owlGallery(".community__sliderBox",{items:1,margin:40,loop:!0,nav:!0,navContainer:".community__sliderNav",dotsContainer:".community__sliderDots"}),contentFadeInOnReady(),($(".detail img").length||$("[data-fancybox]").length)&&($(".detail img, img[data-fancybox]").each(function(e,t){$(t).wrap("<a class='detail__image' href='".concat($(t).attr("src"),"' data-fancybox><span>").concat($(t).attr("alt"),"</span></a>"))}),$("a[data-fancybox]").fancybox({buttons:["zoom","download","close"]})),$(".appears").length&&$(window).on("scroll",function(){buttonScroll(".detail__button--scroll",".appears")}),$(".project__load").on("change",function(){var e=this.value.split("\\");$(".project__file").text(e[e.length-1])}),bindModalListeners([{trigger:".detail__button--scroll",modal:".modal--load"},{trigger:".auth__submit--reg",modal:".modal--confirm"}]),$(".profile__button").first().addClass("active"),$(".profile__form").first().addClass("active"),$(".profile__button").on("click",function(e){switchActive(e.target,".profile__button","active"),tabs(e.target,".profile__form","data-tab")}),$(".content__searchClear").on("click",function(e){$(e.target).siblings("input").val("")}),$(".videos").length){var e=$(".videos__column:first");e.children(":nth-child(even)").each(function(){e.siblings(".videos__column").append(this)})}});