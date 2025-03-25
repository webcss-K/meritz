let graphMotion = false;
let incomeMotion = false;
let incomeInterval;
let incomeNum = 0
let reviewInterval;
let reviewMotion = false;
let reviewMoveNum = 0;
let giftInterval;
let giftMotion = false;
let giftMoveNum = 0;

$(document).ready(function(){
	uiAccordions();
    uiPartnerView();
    uiMonthIncome();
    uiReview();
    uiGift();
    $(window).bind("scroll",scrollEventListener)
    scrollEventListener()
});//(document).ready END

//------------ Accordions script S ---------------------
const uiAccordions = () => {
    $('.section-story .accordion ul li').bind("click", accordionClickHAndler)
}

const accordionClickHAndler = (e) => { 
    if($(e.currentTarget).hasClass("active")) {
        //TweenMax.to($('.section-story .accordion ul li.active').find(".box"), 0.7,{ height:0, ease: Cubic.easeOut, onComplete:activeRemove, onCompleteParams:[$('.section-story .accordion ul li.active')]});
        $(e.currentTarget).removeClass("active");
        return;
    }else{
        $('.section-story .accordion ul li.active').removeClass("active");
    }
    //TweenMax.to($('.section-story .accordion ul li.active').find(".box"), 0.7,{ height:0, ease: Cubic.easeOut, onComplete:activeRemove, onCompleteParams:[$('.section-story .accordion ul li.active')]});
    $(e.currentTarget).addClass('active')
    //let targetHeight = $(e.currentTarget).find(".box").height() 
    //TweenMax.to($(e.currentTarget).find(".box"), 0,{ height:0, ease: Cubic.easeOut});
    //TweenMax.to($(e.currentTarget).find(".box"), 0.7,{ height:targetHeight, ease: Cubic.easeOut});
}

const activeRemove = (e) => {
    $(e).removeClass("active");
    $(e).find(".box").height('unset'); 
}
//------------ Accordions script E ---------------------

//------------ PartnerView script S ---------------------
const uiPartnerView = () => {
    initPartner()
}
const initPartner = () => {
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(0), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(1), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(2), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(3), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(4), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(5), 0,{ height:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .bubble"), 0,{ scale:0.5, scale:1, rotation:-15, alpha:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .num"), 0,{ scale:2, alpha:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .curve"), 0,{ alpha:0, ease: Cubic.easeOut});
}
const startPartnerMotion = () => {
    initPartner();
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(0), 0.4,{ height:'15%', ease: Expo.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(1), 0.5,{ delay:0.2, height:'25%', ease: Expo.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(2), 0.5,{ delay:0.3, height:'35%', ease: Expo.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(3), 0.6,{ delay:0.4, height:'45%', ease: Expo.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(4), 0.6,{ delay:0.5, height:'55%', ease: Expo.easeOut});
    TweenMax.to($(".section-calc .cont02 .graph .bar").eq(5), 0.5,{ delay:0.6, height:'100%', ease: Expo.easeOut});

    TweenMax.to($(".section-calc .cont02 .curve"), 0.6,{ delay:0.7, alpha:1, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .bubble"), 0.5,{ delay:0.9, scale:1, rotation:0, alpha:1, ease: Back.easeOut});
    TweenMax.to($(".section-calc .cont02 .num"), 0.3,{ delay:1, scale:1, alpha:1, ease: Back.easeOut});

    TweenMax.to($(".section-calc .cont02 .bubble"), 0.3,{ delay:1.2, scale:0.9, alpha:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .bubble"), 0.2,{ delay:1.6, scale:1, alpha:1, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .bubble"), 0.3,{ delay:1.8, scale:0.8, alpha:0, ease: Cubic.easeOut});
    TweenMax.to($(".section-calc .cont02 .bubble"), 0.2,{ delay:2.2, scale:1, alpha:1, ease: Cubic.easeOut});
}
//------------ PartnerView script E ---------------------
//------------ MonthIncome script S ---------------------

const uiMonthIncome = () => {
    initIncome()
}
const initIncome = () => {
    incomeNum = 0
    $(".cont05 .profit i").eq(0).text('0');
    $(".cont05 .profit i").eq(1).text('0');
    $(".cont05 .profit i").eq(2).text('0');
    $(".cont05 .profit i").eq(3).text('0');
    $(".cont05 .profit i").eq(4).text('0');
    $(".cont05 .profit i").eq(5).text('0');
    $(".cont05 .profit i").eq(6).text('0');
}

const startIncome = () => {
    changeIncomeNum();
    incomeInterval = setInterval(changeIncomeNum,30)
}
const changeIncomeNum = () => {
    incomeNum += Math.random()*100000
    let len = Math.ceil(incomeNum).toString().length;
    let numStr = Math.ceil(incomeNum).toString()
    for(let i=0; i<7-len;i++){
        numStr = '0'+numStr;
    }
    if(incomeNum>1420000){
        incomeNum = 1420000
        numStr = '1420000';
        clearInterval(incomeInterval);
    }
    for(let i=0; i<7;i++){
        $(".cont05 .profit i").eq(i).text(numStr.substring(i,i+1));
    }
}
//------------ MonthIncome script E ---------------------

//------------ Review script S ---------------------
const uiReview = () => {
    const swiper_members = new Swiper('.section-review .review_text', {
        slidesPerView: 2.2,
        spaceBetween: 12,
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });
    //initReview()
}
const initReview = () => {
    reviewMoveNum = 0
    TweenMax.to($(".section-review .review_text ul"), 0,{ x:0, ease: Cubic.easeOut});
}
const startReview = () => {
    clearInterval(reviewInterval);
    changeReviewNum();
    reviewInterval = setInterval(changeReviewNum,3000)
}
const changeReviewNum = () => {
    TweenMax.to($(".section-review .review_text ul"), 0,{ x:(reviewMoveNum * -254), ease: Cubic.easeOut});
    reviewMoveNum++ 
    TweenMax.to($(".section-review .review_text ul"), 1.2,{ x:(reviewMoveNum * -254), ease: Cubic.easeOut});
    if(reviewMoveNum>7) reviewMoveNum = 5
}
//------------ Review script E ---------------------

//------------ Gift script S ---------------------
const uiGift = () => {
    const swiper_members = new Swiper('.section-review .gift-list', {
        slidesPerView: 2.2,
        spaceBetween: 12,
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });
    //initGift()
}
const initGift = () => {
    giftMoveNum = 0
    TweenMax.to($(".event .gift-list ul"), 0,{ x:0, ease: Cubic.easeOut});
}
const startGift = () => {
    changeGiftNum();
    clearInterval(giftInterval);
    giftInterval = setInterval(changeGiftNum,6000)
}
const changeGiftNum = () => {
    TweenMax.to($(".event .gift-list ul"), 0,{ x:(giftMoveNum * -312), ease: Cubic.easeOut});
    giftMoveNum++ 
    TweenMax.to($(".event .gift-list ul"), 6,{ x:(giftMoveNum * -312), ease: Linear.easeNone});
    if(giftMoveNum>23) giftMoveNum = 12
}
//------------ Gift script E ---------------------

//------------ ScrollEvent script S ---------------------
function scrollEventListener(){
    if($(window).scrollTop()+$(window).height()>$(".section-calc .cont02 .text").offset().top){
        if(!graphMotion){
            graphMotion = true;
            startPartnerMotion();
        } 
    }
    if($(window).scrollTop()+$(window).height()<$(".section-calc .cont02 .graph").offset().top){
        if(graphMotion){
            graphMotion = false;
            initPartner();
        }        
    }
    if($(window).scrollTop()+$(window).height()>$(".cont05 .graph").offset().top){
        if(!incomeMotion){
            incomeMotion = true;
            initIncome();
            startIncome();
        } 
    }
    if($(window).scrollTop()+$(window).height()<$(".cont05").offset().top){
        if(incomeMotion){
            incomeMotion = false;
            initIncome();
        }        
    }
    /*
    if($(window).scrollTop()+$(window).height()>$(".section-review .review_text").offset().top){
        if(!reviewMotion){
            reviewMotion = true;
            initReview();
            startReview();
        } 
    }
    if($(window).scrollTop()+$(window).height()<$(".section-review .player-wrap").offset().top){
        if(reviewMotion){
            reviewMotion = false;
            initReview();
        }        
    }
    */
    /*
    if($(window).scrollTop()+$(window).height()>$(".event .gift-list").offset().top){
        if(!giftMotion){
            giftMotion = true;
            initGift();
            startGift();
        } 
    }
    if($(window).scrollTop()+$(window).height()<$(".event").offset().top){
        if(giftMotion){
            giftMotion = false;
            initGift();
        }        
    }
    */
}
//------------ ScrollEvent script E ---------------------