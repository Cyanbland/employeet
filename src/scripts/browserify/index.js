const mdcMenu = require('@material/menu');
const MDCMenu = mdcMenu.MDCMenu;

var menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = false;

var status = menu.open;

const preferencesBtn = document.getElementById("settings-btn");

preferencesBtn.addEventListener("click", function() {
    if (status === true) {
        status = false;
    }
    else {
        status = true;
    }
    menu.open = status;

});

