const autoUpdateCheckbox = document.getElementById("autoupdate-option");
const autoUpdateBtn = document.getElementById("autoupdate-btn");

autoUpdateCheckbox.addEventListener("change", function() {
    var autoUpdateCheckboxStatus = autoUpdateCheckbox.checked;
    if (autoUpdateCheckboxStatus == true) {
        setInterval(function() {
            console.log("Fetching data automatically");
            createGetEmployeesRequest();
        }, 15000)
    }
});

const nameInput = document.getElementById("name-field");
const ageInput = document.getElementById("age-field");
const salaryInput = document.getElementById("salary-field");
const submitBtn = document.getElementById("register-btn");
const registerForm = document.getElementById("register-form")

var postRequest = new XMLHttpRequest();

var name = nameInput.value;
var age = ageInput.value;
var salary = salaryInput.value;

setupRegisterEmployeePostRequest();

function setupRegisterEmployeePostRequest() {
    if (!registerForm.hasAttribute("submit")) {
        registerForm.addEventListener("submit", function(){
            name = nameInput.value;
            age = ageInput.value;
            salary = salaryInput.value;
        
            createRegisterEmployeePostRequest();
        });
    }
}

function createRegisterEmployeePostRequest() {
    content = {
        "name": name,
        "salary": salary,
        "age": age
    };
    
    postRequest = new XMLHttpRequest();

    postRequest.addEventListener("readystatechange", handleRegisterEmployeePostRequest, false);
    postRequest.open('POST', "http://dummy.restapiexample.com/api/v1/create", true);

    postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    postRequest.send(JSON.stringify(content));
}


function handleRegisterEmployeePostRequest() {
    var responseData = [];

    if (postRequest.readyState == 4 && postRequest.status == 200) {
        var response = postRequest.responseText;
        responseData.push(JSON.parse(response));

    }
    else if (postRequest.readyState == 4 && postRequest.status == 429) {
        console.error("Too many requests: " + postRequest.status + " - " + postRequest.statusText + " - Trying again!");
        createRegisterEmployeePostRequest();
    }
    else if (postRequest.readyState == 4) {
        console.error("Error: " + postRequest.status + " - " + postRequest.statusText + " - Trying again!");
        createRegisterEmployeePostRequest();
    }

    storeNewEmployee(responseData);
}

function storeNewEmployee(newEmployeeData) {
    if (newEmployeeData.length > 0) {
        let responseKeyContent = [];
        for (var key in newEmployeeData[0].data) {
            responseKeyContent.push(key);
        }
        let parsedContent = JSON.parse(responseKeyContent[0]);
        let id = localStorage.length + 1;
        let employee_name = parsedContent.name.replace('_', ' ');
        let employee_salary = parsedContent.salary;
        let employee_age = parsedContent.age;
        let profile_image = "";

        let newEmployeeObject = {
            id: id,
            employee_name: employee_name,
            employee_salary: employee_salary,
            employee_age: employee_age,
            profile_image: profile_image
        };

        localStorage.setItem(id, JSON.stringify(newEmployeeObject));
        clearRegisterFields();
    }
    else {
        console.error("Error: Can´t store data locally because the client wasn´t able to fetch any data!")
    }

}


var request = new XMLHttpRequest();

createGetEmployeesRequest();

function createGetEmployeesRequest() {
    request.addEventListener("readystatechange", handleGetRequest, false);
    request.open('GET', "http://dummy.restapiexample.com/api/v1/employees", true);
    
    request.send();
}

function handleGetRequest() {
    var responseData = [];

    if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        responseData.push(JSON.parse(response));
    }
    else if (request.readyState == 4 && request.status == 429) {
        console.error("Too many requests: " + request.status + " - " + request.statusText + " - Trying again!");
        createGetEmployeesRequest();
    }
    else if (request.readyState == 4) {
        console.error("Error: " + request.status + " - " + request.statusText + " - Trying again!");
        createGetEmployeesRequest();
    }

    storeData(responseData);

}

function storeData(data) {
    if (data.length > 0) {
        for (let i = 0; i < data[0].data.length; i++) {
            let id = data[0].data[i].id;
            if (localStorage.getItem(id) === null) {
                localStorage.setItem(id, JSON.stringify(data[0].data[i]));
            }
            else {
            }
        }
    }
    else {
        console.error("Error: Can´t store data locally because the client wasn´t able to fetch any data!")
    }
}

function clearRegisterFields() {
    nameInput.value = "";
    ageInput.value = "";
    salaryInput.value = "";
}


const deleteBtn = document.getElementById('delete-btn');
const deleteForm = document.getElementById('delete-form');
const deleteField = document.getElementById('delete-field');

var idToBeDeleted = 0;
var deleteRequest = new XMLHttpRequest();

setupDeleteEmployeePostRequest();

function setupDeleteEmployeePostRequest() {
    if (!deleteForm.hasAttribute("submit")) {
        deleteForm.addEventListener("submit", function(){
            idToBeDeleted = deleteField.value;
        
            createDeleteEmployeeRequest();
        });
    }
}

function createDeleteEmployeeRequest() {
    deleteRequest = new XMLHttpRequest();

    deleteRequest.addEventListener("readystatechange", handleEmployeeDeleteRequest, false);
    deleteRequest.open('DELETE', `http://dummy.restapiexample.com/api/v1/delete/${idToBeDeleted}`, true);

    deleteRequest.send();
}

function handleEmployeeDeleteRequest() {
    var deleteResponseData = [];

    if (deleteRequest.readyState == 4 && deleteRequest.status == 200) {
        var response = deleteRequest.responseText;
        deleteResponseData.push(JSON.parse(response));
    }
    else if (deleteRequest.readyState == 4 && deleteRequest.status == 429) {
        console.error("Too many requests: " + deleteRequest.status + " - " + deleteRequest.statusText + " - Trying again!");
        createDeleteEmployeeRequest();
    }
    else if (deleteRequest.readyState == 4) {
        console.error("Error: " + deleteRequest.status + " - " + deleteRequest.statusText + " - Trying again!");
        createDeleteEmployeeRequest();
    }

    storeDeletedData(deleteResponseData);
}

function storeDeletedData(data) {
    if (data.length > 0) {
        if (localStorage.getItem(idToBeDeleted) !== null) {
            localStorage.removeItem(idToBeDeleted);
            console.log(idToBeDeleted + " was deleted!")
        }
        else {
            alert(`O funcionário ${idToBeDeleted} não consta nos registros!`);
        }
    }
    else {
        console.error("Error: Can´t store data locally because the client wasn´t able to fetch any data!")
    }
}

const nameRadio = document.getElementById("name-radio");
const salaryRadio = document.getElementById("salary-radio");
const ageRadio = document.getElementById("age-radio");

const nameLabel = document.getElementById("name-update-label");
const salaryLabel = document.getElementById("salary-update-label");
const ageLabel = document.getElementById("age-update-label");

const updatableLabel = document.getElementById("id-updatable-label");
const updatableField = document.getElementById("update-field");
const updateFormBtn = document.getElementById("update-form");

const idField = document.getElementById("id-update-field");
const updatedContentField = document.getElementById("update-field");

var currentUpdate = "";


nameRadio.addEventListener("click", function() {
    let status = nameRadio.checked;

    if (status === false) {
        nameRadio.checked = !status;
        updatableLabel.innerHTML = "Nome";
        updatableField.setAttribute("type", "text");
        updatableField.removeAttribute("disabled");
        updatableField.removeAttribute("max");
        updatableField.removeAttribute("min");
    }
    salaryRadio.checked = false;
    ageRadio.checked = false;
    currentUpdate = "name";
});

nameLabel.addEventListener("click", function() {
    let status = nameRadio.checked;

    if (status === false) {
        nameRadio.checked = !status;
        updatableLabel.innerHTML = "Nome";
        updatableField.setAttribute("type", "text");
        updatableField.removeAttribute("disabled");
        updatableField.removeAttribute("max");
        updatableField.removeAttribute("min");
    }
    salaryRadio.checked = false;
    ageRadio.checked = false;
    currentUpdate = "name";
});

salaryRadio.addEventListener("click", function() {
    let status = salaryRadio.checked;

    if (status === false) {
        salaryRadio.checked = !status;
        updatableLabel.innerHTML = "Salário";
        updatableField.setAttribute("type", "number");
        updatableField.setAttribute("min", "1");
        updatableField.removeAttribute("disabled");
        updatableField.removeAttribute("max");
    }
    nameRadio.checked = false;
    ageRadio.checked = false;
    currentUpdate = "salary";
});

salaryLabel.addEventListener("click", function() {
    let status = salaryRadio.checked;

    if (status === false) {
        salaryRadio.checked = !status;
        updatableLabel.innerHTML = "Salário";
        updatableField.setAttribute("type", "number");
        updatableField.setAttribute("min", "1");
        updatableField.removeAttribute("disabled");
        updatableField.removeAttribute("max");

    }
    nameRadio.checked = false;
    ageRadio.checked = false;
    currentUpdate = "salary";
});

ageRadio.addEventListener("click", function() {
    let status = ageRadio.checked;

    if (status === false) {
        ageRadio.checked = !status;
        updatableLabel.innerHTML = "Idade";
        updatableField.setAttribute("type", "number");
        updatableField.setAttribute("min", "14");
        updatableField.setAttribute("max", "99");
        updatableField.removeAttribute("disabled");
    }
    nameRadio.checked = false;
    salaryRadio.checked = false;
    currentUpdate = "age";
});

ageLabel.addEventListener("click", function() {
    let status = ageRadio.checked;

    if (status === false) {
        ageRadio.checked = !status;
        updatableLabel.innerHTML = "Idade";
        updatableField.setAttribute("type", "number");
        updatableField.setAttribute("min", "14");
        updatableField.setAttribute("max", "99");
        updatableField.removeAttribute("disabled");
    }
    nameRadio.checked = false;
    salaryRadio.checked = false;
    currentUpdate = "age";
});

updateFormBtn.addEventListener("submit", function() {
    if (!updatableField.hasAttribute("disabled")) {
        let idToUpdate = idField.value;
        let newUpdatedValue = updatedContentField.value;

        updateLocalEmployee(idToUpdate, currentUpdate, newUpdatedValue);
    }
    else {
        alert("Selecione algo para alterar!");
    }

})




//update not availiable on API, so the update method applies only locally
function updateLocalEmployee(employeeId, fieldToBeUpdated, updatedData) {
    if (localStorage.getItem(employeeId) !== null) {
        let currentEmployeeObj = JSON.parse(localStorage.getItem(employeeId));

        if (fieldToBeUpdated == "name") {
            currentEmployeeObj.employee_name =  updatedData;
        }

        else if (fieldToBeUpdated == "salary") {
            currentEmployeeObj.employee_salary = updatedData;
        }

        else if (fieldToBeUpdated == "age") {
            currentEmployeeObj.employee_age = updatedData;
        }

        else {
            console.error(`${fieldToBeUpdated} is not a valid field`);
        }

        localStorage.setItem(employeeId, JSON.stringify(currentEmployeeObj))
    }
    else {
        alert(`O funcionário ${employeeId} não consta nos registros!`);
    }
}









