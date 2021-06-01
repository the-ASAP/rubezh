"use strict";function stopScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",t=parseInt(document.documentElement.clientWidth),n=parseInt(window.innerWidth),o=n-t;$(e).attr("style","overflow: hidden; padding-right: "+o+"px")}function freeScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(e).attr("style","")}var tablet=$(window).width()<1025,mobile=$(window).width()<769,contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:!1;e.forEach(function(e){var n=$(e.trigger),o=$(e.modal);n.on("click",function(){t?$(".main").css("z-index","2"):$(".main").attr("style",""),stopScroll("body"),o.addClass("active")}),o.on("click",function(e){t?$(".main").attr("style",""):"",$(e.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),o.find(".modal__close, [data-close]").on("click",function(){t?$(".main").attr("style",""):"",o.removeClass("active"),freeScroll()}),$(document).keydown(function(e){return 27===e.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},owlGallery=function(e,t){void 0==t&&(t="");var n=$(e);n.each(function(e,n){$(n).addClass("owl-carousel owl-theme").owlCarousel(Object.assign(t,{smartSpeed:1e3,navText:['<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30057 1.12305L1.41016 10.553L9.30057 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>','<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.69943 1.12305L9.58984 10.553L1.69943 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>']}))}).trigger("refresh.owl.carousel")},openSearch=function(e){var t=e.clone().prop("type","submit");e.parent().addClass("active"),e.replaceWith(t),t.hide(),t.fadeIn(200)},closeSearch=function(e){e.parent().removeClass("active"),e.siblings("button").prop("type","button")},closeMenu=function(e,t){e.removeClass("active"),t.removeClass("active"),$(".header").css("z-index","1"),freeScroll()},toggleMenu=function(e,t){e.hasClass("active")?closeMenu(e,t):(e.addClass("active"),t.addClass("active"),$(".header").css("z-index","2"),stopScroll())},dropDownMenu=function(e){e.toggleClass("active"),e.hasClass("active")?e.parent().siblings("div").slideDown(200).css("display","block"):e.parent().siblings("div").slideUp(200)},switchActive=function(e,t,n){$(t).removeClass(n),$(e).addClass(n)},tabs=function(e,t,n){$(t).each(function(o,i){$(i).attr(n)===$(e).attr(n)&&($(t).removeClass("active").hide(),$(i).fadeIn())})},buttonScroll=function(e){var t=$(window).scrollTop()+100>$(document).height()-$(window).height();t?$(e).removeClass("visible"):$(e).addClass("visible")},tagTemplate=function(e){{var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";arguments.length>2&&void 0!==arguments[2]?arguments[2]:""}return"<button class='content__tag custom' data-name='".concat(t,"'>").concat(e,"</button>")},addFilters=function(e,t){var n=$(e.target).siblings("label:not(:empty)").text(),o=$(e.target),i=o.prop("name");$(".default").remove(),"radio"===o.attr("type")&&($(t).find("[data-name=".concat(i,"]")).remove(),$(t).append(tagTemplate(n,i))),"checkbox"===o.attr("type")&&(o.prop("checked")?$(t).append(tagTemplate(n,i)):$(t).find("button").each(function(e,t){return $(t).text()===n?$(t).remove():0}))},filtersCount=function(){$(".content__searchCount").text($("button.custom").length?$("button.custom").length:"")},removeDisable=function(e){$(e).prop("disabled",!1)},searchRequest=function(){$(".content__block--control.active").removeClass("active"),freeScroll()},mobileFilterHorizontal=function(e){var t=$(e).children();$(e).append(t.eq(0).clone().addClass("filter-current"),'<div class="mobile-select"><div class="mobile-select__box"></div></div>'),t.not(".filter-current").appendTo($(e).find(".mobile-select__box")),$(e).on("click",function(t){var n=$(t.target);switch(!0){case n.hasClass("filter-current"):$(e).find(".mobile-select").addClass("active"),stopScroll();break;case n.is("button:not(.filter-current)"):$(e).find(".filter-current").text(n.text());break;case n.hasClass("mobile-select"):$(e).find(".mobile-select").removeClass("active"),freeScroll()}})},formValidator=function(e){e=document.querySelector(e),e.addEventListener("submit",function(t){t.preventDefault(),formValidate({form:e,url:e.getAttribute("action"),onLoadStart:function(){console.log("load start")},onSuccess:function(){console.log("success")},onError:function(){console.log("error")}})})};$().ready(function(){if($(document).on("click",'.header__search-btn[type="button"]',function(){openSearch($(this))}),$(".header__search-closeBtn").on("click",function(){closeSearch($(this))}),$(".header__burger").on("click",function(){toggleMenu($(this),$(".menu"))}),$(".menu__btn").on("click",function(){dropDownMenu($(this))}),owlGallery(".promo__sliderBox",{margin:40,loop:!0,nav:!0,navContainer:".promo__sliderNav",dotsContainer:".promo__sliderDots",responsive:{0:{items:1},769:{items:2},1025:{items:3,dots:!1}}}),owlGallery(".companies__sliderBox",{items:4,dots:!1,navContainer:".companies__sliderNav",responsive:{0:{items:2,margin:58,loop:!0,nav:!0},539:{items:3,margin:30,loop:!0,nav:!0},769:{margin:100},1025:{margin:161}}}),owlGallery(".events__sliderBox",{margin:40,loop:!0,nav:!0,navContainer:".events__sliderNav",dotsContainer:".events__sliderDots",responsive:{0:{items:1},769:{items:2},1025:{items:3,dots:!1}}}),mobile||owlGallery(".community__sliderBox",{items:1,margin:40,loop:!0,nav:!0,navContainer:".community__sliderNav",dotsContainer:".community__sliderDots"}),contentFadeInOnReady(),$(".content__field--filter input").on("change",function(e){($(".content__tags").length>0||$(".content__mobileTags").length>0&&mobile)&&(addFilters(e,mobile?".content__mobileTags":".content__tags"),filtersCount())}),$(".content__mobileSubmit").on("click",function(){return searchRequest()}),($(".detail img").length||$("[data-fancybox]").length)&&($(".detail img, img[data-fancybox]").each(function(e,t){$(t).wrap("<a class='detail__image' href='".concat($(t).attr("src"),"' data-fancybox><span>").concat($(t).attr("alt"),"</span></a>"))}),$("a[data-fancybox]").fancybox({buttons:["zoom","download","close"]})),$(".appears").length&&$(window).on("scroll",function(){buttonScroll(".appears")}),$(".profile__checkbox").on("change",function(){removeDisable(".profile__submit--subscribe")}),$(".project__load").on("change",function(){var e=this.value.split("\\");$(".project__file").text(e[e.length-1])}),bindModalListeners([{trigger:".detail__button--scroll",modal:".modal--load"},{trigger:".auth__submit--reg",modal:".modal--confirm"},{trigger:".content__searchFilters",modal:".content__block--control"},{trigger:".content__searchInput--mobile",modal:".content__search--mobile"}],!0),mobile&&$(".content__heading").on("click",function(e){$(e.target).toggleClass("open")}),mobile&&$(".content__filter").length&&mobileFilterHorizontal(".content__filters"),mobile&&$(".profile__options").length&&mobileFilterHorizontal(".profile__options"),$(".profile__button:not(.filter-current)").first().addClass("active"),$(".profile__form").first().addClass("active"),$(".profile__button:not(.filter-current)").on("click",function(e){switchActive(e.target,".profile__button","active"),tabs(e.target,".profile__form","data-tab")}),$(".content__filter").on("click",function(e){return switchActive(e.target,".content__filter","active")}),$(".content__searchClear, .content__mobileClear").on("click",function(){location.search=""}),$(".videos").length){if(!mobile){var e=$(".videos__column:first");e.children(":nth-child(even)").each(function(){e.siblings(".videos__column").append(this)})}tablet||$(".videoItem").hover(function(){var e=$(this).find(".videoItem__content");$(this).animate({height:"+="+e.innerHeight()},200),e.fadeIn(200).css("display","flex")},function(){var e=$(this).find(".videoItem__content");$(this).animate({height:"-="+e.innerHeight()},200,function(){$(this).removeAttr("style")}),e.fadeOut(200)})}$(".project__body").length&&formValidator(".project__body"),$(".project__select").on("change",function(e){var t=$(e.target);t.siblings('input[type="hidden"]').val(t.val())})});