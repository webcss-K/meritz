const CURRENT_TIME_KEY = 'currentTime'

const rootHost = location.host
if (rootHost === 'localhost:8080' || rootHost === '127.0.0.1:8080') {
    API_URL = 'https://dev-api.meritzpartners.com'
} else if (rootHost === 'dev.meritzpartners.com') {
    API_URL = 'https://dev-api.meritzpartners.com'
} else {
    API_URL = 'https://api.meritzpartners.com'
}

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 현재 시간 저장
 */
const saveCurrentTime = () => {
    // 현재 시간
    const currentTime = new Date().toISOString();
    // 쿠키에 저장
    setCookie(CURRENT_TIME_KEY, currentTime, 1);  // 1일 동안 유효한 쿠키로 저장

    // sessionStorage에 저장
    sessionStorage.setItem(CURRENT_TIME_KEY, currentTime);

    // localStorage에 저장
    localStorage.setItem(CURRENT_TIME_KEY, currentTime);
}
/**
 * 저장된 시간을 순차적으로 확인 후 추출
 * 1. cookie(default)
 * 2. sessionStorage
 * 3. localStorage
 */
const getSavedCurrentTime = () => {
    // cookie에서 시간을 먼저 확인
    let savedTime = getCookie(CURRENT_TIME_KEY);

    // cookie에 없으면 sessinoStorage에서 확인
    if (!savedTime) {
        savedTime = sessionStorage.getItem(CURRENT_TIME_KEY);
    }

    // sessinoStorage에 없으면 localStorage에서 확인
    if (!savedTime) {
        savedTime = localStorage.getItem(CURRENT_TIME_KEY);
    }
    return savedTime;
}


const calculateTimeDifferenceInSeconds = (time1, time2) => {
    // 시간 문자열을 Date 객체로 변환
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    // 두 시간의 차이를 밀리초 단위로 계산
    const differenceInMilliseconds = Math.abs(date2 - date1);

    // 밀리초를 초로 변환
    let differenceInSeconds = Math.round(differenceInMilliseconds / 1000);

    // 5자리가 넘는 경우 99999로 설정
    if (differenceInSeconds > 99999) {
        differenceInSeconds = 99999;
    }

    return differenceInSeconds;
}


const checkEachCharacterKoreanInput = (input) => {
    const characters = input.split('')
    let result = false
    for (let i in characters) {
        const hangulConsonantOnlyRegex = /^[ㄱ-ㅎ]$/
        const hangulVowelOnlyRegex = /^[ㅏ-ㅣ]$/
        if (hangulConsonantOnlyRegex.test(characters[i])) {
            result = true
        } else if (hangulVowelOnlyRegex.test(characters[i])) {
            result = true
        }
    }
    return result
}

const isEmpty = (value) => {
    if (value == "" || value == 'null' || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
};

const getUrlParams = () => {
    var params = {};

    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });

    return params;
}

const query_params = getUrlParams();

const init_value = () => {
    $('#user_name').val('')
    $('#user_call').val('')
    $('#user_sido').val('')
    $('#user_gugun').val('')
    $('#cns_req_hr_div_cd').val('')
    $('#c_terms').prop("checked", false);
    $('#c_counsel').prop("checked", false);
    $('#c_agree').prop("checked", false);
    $('#job_div_cd').val('');
    $('#payment').val('');
    $('.btn_submit').attr('disabled', 'disabled');
    $('#sheet-agreement1 a').attr('disabled', 'disabled')
    $('#sheet-agreement2 a').attr('disabled', 'disabled')
    $("input:radio[name='terms_chk']:radio[value='false']").prop('checked', true);
    $("input:radio[name='counsel_chk']:radio[value='false']").prop('checked', true);
    $("#orgCd").val('')
}

const save_consultation_information = async (data) => {
    const sendBtn = document.getElementById('sendButton')
    sendBtn.disabled = true
    sendBtn.textContent = '전송중'
    await axios({
        method: "post", url: `${API_URL}/meritz/consultation-information`, data: data
    })
        .then((res) => {
            if (res.status == 204) {
                sendBtn.disabled = false
                sendBtn.textContent = '신청 완료'
                document.getElementById('is_saved').value = 'Y'
                dataLayer.push({event: "complete"});
                const desired_time = $('#cns_req_hr_div_cd option:checked').text()
                $('#desired_time').text(desired_time)
                init_value();
                openBottomSheet('sheet-success');
            }
        })
        .catch((error) => {
            dataLayer.push({event: "failure"});
            const res = error.response
            const msg = res.data.detail;
            sendBtn.disabled = false
            sendBtn.textContent = '신청 완료'
            alert(msg);
        })
        .finally(() => {

        });
};

/**
 * 이름 입력 체크
 * @param inputName
 * @return {string}
 */
const isVaildName = (inputName) => {
    const testString = inputName.trim();
    const specialCharRegex = /[!@#$%^&*(),?":{}|<>]/;
    const hangulWithSpaceRegex = /[가-힣]\s/;
    const mixedHangulAndEnglishRegex = /([가-힣][a-zA-Z]|[a-zA-Z][가-힣])/;

    if (specialCharRegex.test(testString)) {
        return "성함에 특수문자가 포함되어 있습니다.\n다시 한 번 확인 해주세요.";
    } else if (hangulWithSpaceRegex.test(testString)) {
        return "한글 성함에 띄어쓰기가 포함되어 있습니다.\n다시 한 번 확인 해주세요.";
    } else if (mixedHangulAndEnglishRegex.test(testString)) {
        return "성함에 한글과 영어가 섞여 있습니다.\n다시 한 번 확인 해주세요.";
    } else {
        return "";
    }
}

const save = async () => {

    if ($('#is_saved').val() == 'Y') {
        return
    }
    // $('#is_saved').val('Y')
    const fnm = $('#user_name').val().trim()
    const ctp = $('#user_call').val()
    const sido = $('#user_sido').val()
    const gugun = $('#user_gugun').val()
    const cns_req_hr_div_cd = $('#cns_req_hr_div_cd').val()
    const agr_tp_cd = $('#c_terms').is(':checked');
    const cho_agr_yn = $('#c_counsel').is(':checked');
    const job_div_cd = $('#job_div_cd').val();
    const hop_prem_div_cd = $('#payment').val();
    const orgCd = $('#orgCd').val();

    const advt_mdia_div_val = query_params['advtMdiaDivVal'] || "none"
    const advt_mdia_tp_div_val = query_params['advtMdiaTpDivVal'] || "none"
    const advt_mdia_dtl_div_val = query_params['advtMdiaDtlDivVal'] || "none"
    const agr_md_cd = '27'
    const choAgrYn = cho_agr_yn ? 'Y' : 'N'
    const ctpLen = ctp.length

    if (isEmpty(fnm)) {
        return alert('한글 이름을 정확하게 입력해 주세요.');
    }
    const nameValidationMessage = isVaildName(fnm);
    if (nameValidationMessage) {
        return alert(nameValidationMessage);
    }
    if (checkEachCharacterKoreanInput(fnm)) {
        return alert('입력하신 성함을 다시 한 번 확인 해주세요.');
    }
    if (isEmpty(ctp) || ctp.length < 9) {
        return alert('휴대전화를 정확하게 입력해 주세요.');
    }
    if (ctpLen <= 10) {
        return alert('휴대전화 번호를 확인하여 주시기 바랍니다.');
    }
    if (isEmpty(sido) || isEmpty(gugun)) {
        return alert('필수 항목인 거주 지역을 선택해 주세요.');
    }
    if (isEmpty(cns_req_hr_div_cd) || !cns_req_hr_div_cd) {
        return alert('필수 항목인 상담가능시간을 선택해 주세요.');
    }
    if (isEmpty(agr_tp_cd) || !agr_tp_cd) {
        return alert('필수약관 동의 후 상담 신청이 가능합니다.');
    }

    // 쿠키에서 현재 시간 읽기
    const savedTime = getSavedCurrentTime()
    const currentTime = new Date().toISOString();
    const useTime = calculateTimeDifferenceInSeconds(savedTime, currentTime)

    const data = {
        fnm: fnm,
        ctp: ctp,
        actArCd: sido + '_' + gugun,
        cnsReqHrDivCd: cns_req_hr_div_cd,
        advtMdiaDivVal: advt_mdia_div_val,
        advtMdiaTpDivVal: advt_mdia_tp_div_val,
        advtMdiaDtlDivVal: advt_mdia_dtl_div_val,
        agrMdCd: agr_md_cd,
        agrTpCd: '01',
        choAgrYn: choAgrYn,
        jobDivCd: job_div_cd,
        hopPremDivCd: hop_prem_div_cd,
        regDivCd: '01',
        useSs: useTime,
        orgCd: orgCd  // 2024-06-20 추가
    }

    await save_consultation_information(data)
    $('#is_saved').val('N')
}

const increase_visitors = async () => {
    // const nav = performance.getEntriesByType('navigation')[0].type;
    const nav = 'navigate'
    if (nav == 'navigate') {
        const location = window.location
        const origin = location.origin
        const pathname = location.pathname == '/' ? '' : location.pathname
        const page_url = origin + pathname

        const data = {
            page_url: page_url
        }
        await insert_visitors(data)
    }
}

const insert_visitors = async (data) => {
    await axios({
        method: "post", url: `${API_URL}/meritz/visitors`, data: data
    })
        .then(() => {

        })
        .catch(() => {
        })
        .finally(() => {

        });
};

const activeEvent = () => {
    const fnm = $('#user_name').val()
    const ctp = $('#user_call').val()
    const sido = $('#user_sido').val()
    const gugun = $('#user_gugun').val()
    const cns_req_hr_div_cd = $('#cns_req_hr_div_cd').val()
    const agr_tp_cd = $('#c_terms').is(':checked');
    const ageRange = $('#payment').val()

    switch (!(agr_tp_cd && fnm && ctp && sido && gugun && cns_req_hr_div_cd && ageRange)) {
        case true :
            $('.btn_submit').attr('disabled', 'disabled');
            break;
        case false :
            $('.btn_submit').removeAttr("disabled");
            break;
    }
}


// 상수 정의
const KOREAN_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣ\p{P}]+$/u;
const ENGLISH_REGEX = /^[a-zA-Z\p{P}]+$/u;
const KOREAN_ONLY_REGEX = /[^가-힣ㄱ-ㅎㅏ-ㅣ\p{P}]/gu; //한글, 특수문자만 허용, 띄어쓰기 비허용
const ENGLISH_AND_SPACE_REGEX = /[^a-zA-Z\p{P}\s]/gu; //영어, 특수문자, 띄어쓰기 허용

// 상태 변수
let isComposing = false;

// 유틸리티 함수
const isKorean = char => KOREAN_REGEX.test(char);
const isEnglish = char => ENGLISH_REGEX.test(char);

// 입력 처리 함수
const processInput = (value) => {
    const trimmedValue = value.trim();
    const firstChar = trimmedValue.charAt(0);

    if (isKorean(firstChar) || /[\p{P}]/u.test(firstChar)) {
        return value.replace(KOREAN_ONLY_REGEX, '');
    } else if (isEnglish(firstChar) || /[\p{P}]/u.test(firstChar)) {
        return value.replace(ENGLISH_AND_SPACE_REGEX, '');
    }
    return value; // 첫 글자가 한글, 영어, 특수문자가 아닐 경우 원래 값 반환
};

// 이벤트 핸들러
const handleInput = (event) => {
    if (isComposing) return; // 조합 중일 때는 처리하지 않음

    const $input = $(event.target);
    const currentValue = $input.val();
    const newValue = processInput(currentValue);

    if (currentValue !== newValue) {
        $input.val(newValue);
    }
};

$('#user_name')
    .on('compositionstart', () => { isComposing = true; })
    .on('compositionend', (event) => {
        isComposing = false;
        handleInput(event);
    })
    .on('input', handleInput)
    .on('input', activeEvent);


$('#user_call').on('input', activeEvent);
$('#user_sido').on('change', activeEvent);
$('#user_gugun').on('change', activeEvent);
$('#c_terms').on('change', activeEvent);
$('#cns_req_hr_div_cd').on('change', activeEvent);
$('#c_agree').on('change', activeEvent);
$('#payment').on('change', activeEvent);