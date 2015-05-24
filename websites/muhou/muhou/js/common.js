$(function () {
    window.onresize = onResize;

    textSlide();

});

function textSlide() {
    $(".navItem").hover(function () {
        $(this).children(".menu").stop().slideDown("fast");
    }, function () {
        $(this).children(".menu").stop().slideUp("fast");
    });
    // search-select action
    var sSelect = $(".search-select"),
        sSelectH2 = sSelect.children("h2"),
        sSelectCont = sSelect.children(".select-cont");
    sSelect.hover(function () {
        sSelectCont.show();
    }, function () {
        sSelectCont.slideUp("fast");
    })
    sSelectCont.on("click", "a", function (e) {
            e.stopPropagation();
            e.preventDefault();
            sSelectH2.text($(this).text())
            sSelectCont.hide();
        })
        // header fixed
    var oNav = $(".header"),
        iNavTop = oNav.offset().top;
    $(window).scroll(function () {
        var iscrollTop = $(window).scrollTop();
        if (iNavTop < iscrollTop) {
            oNav.addClass("J-header");
        } else {
            oNav.removeClass("J-header");
        }
    });

//     index
    $(".banner").slide();
    $(".mhmapScroll").slide({
        effect: "topMarquee",
        interTime: 50,
        vis: 2
    });
    $(".notice-text").slide({
            effect: "topMarquee",
            interTime: 50,
            vis: 3
        });
//         menuTab
    var menuTab = $(".menuTab"),
        menuTabSub = menuTab.children(".menuTabCont");
    menuTabSub.eq(0).children("dt").addClass("cur");
    menuTabSub.eq(0).children("dd").show();
    menuTabSub.on("mouseover", function () {
        $(this).children("dt").addClass("cur");
        $(this).siblings("dl").children("dt").removeClass("cur");
        $(this).children("dd").show();
        $(this).siblings("dl").children("dd").hide();
    });
}

function onResize() {
}