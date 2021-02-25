const mdcMenu = require('@material/menu');
const MDCMenu = mdcMenu.MDCMenu;

const paginationButtons = document.getElementsByClassName("mdc-data-table__pagination-button");

const firstPageBtn = paginationButtons[0];
const previousPageBtn = paginationButtons[1];
const nextPageBtn = paginationButtons[2];
const lastPageBtn = paginationButtons[3]; 
const employeesTable = document.getElementById("employees-table");
const preferencesBtn = document.getElementById("settings-btn");
const tableCells = document.getElementsByClassName("mdc-data-table__cell");



var currentPage = 1;
var menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = false;
var status = menu.open;


handlePages();

preferencesBtn.addEventListener("click", function() {
    if (status === true) {
        status = false;
    }
    else {
        status = true;
    }
    menu.open = status;

});

employeesTable.addEventListener("mouseover", function() {
    handlePages();
});

firstPageBtn.addEventListener("click", function () {
    currentPage = 1;
    handlePages();
});

previousPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        handlePages();
    } 
});

nextPageBtn.addEventListener("click", function () {
    if (currentPage < calculatePages()) {
        currentPage++;
        handlePages();
    }

});

lastPageBtn.addEventListener("click", function () {
    currentPage = calculatePages();
    handlePages();
});



function calculatePages() {
    var itemsPerPage = 5;

    var pages = (localStorage.length / itemsPerPage);

    if (pages > Math.round(pages)) {
        pages = Math.round(pages) + 1;
    }
    else if (pages < Math.round(pages)) {
        pages = Math.round(pages);
    }

    return pages;
}

function handlePages() {
    clearTable();
    numberOfPages = calculatePages();

    if (currentPage == 1) {
        firstPageBtn.setAttribute("disabled", true);
        previousPageBtn.setAttribute("disabled", true);
        nextPageBtn.removeAttribute("disabled");
        lastPageBtn.removeAttribute("disabled");
    }

    else if (currentPage == numberOfPages) {
        firstPageBtn.removeAttribute("disabled");
        previousPageBtn.removeAttribute("disabled");
        nextPageBtn.setAttribute("disabled", true);
        lastPageBtn.setAttribute("disabled", true);
    }

    else {
        firstPageBtn.removeAttribute("disabled");
        previousPageBtn.removeAttribute("disabled");
        nextPageBtn.removeAttribute("disabled");
        lastPageBtn.removeAttribute("disabled");
    }

    populateTableWithEmployees(currentPage);

}


function populateTableWithEmployees(page) {
    let startingIndex = ((page - 1) * 5)
    let finalIndex = (page * 5);
    let tablePos = 0;

    for (let i = startingIndex; i < finalIndex; i++) {
        let currentRetrievedObject = localStorage.getItem(i + 1);
        let currentObj = JSON.parse(currentRetrievedObject);
        if (currentRetrievedObject !== null) {
            let id = currentObj.id;
            let name = currentObj.employee_name;
            let age = currentObj.employee_age;
            let salary = currentObj.employee_salary;

            salary = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(salary);
            name = `|${id}| ${name}`;

            tableCells[tablePos].innerHTML = name;
            tableCells[tablePos + 1].innerHTML = age;
            tableCells[tablePos + 2].innerHTML = salary
            tablePos += 3;
        }
    }
}

function clearTable() {
    for (let i = 0; i < tableCells.length; i++) {
        tableCells[i].innerHTML = "";
    }
}





