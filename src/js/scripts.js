const tablet = $(window).width() < 1025,
    mobile = $(window).width() < 769;

//удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $('.preloader').fadeOut(150, () => {
        $('.preloader').remove();
    });
};

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = (modalArr, fixIndex = false) => {
    modalArr.forEach(obj => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on('click', function () {
            fixIndex ? $('.main').css('z-index', '2') : $('.main').attr('style', '');
            stopScroll('body');
            jQModal.addClass('active');
        });

        jQModal.on('click', function (e) {
            fixIndex ? $('.main').attr('style', '') : '';
            if ($(e.target).hasClass('modal')) {
                $(this).removeClass('active');
                freeScroll();
            }
        });

        jQModal.find('.modal__close, [data-close]').on('click', function () {
            fixIndex ? $('.main').attr('style', '') : '';
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
    btn.siblings('input').val('');
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
        btn.parent().siblings('div').slideDown(200);
    }
};

const switchActive = (target, allElems, className) => {
    $(allElems).removeClass(className);
    $(target).addClass(className);
};

const tabs = (button, content, tabAttr) => {
    $(content).each((i, el) => {
        if ($(el).attr(tabAttr) === $(button).attr(tabAttr)) {
            $(content).removeClass('active').hide();
            $(el).fadeIn();
        }
    })
};

const buttonScroll = appearTarget => {
    const bottomControl = $(window).scrollTop() + 100 > $(document).height() - $(window).height();
    if (bottomControl) {
        $(appearTarget).removeClass('visible');
    } else {
        $(appearTarget).addClass('visible');
    }
};

const tagTemplate = (text, name = '', type = '') => (
    `<button class='content__tag custom' data-name='${name}'>${text}</button>`
);

const addFilters = (e, container) => {
    const text = $(e.target).siblings('label:not(:empty)').text(),
        that = $(e.target),
        nameAttr = that.prop('name');
    $('.default').remove();
    if (that.attr('type') === 'radio') {
        $(container).find(`[data-name=${nameAttr}]`).remove();
        $(container).append(tagTemplate(text, nameAttr));
    }
    if (that.attr('type') === 'checkbox') {
        if (that.prop('checked')) {
            $(container).append(tagTemplate(text, nameAttr));
        } else {
            $(container).find('button').each((i, el) => $(el).text() === text ? $(el).remove() : 0);
        }
    }
};

const resizeFilters = (flag, mobile, mobFilters, descFilters, activeFilter) => {
    const activeFilterClass = `.` + activeFilter[0].classList[0];
    //ресайзим фильтры
    if (flag && mobile) {
        mobileFilterHorizontal(mobFilters);
        flag = false;
    } else if (!flag && !mobile) {
        $(mobFilters).html(descFilters);
        flag = true;
    }
    //добавляем класс на активный
    $('.filter-current').attr('id', activeFilter.attr('id')).text(activeFilter.text());
    $(activeFilterClass).each(function () {
        if ($(this).attr('id') === activeFilter.attr('id')) {
            switchActive($(this), activeFilterClass, 'active');
        }
    });
    return flag;
};

const filtersCount = () => {
    $('.content__searchCount').text(
        $('button.custom').length ? $('button.custom').length : ''
    );
};

const removeDisable = (button) => {
    $(button).prop('disabled', false);
};

const searchRequest = params => {
    $('.content__block--control.active').removeClass('active');
    freeScroll();
    //ajax request;
};

const mobileFilterHorizontal = parent => {
    const buttons = $(parent).children();
    $(parent).append(buttons.eq(0).clone().addClass('filter-current'), '<div class="mobile-select"><div class="mobile-select__box"></div></div>');
    buttons.not('.filter-current').appendTo($(parent).find('.mobile-select__box'));
    $(parent).on('click', e => {
        const that = $(e.target);
        switch (true) {
            case that.hasClass('filter-current'):
                $(parent).find('.mobile-select').addClass('active');
                stopScroll();
                break;
            case that.is('button:not(.filter-current)'):
                $(parent).find('.filter-current').attr('id', that.attr('id')).text(that.text());
                // ajax request
                break;
            case that.hasClass('mobile-select'):
                $(parent).find('.mobile-select').removeClass('active');
                freeScroll();
                break;
        }
    });
};

const formValidator = form => {
    form = document.querySelector(form);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formValidate({
            form,
            url: form.getAttribute('action'),
            onLoadStart: () => {
                console.log('load start');
            },
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error')
            }
        });
    });
};

const grid = (col) => {
    let firstCol = $(col).first();
    firstCol.children(':nth-child(even)').each(function () {
        firstCol.siblings(col).append(this);
    });
};

const resize = (init) => {
    let flag = true,
        initData = new Array(),
        activeFilter;
    $.each(init, function (i, val) {
        initData[i] = $(val).html();
        $(val).length ? activeFilter = $(val).find('.active') : $(val).find('button:first-child');
    });

    $(window).resize(() => {
        let tablet = $(window).width() < 1025,
            mobile = $(window).width() < 769;

        if (mobile) {
            $('.content__heading').on('click', e => {
                $(e.target).toggleClass('open');
            });
        }

        //ресайз фильтров
        if ($('.content__filters').length) {
            flag = resizeFilters(flag, mobile, init[0], initData[0], activeFilter);
        }
        if ($('.profile__options').length) {
            flag = resizeFilters(flag, mobile, init[1], initData[1], activeFilter);
        }

        //реинит активного фильтра
        $('.content__filter').on('click', function (e) {
            switchActive(e.target, '.content__filter', 'active');
            activeFilter = $(this);
        });
        $('.profile__button:not(.filter-current)').on('click', function (e) {
            switchActive(e.target, '.profile__button', 'active');
            tabs(e.target, '.profile__form', 'data-tab');
            activeFilter = $(this);
        });
    });

    $(window).trigger('resize');
};

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

    $('.bnr__closeBtn').on('click', function () {
        $(this).closest('.bnr').remove();
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
        margin: 40,
        loop: true,
        nav: true,
        navContainer: '.events__sliderNav',
        dotsContainer: '.events__sliderDots',
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

    if (!mobile) {
        owlGallery('.community__sliderBox', {
            items: 1,
            margin: 40,
            loop: true,
            nav: true,
            navContainer: '.community__sliderNav',
            dotsContainer: '.community__sliderDots'
        });
    }

    $('.content__field--filter input').on('change', e => {
        if ($('.content__tags').length > 0 ||
            ($('.content__mobileTags').length > 0 && mobile)) {
            addFilters(e, mobile ? '.content__mobileTags' : '.content__tags');
            filtersCount();
        }
        //ajax request;
    });

    $('.content__mobileSubmit').on('click', () => searchRequest());


    //детальные страницы

    //обертка для fancybox 
    if ($('.detail img').length || $('[data-fancybox]').length) {
        $('.detail img, img[data-fancybox]').each((i, el) => {
            const alt = $(el).attr('alt');
            $(el).wrap(`<a class='detail__image' href='${$(el).attr('src')}' data-fancybox><figure></figure></a>`);
            $(el).after(`<figcaption>` + alt + `</figcaption>`);
            if (!alt) {
                $(el).closest('a').css('margin-bottom', '0');
            }
        });

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
        });
    }

    //появление кнопки при скролле 
    if ($('.appears').length) {
        $(window).on('scroll', e => {
            buttonScroll('.appears');
        });
    }

    $('.profile__checkbox').on('change', e => {
        removeDisable('.profile__submit--subscribe');
    });

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
        },
        {
            trigger: '.content__searchFilters',
            modal: '.content__block--control'
        },
        {
            trigger: '.content__searchInput--mobile',
            modal: '.content__search--mobile'
        }
    ], true)

    //добавляем активный класс для первой загрузки
    $('.content__filter:not(.filter-current)').first().addClass('active');
    $('.profile__button:not(.filter-current)').first().addClass('active');
    $('.profile__form').first().addClass('active');

    //очистка поиска 
    $('.content__searchClear, .content__mobileClear').on('click', e => {
        // $(e.target).siblings('input').val('');
        location.search = '';
    });


    //страницы категорий

    //сетка для видео
    if ($('.videos').length) {
        if (!mobile) {
            grid('.videos__column');
        }

        if (!tablet) {
            $('.videoItem').hover(
                function () {
                    let content = $(this).find('.videoItem__content');
                    $(this).animate({
                        height: '+=' + content.outerHeight()
                    }, 200);
                    content
                        .fadeIn(200)
                        .css('display', 'flex');
                },
                function () {
                    let content = $(this).find('.videoItem__content');
                    $(this).animate({
                        height: '-=' + content.outerHeight()
                    }, 200, function () {
                        $(this).removeAttr('style');
                    });
                    content.fadeOut(200);
                }
            );
        }
    }

    //сетка для проектов
    if ($('.draft').length) {
        if (!tablet) {
            grid('.content__column');
        }
    }

    //валидация формы
    if ($('.project__body').length) {
        formValidator('.project__body');
    }

    //фикс для валидации селекта 
    $('.project__select').on('change', e => {
        const that = $(e.target);
        that.siblings('input[type="hidden"]').val(that.val());
    });

    //ресайз
    resize(['.content__filters', '.profile__options']);
});

// IE 
$(function () {
    contentFadeInOnReady();
});
