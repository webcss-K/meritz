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
        $('#menu').toggleClass('open');
        $('body').css('overflow', 'hidden');
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



//지역리스트 출력
$(function () {
    areaSelectMaker("#user_sido", "#user_gugun");
});
var areaSelectMaker = function (a2, a3) {
    if (a2 == null || a3 == null) {
        console.warn("Unkwon Area Tag");
        return;
    }

    var area = {
        "서울": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
        "경기": ["수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시", "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군",
            "양평군"],
        "인천": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"],
        "강원": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
        "충북": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
        "충남": ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
        "대전": ["대덕구", "동구", "서구", "유성구", "중구"],
        "세종특별자치시": ["세종특별자치시"],
        "전북": ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
        "전남": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
        "광주": ["광산구", "남구", "동구", "북구", "서구"],
        "경북": ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
        "경남": ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
        "부산": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
        "대구": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
        "울산": ["남구", "동구", "북구", "중구", "울주군"],
        "제주특별자치도": ["서귀포시", "제주시"]
    };

    //초기화
    init(true);

    var search_sido = ``;
    var search_gugun = ``;

    //권역 기본 생성
    var areaKeys1 = Object.keys(area);
    areaKeys1.forEach(function (Region) {
        var a1_selected = '';

        if (search_sido == Region) {
            a1_selected = "selected";
        }
        $(a2).append("<option value=" + Region + " " + a1_selected + ">" + Region + "</option>");
    });

    if (search_sido) {
        init();

        var Do = search_sido;
        var keys = Object.keys(area[Do]);
        keys.forEach(function (SiGunGu) {
            var a2_selected = '';
            if (search_gugun == area[Do][SiGunGu]) {
                a2_selected = "selected";
            }
            $(a3).append("<option value=" + area[Do][SiGunGu] + " " + a2_selected + ">" + area[Do][SiGunGu] + "</option>");
        });

    }

    //변경 이벤트
    $(document).on("change", a2, function () {
        init();
        var Do = $(this).val();
        var keys = Object.keys(area[Do]);
        keys.forEach(function (SiGunGu) {
            $(a3).append("<option value=" + area[Do][SiGunGu] + ">" + area[Do][SiGunGu] + "</option>");
        });
    });

    function init(second) {
        second ? $(a2).empty().append("<option value=''>시/도</option>") : "";
        $(a3).empty().append("<option value=''>시/군/구</option>");
    }
}


//체크박스 추가
$(document).on("click", "#c_agree", function() {
    if($("#c_agree").is(":checked")){
        $("input[name=agree_chk]").prop("checked", true);
        $("input:radio[name='terms_chk']:radio[value='true']").prop('checked', true);
        $("input:radio[name='counsel_chk']:radio[value='true']").prop('checked', true);
    }else{
        $("input[name=agree_chk]").prop("checked", false);
        $("input:radio[name='terms_chk']:radio[value='false']").prop('checked', true);
        $("input:radio[name='counsel_chk']:radio[value='false']").prop('checked', true);
    }
});

$(document).on("click", "input[name=agree_chk]", function() {
    const total = $("input[name=agree_chk]").length;
    const total_checked = $("input[name=agree_chk]:checked").length;
    const checked = $(this).is(':checked');
    const val = $(this).val()
    if(val === 'terms'){
        if (checked){
            $("input:radio[name='terms_chk']:radio[value='true']").prop('checked', true);
            $('#sheet-agreement1 a').removeAttr("disabled")
        }else{
            $("input:radio[name='terms_chk']:radio[value='false']").prop('checked', true);
            $('#sheet-agreement1 a').attr('disabled', 'disabled')
        }
    }else if(val === 'counsel'){
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