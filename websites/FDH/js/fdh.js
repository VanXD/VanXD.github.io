$(function () {
    initMaskAnimation();
});


function initMaskAnimation() {
    $(".mask").hover(
        function () {
            $(".mask-text", this).stop().animate({
                height: "100%"
            });

        },
        function () {
            $(".mask-text", this).stop().animate({
                height: "0px"
            });
        });
}