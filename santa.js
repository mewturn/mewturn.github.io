function memes() {
    code = document.getElementById("secret_code").value;
    console.log(code)
    get_gift_for(code);
}

function get_gift_for(name){
    let participants = {
        "milton123": "bWVtZXM=",
        "evon999": "Hehe"
    }
    if (name.toLowerCase() in participants) {
        document.getElementById("santa_text").innerHTML = "Please prepare a gift for: " + atob(participants[name]);
    } else {
        document.getElementById("santa_text").innerHTML = "Please enter a valid secret code!";   
    }
}