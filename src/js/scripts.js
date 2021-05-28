const tablet = $(window).width() < 1025;
const mobile = $(window).width() < 769;

//удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $('.preloader').fadeOut(150, () => {
        $('.preloader').remove();
    });
};

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = modalArr => {
    modalArr.forEach(obj => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on('click', function () {
            stopScroll('body');
            jQModal.addClass('active');
        });

        jQModal.on('click', function (e) {
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('.modal__close').on('click', function () {
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

//запрещаем скролл для body 
function stopScroll(item = 'body') {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

//возвращаем скролл для body
function freeScroll(item = 'body') {
    $(item).attr("style", '');
}

const owlGallery = (selector, params) => {
    if (params == undefined) params = '';
    const owl = $(selector);
    owl.each((i, el) => {
            $(el)
                .addClass('owl-carousel owl-theme')
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
        .trigger('refresh.owl.carousel');
};

const openSearch = (btn) => {
    let submitBtn = btn.clone().prop('type', 'submit');
    btn.parent().addClass('active');
    btn.replaceWith(submitBtn);
    submitBtn.hide();
    submitBtn.fadeIn(200);
};

const closeSearch = (btn) => {
    btn.parent().removeClass('active');
    btn.siblings('button').prop('type', 'button');
};

const closeMenu = (btn, menu) => {
    btn.removeClass('active');
    menu.removeClass('active');
    freeScroll();
};

const toggleMenu = (btn, menu) => {
    if (btn.hasClass('active')) {
        closeMenu(btn, menu);
    } else {
        btn.addClass('active');
        menu.addClass('active');
        stopScroll();
    }
};

const dropDownMenu = (btn) => {
    btn.toggleClass('active');
    if (!btn.hasClass('active')) {
        btn.parent().siblings('div').slideUp(200);
    } else {
        btn.parent().siblings('div')
            .slideDown(200)
            .css('display', 'block');
    }
};

const switchActive = (target, allElems, className) => {
    $(allElems).removeClass(className);
    $(target).addClass(className);
}

const tabs = (button, content, tabAttr) => {
    $(content).each((i, el) => {
        if ($(el).attr(tabAttr) === $(button).attr(tabAttr)) {
            $(content).removeClass('active').hide();
            $(el).fadeIn();
        }
    })
}

const buttonScroll = (mainTarget, appearTarget) => {
    if ($(window).scrollTop() > $(mainTarget).offset().top) {
        $(appearTarget).addClass('visible')
    } else {
        $(appearTarget).removeClass('visible');
    }
}

const removeDisable = (button) => {
    $(button).prop('disabled', false);
}

$('.profile__checkbox').on('change', e => {
    removeDisable('.profile__submit--subscribe');
});

$().ready(() => {
    $(document).on('click', '.header__search-btn[type="button"]', function () {
        openSearch($(this));
    });

    $('.header__search-closeBtn').on('click', function () {
        closeSearch($(this));
    });

    $('.header__burger').on('click', function () {
        toggleMenu($(this), $('.menu'));
    });

    $('.menu__btn').on('click', function () {
        dropDownMenu($(this));
    });

    owlGallery('.promo__sliderBox', {
        margin: 40,
        loop: true,
        nav: true,
        navContainer: '.promo__sliderNav',
        dotsContainer: '.promo__sliderDots',
        responsive: {
            0: {
                items: 1
            },
            769: {
                items: 2
            },
            1025: {
                items: 3,
                dots: false
            }
        }
    });

    owlGallery('.companies__sliderBox', {
        items: 4,
        dots: false,
        navContainer: '.companies__sliderNav',
        responsive: {
            0: {
                items: 2,
                margin: 58,
                loop: true,
                nav: true
            },
            539: {
                items: 3,
                margin: 30,
                loop: true,
                nav: true
            },
            769: {
                margin: 100
            },
            1025: {
                margin: 161
            }
        }
    });

    owlGallery('.events__sliderBox', {
        loop: true,
        nav: true,
        dots: false,
        navContainer: '.events__sliderNav',
        responsive: {
            0: {
                items: 3,
                margin: 40
            }
        }
    });

    owlGallery('.community__sliderBox', {
        items: 1,
        margin: 40,
        loop: true,
        nav: true,
        navContainer: '.community__sliderNav',
        dotsContainer: '.community__sliderDots'
    });

    contentFadeInOnReady();


    //детальные страницы

    //обертка для fancybox
    if ($('.detail img').length || $('[data-fancybox]').length) {
        $('.detail img, img[data-fancybox]').each((i, el) => {
            $(el).wrap(`<a class='detail__image' href='${$(el).attr('src')}' data-fancybox><span>${$(el).attr('alt')}</span></a>`);
        })

        //fancybox
        $('a[data-fancybox]').fancybox({
            buttons: [
                "zoom",
                "download",
                "close",
            ],
            // clickContent: function (current, event) {
            //     return "zoom";
            // },
            // dblclickContent: function (current, event) {
            //     return "zoom";
            // },
        })
    }

    //появление кнопки при скролле 
    if ($('.appears').length) {
        $(window).on('scroll', e => {
            buttonScroll('.detail__button--scroll', '.appears');
        })
    }

    //отобразить название загружаемого файла
    $('.project__load').on('change', function () {
        let splittedFakePath = this.value.split('\\');
        $('.project__file').text(splittedFakePath[splittedFakePath.length - 1]);
    });

    bindModalListeners([{
            trigger: '.detail__button--scroll',
            modal: '.modal--load'
        },
        {
            trigger: '.auth__submit--reg',
            modal: '.modal--confirm'
        }
    ])

    //табы в настройках профиля 
    $('.profile__button').first().addClass('active');
    $('.profile__form').first().addClass('active');
    $('.profile__button').on('click', e => {
        switchActive(e.target, '.profile__button', 'active');
        tabs(e.target, '.profile__form', 'data-tab');
    });

    //очистка поиска 
    $('.content__searchClear').on('click', e => {
        $(e.target).siblings('input').val('');
    })


    //страницы категорий

    //видео
    if ($('.videos').length) {
        let col = $('.videos__column:first');

        col.children(':nth-child(even)').each(function () {
            col.siblings('.videos__column').append(this);
        });

        $('.videoItem').hover(
            function () {
                let content = $(this).find('.videoItem__content');
                $(this).animate({
                    height: '+=' + content.innerHeight()
                }, 200);
                content
                    .slideDown(200)
                    .css('display', 'flex');
            },
            function () {
                let content = $(this).find('.videoItem__content');
                $(this).animate({
                    height: '-=' + content.innerHeight()
                }, 200, function () {
                    $(this).removeAttr('style');
                });
                content.slideUp(200);
            }
        );
    }
});
