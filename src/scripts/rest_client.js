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
        console.error("Error: " + request.status + " - " + request.statusText + " - Trying again!");
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

