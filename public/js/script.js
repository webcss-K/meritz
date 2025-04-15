$(document).ready(function(){
    AOS.init(); // AOS 초기화 코드
    var isVisible = false;
    // scroll event
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var visualHeight = $('.section-visual .visual-top').outerHeight();       

        if (scrollPosition > visualHeight) {
            $('.fixed-btn').addClass('floating');
        } else {
            $('.fixed-btn').removeClass('floating');
        }

        if ($('.section-contact').hasClass('aos-animate')) {
            $('.fixed-btn').addClass('hide');
        } else {
            $('.fixed-btn').removeClass('hide');
        }

        $('.section-calc .chart-box li').each(function(index) {
            var $this = $(this);
            if (isElementInViewport($(this))) {
                setTimeout(function() {
                    $this.addClass('active');
                }, index * 50);
            } else {
                setTimeout(function() {
                    $this.removeClass('active');
                }, index * 50);
            }
        });
    });

    // 햄버거 메뉴 토글 이벤트 리스너
    $('.menu-toggle').click(function() {
        $('.menu-toggle').toggleClass('open');
        if($('.menu-toggle').hasClass('open')){
            $('.header .nav').addClass('open');
            $('body').css('overflow', 'hidden');
        } else{
            $('.header .nav').removeClass('open');
            $('body').css('overflow', 'auto');
        }
    });

    // 링크 클릭 시 부드러운 스크롤
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();
        $('body').css('overflow', 'auto');
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 300);
        $('.header').addClass('light-bg');

        $('.menu-toggle').removeClass('open');
        $('.header .nav').removeClass('open');
    });

    // scroll event
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var visualHeight = $('.contents01').outerHeight();

        if (scrollPosition > visualHeight) {
            $('.header').addClass('light-bg');
        } else {
            $('.header').removeClass('light-bg');
        }
    });
});

// 요소가 화면에 보이는지 여부를 확인하는 함수
function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect(); // 요소의 위치와 크기 정보 가져오기
    return (
        rect.top >= 0 && // 요소의 상단이 뷰포트 내에 있고
        rect.left >= 0 && // 요소의 왼쪽이 뷰포트 내에 있으며
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // 요소의 하단이 뷰포트 내에 있고
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) // 요소의 오른쪽이 뷰포트 내에 있으면
    );
}

// 바텀시트 열고 닫는 함수
function openBottomSheet(sheetName) {
    $('body').css('overflow', 'hidden');
    $('#' + sheetName).addClass('open');
    $('#' + sheetName + ' .sheet-wrap').addClass('animate-up');
}

function closeBottomSheet(sheetName) {
    $('#' + sheetName + ' .sheet-wrap').removeClass('animate-up').addClass('animate-down');
    setTimeout(function() {
        $('body').css('overflow', 'auto');
        $('#' + sheetName).removeClass('open');
        $('#' + sheetName + ' .sheet-wrap').removeClass('animate-down');
    }, 300);
}

function closeAll() {
    $('.bottom-sheet').removeClass('animate-up').addClass('animate-down');
    setTimeout(function() {
        $('body').css('overflow', 'auto');
        $('.bottom-sheet').removeClass('open');
        $('.bottom-sheet').removeClass('animate-down');
    }, 300);
    $('.back-button').removeClass('active');
}

function stepNext() {
    var t = $(this);
    var tg = $(this).data('parent');

    $(this).addClass('test');
    $('body').css('overflow', 'hidden');
    // $('#' + sheetName).addClass('open');
    // $('#' + sheetName + ' .sheet-wrap').addClass('animate-up');
}

$('.close-button').click(function(e) {
    e.preventDefault();
    $('#sheet-calc .calc-step-wrap').hide().removeClass('open');
});




//약관박스보기 추가
$(document).on("click", ".btn_privacy", function() {
    const viewClass = "."+$(this).parent().attr("class")+"_text";
    viewBoxReset($(this).parent().attr("class")+"_text")
    if($(viewClass).hasClass("active")){
        TweenMax.to($(this), 0.5,{ rotation:0, ease: Cubic.easeOut});
        $(viewClass).removeClass("active")
    }else{
        TweenMax.to($(this), 0.3,{ rotation:180, ease: Cubic.easeOut});
        $(viewClass).addClass("active")
    } 
});

const viewBoxReset = ($class) => {
    console.log($(".privacyText.active").attr("class"),$class)
    if($(".privacyText.active").hasClass($class)){
        return
    }else{
        $(".privacyText.active").removeClass("active")
    }
    TweenMax.to($(".btn_privacy"), 0.3,{ rotation:0, ease: Cubic.easeOut});
}