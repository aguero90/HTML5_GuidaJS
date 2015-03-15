/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function modificaUsername() {

    username = document.getElementById("username").value;
    if (username === "" || !username.charAt(0).match(/[a-z]/i) || /[-?,!/|+*%$£"'&()#@}{]/.test(username)) {
        document.getElementById("validazione_username").className = "validazione ko";
    }
    else {
        document.getElementById("validazione_username").className = "validazione ok";
    }

}


function modificaPassword() {

    password = document.getElementById("password").value;
    if (password === "" || !password.charAt(0).match(/[a-z]/i) || /[-?,!/|+*%$£"'&()#@}{]/.test(password)) {
        document.getElementById("validazione_password").className = "validazione ko";
    }
    else {
        document.getElementById("validazione_password").className = "validazione ok";
    }

}


function modificaMail() {

    mail = document.getElementById("mail").value;
    var pattern_mail = /\w+@\w+\.\w{2,4}/i;
    if (mail === "" || !pattern_mail.test(mail)) {
        document.getElementById("validazione_mail").className = "validazione ko";
    }
    else {
        document.getElementById("validazione_mail").className = "validazione ok";
    }

}


function CambiaStile() {

    var stile = document.getElementById("css");
    if (stile.className === "blue") {
        stile.setAttribute("href", "FormConJS_Orange.css");
        stile.className = "orange";
    }
    else if (stile.className === "orange") {
        stile.setAttribute("href", "FormConJS_Blue_1.css");
        stile.className = "blue_1";
    }
    else {
        stile.setAttribute("href", "FormConJS_Blue.css");
        stile.className = "blue";
    }

}


function ScrollaPagina() {

}


function CambiaABlue() {
    var stile = document.getElementById("css");
    stile.setAttribute("href", "FormConJS_Blue.css");
    stile.className = "blue";
}


function CambiaAOrange() {
    var stile = document.getElementById("css");
    stile.setAttribute("href", "FormConJS_Orange.css");
    stile.className = "orange";
}


function CambiaABlue_1() {
    var stile = document.getElementById("css");
    stile.setAttribute("href", "FormConJS_Blue_1.css");
    stile.className = "blue_1";
}



