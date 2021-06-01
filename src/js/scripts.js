const mobile = $(window).width() < 768;

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

        jQModal.find('.modal__close, [data-close]').on('click', function () {
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

const buttonScroll = appearTarget => {
    const bottomControl = $(window).scrollTop() + 100 > $(document).height() - $(window).height();
    if (bottomControl) {
        $(appearTarget).removeClass('visible');
    } else {
        $(appearTarget).addClass('visible');
    }
}

const tagTemplate = (text, name = '', type = '') => (
    `<button class='content__tag custom' data-name='${name}'>${text}</button>`
)

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
}

const filtersCount = () => {
    $('.content__searchCount').text(
        $('button.custom').length ? $('button.custom').length : ''
    )
}

const searchRequest = params => {
    $('.content__block--control.active').removeClass('active');
    freeScroll();
    //ajax request;
}

$('.content__field--filter input').on('change', e => {
    if ($('.content__tags').length > 0 ||
        ($('.content__mobileTags').length > 0 && mobile)) {
        addFilters(e, mobile ? '.content__mobileTags' : '.content__tags');
        filtersCount();
    }
    //ajax request;
})

$('.content__mobileSubmit').on('click', () => searchRequest());

$('body').on('click', '.content__tag.custom', e => {
    $(e.currentTarget).remove();
    $('.content__field input').each((i, el) => {
        if ($(e.currentTarget).text() === $(el).siblings('label:not(:empty)').text()) $(el).prop('checked', false);
        filtersCount();
    })
    //ajax request
})


// const mobileSelectWrapper = parent => {
//     const buttons = $(parent).children();
//     $(parent).append('<div class="mobile-select"></div>');
//     buttons.appendTo($(parent).find('.mobile-select'));
//     const height = Array.from(buttons)
//         .reduce((total, curr, i) => total + $(curr).outerHeight(), 0);
//     $(parent).find('.mobile-select').on('click', e => {
//         $(e.delegateTarget).toggleClass('open');
//         $(e.delegateTarget).css('height', $(e.delegateTarget).hasClass('open') ? height : '');
//     });
// }


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
    })
}

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
                $(parent).find('.filter-current').text(that.text());
                // ajax request
                break;
            case that.hasClass('mobile-select'):
                $(parent).find('.mobile-select').removeClass('active');
                freeScroll();
                break;
        }
    })
}



$().ready(() => {
    $(document).on('click', '.header__search-btn[type="button"]', function () {
        openSearch($(this));
    });

    // убираем дизейбл с кнопки на странице профиля
    $('.profile__checkbox').on('change', () => {
        $('.profile__submit--subscribe').prop('disabled', false);
    });

    $('.header__search-closeBtn').on('click', function () {
        closeSearch($(this));
    });

    owlGallery('.promo__sliderBox', {
        loop: true,
        nav: true,
        dots: false,
        navContainer: '.promo__sliderNav',
        responsive: {
            0: {
                items: 3,
                margin: 40
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
            buttonScroll('.appears');
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
        },
        {
            trigger: '.content__searchFilters',
            modal: '.content__block--control'
        },
        {
            trigger: '.content__searchInput--mobile',
            modal: '.content__search--mobile'
        }
    ])

    //табы в настройках профиля 
    if (!mobile) $('.profile__button').first().addClass('active');
    $('.profile__form').first().addClass('active');
    $('.profile__button').on('click', e => {
        switchActive(e.target, '.profile__button', 'active');
        tabs(e.target, '.profile__form', 'data-tab');
    });
    $('.content__filter').on('click', e => switchActive(e.target, '.content__filter', 'active'));
    if (mobile && $('.content__filter').length > 0) {
        mobileFilterHorizontal('.content__filters');
    }
    if (mobile && $('.profile__options').length > 0) {
        mobileFilterHorizontal('.profile__options');
        $('.profile__button:not(.filter-current)').first().addClass('active');
    }
        
    // if (mobile && $('.content__filters').length) mobileSelectWrapper('.content__filters');


    //очистка поиска 
    $('.content__searchClear').on('click', e => {
        $(e.target).siblings('input').val('');
        location.search = '';
    })

    $('.content__mobileClear').on('click', e => {
        $('.content__mobileSearch').val('');
        location.search = '';
    })

    $('.content__clear').on('click', e => {
        location.search = '';
    })

    //раскрытие фильтров на мобильных 
    $('.content__heading').on('click', e => {
        $(e.target).toggleClass('open');
    })

    //сетка для видео
    if ($('.videos').length) {
        let col = $('.videos__column:first');
        col.children(':nth-child(even)').each(function () {
            col.siblings('.videos__column').append(this);
        });
    }

    //валидация формы
    if ($('.project__body').length) formValidator('.project__body');

    //фикс для валидации селекта 
    $('.project__select').on('change', e => {
        const that = $(e.target);
        that.siblings('input[type="hidden"]').val(that.val());
    })
});