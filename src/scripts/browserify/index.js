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

const employeesTable = document.getElementById("employees-table");
populateTableWithEmployees();

employeesTable.addEventListener("mouseover", function() {
    populateTableWithEmployees();
});

function populateTableWithEmployees() {
    for (let i = 0; i < localStorage.length; i++) {
        let currentRetrievedObject = localStorage.getItem(i + 1);
        let currentObj = JSON.parse(currentRetrievedObject);
        if (currentRetrievedObject !== null) {
            let id = currentObj.id;
            let name = currentObj.employee_name;
            let age = currentObj.employee_age;
            let salary = currentObj.employee_salary;
        }
    }
    console.log("Carregou")

}

