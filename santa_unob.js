var participants = {
    'milton65428': 'Sm9keQ==',
    'jason62309': 'TWVsb2R5',
    'annie-chen46896': 'RmF5ZQ==',
    'susan30920': 'TW9uaWNh',
    'evon66659': 'Q2hpbm1pbmc=',
    'amy74996': 'QW5uaWUtQ2hlbg==',
    'jocelyn72047': 'U3VzYW4=',
    'silvia79204': 'Q2Fyb2xl',
    'melody22198': 'Q2hhcmxlcw==',
    'karen89487': 'U2lsdmlh',
    'amber51235': 'TWlsdG9u',
    'monica22103': 'QW15',
    'teresa64266': 'RXZvbg==',
    'annie-chang14168': 'VGVyZXNh',
    'carole47536': 'QW5uaWUtQ2hhbmc=',
    'jody46490': 'SmFzb24=',
    'charles33426': 'S2FyZW4=',
    'faye55511': 'Sm9jZWx5bg==',
    'chinming61088': 'QW1iZXI='
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