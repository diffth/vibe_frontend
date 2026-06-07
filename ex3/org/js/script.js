$(function() {
    $(".gnb > ul > li").mouseover(function(){
        $(this).find(".depth2").slideDown();
    });
    $(".gnb > ul > li").mouseleave(function(){
        $(this).find(".depth2").slideUp();
    });

    $(".allmenu").click(function(){
        if ($(".allmenu").hasClass("on")) {
            $(".allgnb").hide();
            $(".allmenu").removeClass("on");
        } else {
            $(".allgnb").show();
            $(".allmenu").addClass("on");
        }
    });

    var swiper = new Swiper('.swiper1', {
        navigation: {
          nextEl: '.nbt1',
          prevEl: '.pbt1',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          loop: true,
      });

      var swiper = new Swiper('.swiper2', {
        navigation: {
          nextEl: '.nbt2',
          prevEl: '.pbt2',
        },
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
      });
/*
      $("#header").css({
        "position" : "fixed",
        "top" : "0",
        "left" : "0"
      });
  */  
/*
햄버거 아이콘 클릭

조건 : 지금 전체메뉴가 나와있는지, 안나와있는지

나와있다면 없애고
안나와있으면 나오고



*/

});
