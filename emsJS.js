/**
 * Created by tomer_c on 10/5/2016.
 */
'use strict';

var employeeArray = [];
var countIDs = 0;

var Store = {
    key: "employees",
    save: function (data){
        localStorage.setItem(this.key, JSON.stringify(data));
    },
    load: function (){
        var localStorageItem = localStorage.getItem(this.key);

        /* If there are items in the Localstorage, then I'm taking their objects and add them
         * to the employeeArray */
        if (localStorageItem){
            var arr = JSON.parse(localStorageItem).entries;
            for (var i=0; i< arr.length; i++){
                employeeArray.push(arr[i]);
            }
        }
    }
};

// Returns array of objects of employees from the local store
(function loadEmployees(){
    Store.load();
    // Initialize the countID's with the last object ID
    if (employeeArray.length){
        countIDs = employeeArray[employeeArray.length-1].id;
        createEmployeesList();
    }
}());

// loadEmployees();


var buttonAddEmployee = document.getElementById("addEmployeeButton");
buttonAddEmployee.addEventListener("click",getEmployee);

/**
 * Get values from a form
 **/
function getEmployee(e){

    var empName = document.querySelector("input[name='employeeName']").value;
    var empSkill = document.querySelector("input[name='employeeSkill']").value;
    var select = document.querySelector("select[name='selectTitle']");
    var option = select.options[select.selectedIndex].text;

    if (!empName || !empSkill){
        alert("You must fill all fields and then add an employee");
        e.preventDefault();
        return;
    }

    /*  Creating an employee object and add it to an Array */
    var newObj = {
        id: ++countIDs,
        name: empName,
        skill: empSkill,
        title: option,
        datetime: "--",
        actionName: "Check-In"
    }
    e.preventDefault();

    /* create the employee in the HTML */
    createEmployeesList(newObj);
}

/**
 * Display the new Object in HTML.
 */
function createEmployeesList(empObj) {

    if (empObj){
        employeeArray.push(empObj);
    }

    var source = document.getElementById("employee-template");
    var template = Handlebars.compile(source.innerHTML);
    var context = {
        // entries: getEmployees(),
        entries: employeeArray
    };


    var htmlString = template(context);
    var htmlContainer = document.querySelector("#container");
    htmlContainer.innerHTML = htmlString;

    /* Save in Local Storage */
    Store.save(context);
}



function onSubmit (){
    // 1. Get values from a form
    // 2. Create an employee object and add it to an Array
    // 3. Display the new Object in HTML.
    // 4. Save in Local Storage
    Store.save(data);
    // Store.load(<from local storage>);
}


/* [
 {
 id: "123",
 name: "Tomer Caspi",
 skill: "Da Boss",
 title: "Teacher",
 datetime: "---",
 actionName: "Check-In"
 },
 {
 id: "124",
 name: "Daniel Weiner",
 skill: "Junior",
 title: "Manager",
 datetime: "---",
 actionName: "Check-In"
 },
 {
 id: "125",
 name: "Sami veSusu",
 skill: "Junior",
 title: "CEO",
 datetime: "---",
 actionName: "Check-In"
 }
 ]*/
