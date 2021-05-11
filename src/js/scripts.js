// удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $('.preloader').fadeOut(150, ()=>{
        $('.preloader').remove();
    });
};

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = modalArr => {
    modalArr.forEach(obj => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on('click', function() {
            stopScroll('body');
            jQModal.addClass('active');
        });

        jQModal.on('click', function(e) {
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('.modal__close').on('click', function() {
            jQModal.removeClass('active');
           freeScroll();
        });

        $(document).keydown((e) => {
            if (e.keyCode === 27) {
                $('.modal').removeClass('active');
                freeScroll();
                return false;
            }
        });
    });
};

// Запрещаем скролл для body 
function stopScroll(item='body') {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

// возвращаем скролл для body
function freeScroll(item='body') {
    $(item).attr("style", '');
}

const owlGallery = (selector, params) => {
    if (params == undefined) params = "";
    const owl = $(selector);
        owl.each((i, el) => {
            $(el)
            .addClass("owl-carousel owl-theme")
            .owlCarousel(
                Object.assign(params, {
                    smartSpeed: 1000,
                    navText: [
                        '<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30057 1.12305L1.41016 10.553L9.30057 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '<svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.69943 1.12305L9.58984 10.553L1.69943 19.534" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                    ]
                })
            );
        })
        .trigger("refresh.owl.carousel");
};

const openSearch = (btn) => {
    let submitBtn = btn.clone().prop("type", "submit");

    btn.parent().addClass("active");
    btn.replaceWith(submitBtn);
    submitBtn.hide();
    submitBtn.fadeIn(200);
};

const closeSearch = (btn) => {
    btn.parent().removeClass("active");
    btn.siblings("button").prop("type", "button");
};

$().ready(() => {
    $(document).on("click", ".header__search-btn[type='button']", function () {
        openSearch($(this));
    });

    $(".header__search-closeBtn").on("click", function() {
        closeSearch($(this));
    });

    owlGallery(".promo__sliderBox", {
        loop: true,
        nav: true,
        dots: false,
        navContainer: ".promo__sliderNav",
        responsive: {
            0: {
                items: 3,
                margin: 40
            }
        }
    });

    contentFadeInOnReady();
    bindModalListeners([]);
});
