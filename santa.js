var participants = {
    'milton58906': 'TW9uaWNh',
    'jason26130': 'U2lsdmlh',
    'annie-chen38824': 'VGVyZXNh',
    'susan78455': 'QW5uaWUtQ2hhbmc=',
    'evon69839': 'RmF5ZQ==',
    'amy95584': 'Q2hpbm1pbmc=',
    'jocelyn93365': 'QW5uaWUtQ2hlbg==',
    'silvia73038': 'TWlsdG9u',
    'melody13338': 'S2FyZW4=',
    'karen34018': 'Sm9keQ==',
    'amber27279': 'SmFzb24=',
    'monica90529': 'Sm9jZWx5bg==',
    'teresa57012': 'QW15',
    'annie-chang22910': 'Q2Fyb2xl',
    'carole50381': 'QW1iZXI=',
    'jody78592': 'Q2hhcmxlcw==',
    'charles10418': 'TWVsb2R5',
    'faye71671': 'U3VzYW4=',
    'chinming66622': 'RXZvbg=='
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