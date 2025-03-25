$(document).ready(function(){
    const swiper_member = new Swiper('.section-visual .member-list', {
        slidesPerView: 1,
        spaceBetween: 15,
        direction: 'vertical',
        loop : true,
        loopAdditionalSlides : 1,
        speed:1000,
        autoplay:{
            delay:800,
            disableOnInteraction: false,
        },
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
        
    });    
    
    
    const swiper_members = new Swiper('.section-calc .member-list', {
        slidesPerView: 1.8,
        spaceBetween: 12,
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });

    const swiper_review = new Swiper('.section-story .review', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 18,
        pagination: {
            el: ".section-story .review .swiper-pagination",
            clickable: true,
        },
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });
    
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
        $(this).toggleClass('open');
        $('#menu').toggleClass('open');
    });

    // 링크 클릭 시 부드러운 스크롤
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 300);
        $('.header').addClass('light-bg');
        $('.menu-toggle').removeClass('open');
        $('.header .nav').removeClass('open');
    });

    // 탭 버튼에 대한 이벤트 리스너 추가
    $('.tab-list .tablinks').click(function() {
        var tabName = $(this).data('tab');
        var tabGroup = $(this).closest('.tab-list').data('tab-group');
        openTab(tabGroup, tabName);
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

// 탭을 열고 닫는 함수
function openTab(tabGroup, tabName) {
    $('#' + tabGroup + ' .tab-content').removeClass('current');
    $('#' + tabName).addClass('current');
    $('#' + tabGroup + ' .tablinks').removeClass('active');
    $('#' + tabGroup + ' button[data-tab="' + tabName + '"]').addClass('active');
    
    AOS.refresh();
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

$('.btn-step').click(function(e) {
    e.preventDefault();
    var parent = $(this).data('parent');
    var tg = $(this).data('tg');
    var amount = $(this).data('amount')

    if (amount) {
        let amount_txt = ''
        let contract_amount_txt = ''

        if (amount == '10만원미만'){
            amount_txt = '50~70'
        }else if (amount == '10~20만원'){
            amount_txt = '120~180'
        }else if (amount == '30만원이상'){
            amount_txt = '250~300'
        }else if (amount == '1시간미만'){
            amount_txt = '50~70'
            contract_amount_txt = '5~10'
        }else if (amount == '1~2시간이상'){
            amount_txt = '120~180'
            contract_amount_txt = '10~20'
        }else if (amount == '3시간이상'){
            amount_txt = '190~220'
            contract_amount_txt = '15~25'
        }else if (amount == '6시간이상'){
            amount_txt = '250~300'
            contract_amount_txt = '20~30'
        }
        $('.money-num').text(amount_txt)
        if (contract_amount_txt!=''){
            $('#contract_amount').text(contract_amount_txt)
        }
    }

    $('#' + parent ).hide().removeClass('open');
    $('#' + tg ).show().addClass('open');
    $('.back-button').addClass('active');
    let back_list = $('.back-button').data('back')
    back_list.push(parent)
    $('.back-button').data('back', back_list);
});

$('.close-button').click(function(e) {
    e.preventDefault();
    $('#sheet-calc .calc-step-wrap').hide().removeClass('open');
    $('#calc-main').css('display','flex');
    $('.back-button').removeClass('active');
});

$('.back-button').click(function(e) {
    e.preventDefault();
    let back_list = $('.back-button').data('back');
    let back = back_list.pop();
    $('.back-button').data('back', back_list);

    if (back == 'calc-main'){
        $('.back-button').removeClass('active');
    }

    $('#sheet-calc .open').hide().removeClass('open');
    $('#' + back ).show().addClass('open');
});

$(".privacy-check input[name='terms_chk']").change(function(){
    const checked = $(this).val()
    if (checked == 'true'){
        $('#c_terms').prop("checked", true);
        $('#sheet-agreement1 a').removeAttr("disabled")
    }else{
        $('#c_terms').prop("checked", false);
        $('#sheet-agreement1 a').attr('disabled', 'disabled')
    }
});

$(".privacy-check input[name='counsel_chk']").change(function(){
    const checked = $(this).val()
    if (checked == 'true'){
        $('#c_counsel').prop("checked", true);
        $('#sheet-agreement2 a').removeAttr("disabled")
    }else{
        $('#c_counsel').prop("checked", false);
        $('#sheet-agreement2 a').attr('disabled', 'disabled')
    }
});

$("#c_agree").click(function() {
    if($("#c_agree").is(":checked")){
        $("input[name=agree_chk]").prop("checked", true);
        $("input:radio[name='terms_chk']:radio[value='true']").prop('checked', true);
        $("input:radio[name='counsel_chk']:radio[value='true']").prop('checked', true);
        $('#sheet-agreement1 a').removeAttr("disabled")
        $('#sheet-agreement2 a').removeAttr("disabled")
    }else{
        $("input[name=agree_chk]").prop("checked", false);
        $("input:radio[name='terms_chk']:radio[value='false']").prop('checked', true);
        $("input:radio[name='counsel_chk']:radio[value='false']").prop('checked', true);
        $('#sheet-agreement1 a').attr('disabled', 'disabled')
        $('#sheet-agreement2 a').attr('disabled', 'disabled')
    }
});

$("input[name=agree_chk]").click(function() {
    const total = $("input[name=agree_chk]").length;
    const total_checked = $("input[name=agree_chk]:checked").length;
    const checked = $(this).is(':checked');
    const val = $(this).val()

    if(val == 'terms'){
        if (checked){
            $("input:radio[name='terms_chk']:radio[value='true']").prop('checked', true);
            $('#sheet-agreement1 a').removeAttr("disabled")
        }else{
            $("input:radio[name='terms_chk']:radio[value='false']").prop('checked', true);
            $('#sheet-agreement1 a').attr('disabled', 'disabled')
        }
    }else if(val == 'counsel'){
        if (checked){
            $("input:radio[name='counsel_chk']:radio[value='true']").prop('checked', true);
            $('#sheet-agreement2 a').removeAttr("disabled")
        }else{
            $("input:radio[name='counsel_chk']:radio[value='false']").prop('checked', true);
            $('#sheet-agreement2 a').attr('disabled', 'disabled')
        }
    }

    if(total != total_checked) $("#c_agree").prop("checked", false);
    else $("#c_agree").prop("checked", true); 
});

