$(function () {
    window.onresize = onResize;
    accordionDropdown();
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
    $(".notice-text-small").slide({
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

function onResize() {}

/*------------------accordion dropdown------------------*/
function accordionDropdown(accordionClass, liHeight) {
    //    var accordionDropdowns = document.getElementsByClassName("accordion-dropdown");
    var accordionDropdowns = document.getElementsByClassName(accordionClass);
    for (var i = 0; i < accordionDropdowns.length; i++) {
        if (!isDropdownToggle(accordionDropdowns[i])) {
            continue;
        }

        initDisplay(accordionDropdowns[i]);

        accordionDropdowns[i].onclick = function () {
            var uls = this.getElementsByTagName("ul");
            if (uls.length > 0) {

                toggle(this, uls);
            }
        }
    }

    function toggleDropdown(dropdownMenus, operate) {
        for (var j = 0; j < dropdownMenus.length; j++) {
            dropdownMenus[j].style.height = operate;
            extraMethod(operate == "0px", dropdownMenus[j]);

        }
    }

    function extraMethod(isTure, ul) {
        var dropdownTriangle = ul.parentNode.getElementsByClassName("dropdown-triangle")[0];
        if (isTure.toString() == "true") {
            dropdownTriangle.innerHTML = "▼";
            ul.style.display = "none";
        } 
        else{
            dropdownTriangle.innerHTML = "▲";
            ul.style.display = "block";
        }
    }

    function toggle(target, dropdownMenus) {
        var subElements = dropdownMenus[0].getElementsByTagName("li");
        var totalExpandHeight = liHeight * subElements.length;
        if (isOpen(target)) {
            target.className = target.className.replace("open", "");
            toggleDropdown(dropdownMenus, "0px");
        } else {
            target.className = target.className + " " + "open";
            toggleDropdown(dropdownMenus, totalExpandHeight.toString() + "px");
        }
    }

    function initDisplay(dropdown) {
        var dropdownMenus = dropdown.getElementsByTagName("ul");
        var subElements = dropdownMenus[0].getElementsByTagName("li");
        var totalExpandHeight = subElements[0].offsetHeight * subElements.length;
        if (dropdown.className.indexOf("open") > -1) {
            toggleDropdown(dropdownMenus, totalExpandHeight.toString() + "px");
        }
    }
}

function isDropdownToggle(toggle) {
    if (toggle.attributes["data-toggle"].value == "dropdown") {
        return true;
    }
    return false;
}

function isOpen(dropdownNode) {
    if (dropdownNode.className.indexOf("open") > -1) {
        return true;
    }
    return false;
}