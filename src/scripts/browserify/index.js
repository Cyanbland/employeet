const mdcMenu = require('@material/menu');
const MDCMenu = mdcMenu.MDCMenu;

const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = false;

const preferencesBtn = document.getElementById("settings-btn");

preferencesBtn.addEventListener("click", function() {
    menu.open = !menu.open;

    console.log(menu.open)
});

