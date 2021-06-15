"use strict";function stopScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",e=parseInt(document.documentElement.clientWidth),n=parseInt(window.innerWidth),o=n-e;$(t).attr("style","overflow: hidden; padding-right: "+o+"px")}function freeScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(t).attr("style","")}var tablet=$(window).width()<1025,mobile=$(window).width()<769,contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:!1;t.forEach(function(t){var n=$(t.trigger),o=$(t.modal);n.on("click",function(){e?$(".main").css("z-index","2"):$(".main").attr("style",""),stopScroll("body"),o.addClass("active")}),o.on("click",function(t){e?$(".main").attr("style",""):"",$(t.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),o.find(".modal__close, [data-close]").on("click",function(){e?$(".main").attr("style",""):"",o.removeClass("active"),freeScroll()}),$(document).keydown(function(t){return 27===t.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},owlGallery=function(t,e){void 0==e&&(e="");var n=$(t);n.each(function(t,n){$(n).addClass("owl-carousel owl-theme").owlCarousel(Object.assign(e,{smartSpeed:1e3,navText:['<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30057 1.12305L1.41016 10.553L9.30057 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>','<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.69943 1.12305L9.58984 10.553L1.69943 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>']}))}).trigger("refresh.owl.carousel")},openSearch=function(t){var e=t.clone().prop("type","submit");t.parent().addClass("active"),t.replaceWith(e),e.hide(),e.fadeIn(200)},closeSearch=function(t){t.parent().removeClass("active"),t.siblings("button").prop("type","button"),t.siblings("input").val("")},closeMenu=function(t,e){t.removeClass("active"),e.removeClass("active"),freeScroll()},toggleMenu=function(t,e){t.hasClass("active")?closeMenu(t,e):(t.addClass("active"),e.addClass("active"),stopScroll())},dropDownMenu=function(t){t.toggleClass("active"),t.hasClass("active")?t.parent().siblings("div").slideDown(200):t.parent().siblings("div").slideUp(200)},switchActive=function(t,e,n){$(e).removeClass(n),$(t).addClass(n)},tabs=function(t,e,n){$(e).each(function(o,i){$(i).attr(n)===$(t).attr(n)&&($(e).removeClass("active").hide(),$(i).fadeIn())})},buttonScroll=function(t){var e=$(window).scrollTop()+100>$(document).height()-$(window).height();e?$(t).removeClass("visible"):$(t).addClass("visible")},tagTemplate=function(t){{var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";arguments.length>2&&void 0!==arguments[2]?arguments[2]:""}return"<button class='content__tag custom' data-name='".concat(e,"'>").concat(t,"</button>")},addFilters=function(t,e){var n=$(t.target).siblings("label:not(:empty)").text(),o=$(t.target),i=o.prop("name");$(".default").remove(),"radio"===o.attr("type")&&($(e).find("[data-name=".concat(i,"]")).remove(),$(e).append(tagTemplate(n,i))),"checkbox"===o.attr("type")&&(o.prop("checked")?$(e).append(tagTemplate(n,i)):$(e).find("button").each(function(t,e){return $(e).text()===n?$(e).remove():0}))},resizeFilters=function(t,e,n,o,i){var a=i[0].classList[0];return t&&e?(mobileFilterHorizontal(n),t=!1):t||e||($(n).html(o),t=!0),$(".filter-current").text(i.text()),$("."+a).each(function(){$(this).attr("id")===i.attr("id")&&switchActive($(this),"."+a,"active")}),t},filtersCount=function(){$(".content__searchCount").text($("button.custom").length?$("button.custom").length:"")},removeDisable=function(t){$(t).prop("disabled",!1)},searchRequest=function(){$(".content__block--control.active").removeClass("active"),freeScroll()},mobileFilterHorizontal=function(t){var e=$(t).children();$(t).append(e.eq(0).clone().addClass("filter-current"),'<div class="mobile-select"><div class="mobile-select__box"></div></div>'),e.not(".filter-current").appendTo($(t).find(".mobile-select__box")),$(t).on("click",function(e){var n=$(e.target);switch(!0){case n.hasClass("filter-current"):$(t).find(".mobile-select").addClass("active"),stopScroll();break;case n.is("button:not(.filter-current)"):$(t).find(".filter-current").text(n.text());break;case n.hasClass("mobile-select"):$(t).find(".mobile-select").removeClass("active"),freeScroll()}})},formValidator=function(t){t=document.querySelector(t),t.addEventListener("submit",function(e){e.preventDefault(),formValidate({form:t,url:t.getAttribute("action"),onLoadStart:function(){console.log("load start")},onSuccess:function(){console.log("success")},onError:function(){console.log("error")}})})},grid=function(t){var e=$(t).first();e.children(":nth-child(even)").each(function(){e.siblings(t).append(this)})},resize=function(t,e,n,o){$(window).resize(function(){var i=($(window).width()<1025,$(window).width()<769);$(".content__field--filter input").on("change",function(t){($(".content__tags").length>0||$(".content__mobileTags").length>0&&i)&&(addFilters(t,i?".content__mobileTags":".content__tags"),filtersCount())}),i&&$(".content__heading").on("click",function(t){$(t.target).toggleClass("open")}),$(".content__filters").length&&(t=resizeFilters(t,i,".content__filters",e,o)),$(".profile__options").length&&(t=resizeFilters(t,i,".profile__options",n,o)),$(".content__filter").on("click",function(t){switchActive(t.target,".content__filter","active"),o=$(this)}),$(".profile__button:not(.filter-current)").on("click",function(t){switchActive(t.target,".profile__button","active"),tabs(t.target,".profile__form","data-tab"),o=$(this)})}),$(window).trigger("resize")};$().ready(function(){resize(!0,$(".content__filters").html(),$(".profile__options").html(),$($(".content__filter:first").length?".content__filter:first":".profile__button:first")),$(document).on("click",'.header__search-btn[type="button"]',function(){openSearch($(this))}),$(".header__search-closeBtn").on("click",function(){closeSearch($(this))}),$(".header__burger").on("click",function(){toggleMenu($(this),$(".menu"))}),$(".menu__btn").on("click",function(){dropDownMenu($(this))}),$(".banner__closeBtn").on("click",function(){$(this).closest(".banner").remove()}),owlGallery(".promo__sliderBox",{margin:40,loop:!0,nav:!0,navContainer:".promo__sliderNav",dotsContainer:".promo__sliderDots",responsive:{0:{items:1},769:{items:2},1025:{items:3,dots:!1}}}),owlGallery(".companies__sliderBox",{items:4,dots:!1,navContainer:".companies__sliderNav",responsive:{0:{items:2,margin:58,loop:!0,nav:!0},539:{items:3,margin:30,loop:!0,nav:!0},769:{margin:100},1025:{margin:161}}}),owlGallery(".events__sliderBox",{margin:40,loop:!0,nav:!0,navContainer:".events__sliderNav",dotsContainer:".events__sliderDots",responsive:{0:{items:1},769:{items:2},1025:{items:3,dots:!1}}}),mobile||owlGallery(".community__sliderBox",{items:1,margin:40,loop:!0,nav:!0,navContainer:".community__sliderNav",dotsContainer:".community__sliderDots"}),$(".content__mobileSubmit").on("click",function(){return searchRequest()}),($(".detail img").length||$("[data-fancybox]").length)&&($(".detail img, img[data-fancybox]").each(function(t,e){$(e).wrap("<a class='detail__image' href='".concat($(e).attr("src"),"' data-fancybox><figure></figure></a>")),$(e).after("<figcaption>"+$(e).attr("alt")+"</figcaption>"),$(e).attr("alt").length||$(e).closest("a").css("margin-bottom","0")}),$("a[data-fancybox]").fancybox({buttons:["zoom","download","close"]})),$(".appears").length&&$(window).on("scroll",function(){buttonScroll(".appears")}),$(".profile__checkbox").on("change",function(){removeDisable(".profile__submit--subscribe")}),$(".project__load").on("change",function(){var t=this.value.split("\\");$(".project__file").text(t[t.length-1])}),bindModalListeners([{trigger:".detail__button--scroll",modal:".modal--load"},{trigger:".auth__submit--reg",modal:".modal--confirm"},{trigger:".content__searchFilters",modal:".content__block--control"},{trigger:".content__searchInput--mobile",modal:".content__search--mobile"}],!0),$(".content__filter:not(.filter-current)").first().addClass("active"),$(".profile__button:not(.filter-current)").first().addClass("active"),$(".profile__form").first().addClass("active"),$(".content__searchClear, .content__mobileClear").on("click",function(){location.search=""}),$(".videos").length&&(mobile||grid(".videos__column"),tablet||$(".videoItem").hover(function(){var t=$(this).find(".videoItem__content");$(this).animate({height:"+="+t.outerHeight()},200),t.fadeIn(200).css("display","flex")},function(){var t=$(this).find(".videoItem__content");$(this).animate({height:"-="+t.outerHeight()},200,function(){$(this).removeAttr("style")}),t.fadeOut(200)})),$(".draft").length&&(tablet||grid(".content__column")),$(".project__body").length&&formValidator(".project__body"),$(".project__select").on("change",function(t){var e=$(t.target);e.siblings('input[type="hidden"]').val(e.val())})}),$(function(){contentFadeInOnReady()});