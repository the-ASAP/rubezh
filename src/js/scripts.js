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
}

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

const openSearch = (btn) => {
    let submitBtn = btn.clone().prop("type", "submit");

    btn.parent().addClass("active");
    btn.replaceWith(submitBtn);
    submitBtn.hide();
    submitBtn.fadeIn(200);
    submitBtn.siblings("input").focus();
}

const closeSearch = (btn) => {
    btn.parent().removeClass("active");
    btn.siblings("button").prop("type", "button");
}

$().ready(() => {
    $(document).on("click", ".header__search-btn", function () {
        openSearch($(this));
    });

    $(".header__search-closeBtn").on("click", function() {
        closeSearch($(this));
    });

    contentFadeInOnReady();
    bindModalListeners([]);
});
