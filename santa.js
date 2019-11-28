var participants = {
    'milton75189': 'Q2Fyb2xl',
    'jason19615': 'Q2hhcmxlcw==',
    'annie-chen92246': 'RmF5ZQ==',
    'susan54536': 'VGVyZXNh',
    'evon59091': 'QW5uaWUtQ2hhbmc=',
    'amy78475': 'Q2hpbm1pbmc=',
    'jocelyn35792': 'U2lsdmlh',
    'silvia16723': 'TWVsb2R5',
    'melody20866': 'U3VzYW4=',
    'karen66188': 'RXZvbg==',
    'amber43720': 'S2FyZW4=',
    'monica22771': 'QW5uaWUtQ2hlbg==',
    'teresa94336': 'Sm9jZWx5bg==',
    'annie-chang36848': 'TWlsdG9u',
    'carole28673': 'Sm9keQ==',
    'jody13306': 'QW1iZXI=',
    'charles88965': 'TW9uaWNh',
    'faye99603': 'SmFzb24=',
    'chinming28334': 'QW15'
}

function check_recipient(){
    code = document.getElementById("secret_code").value;
    _check_recipient(code);
}

function _check_recipient(code){
    if (code.toLowerCase() in participants) {
        document.getElementById("santa_text").innerHTML = "Please prepare a gift for: <font size='10'>" + atob(participants[code]) + "</font>";
    } else {
        document.getElementById("santa_text").innerHTML = "Please enter a valid secret code!";   
    }
}

function get_code_from_param(param){
    prefix = "?code=";
    return param.slice(prefix.length);
}

function load_secret_code_from_params(){
    param = window.location.search;
    if (param.length > 0) {
        code = get_code_from_param(param);
        document.getElementById("secret_code").value = code;
        _check_recipient(code);
    }
}