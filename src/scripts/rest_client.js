const autoUpdateCheckbox = document.getElementById("autoupdate-option");
const autoUpdateBtn = document.getElementById("autoupdate-btn");

autoUpdateCheckbox.addEventListener("change", function() {
    var autoUpdateCheckboxStatus = autoUpdateCheckbox.checked;
    if (autoUpdateCheckboxStatus == true) {
        setInterval(function() {
            console.log("Fetching data automatically");
            createGetEmployeesRequest();
        }, 10000)
    }
    console.log("Fetching data automatically 2");
});

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
                console.log("Storing " + id + " in local storage.");
            }
            else {
                console.log(id + " already exists in local storage.");
            }
        }
    }
    else {
        console.error("Error: Can´t store data locally because the client wasn´t able to fetch any data!")
    }
}



