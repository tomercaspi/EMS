/**
 * Created by tomer_c on 10/5/2016.
 */
'use strict';

var employeeArray = [];
var countIDs = 0;
// Returns array of objects of employees
function getEmployees(){
    var arr = [];

    return arr;
}


var buttonAddEmployee = document.getElementById("addEmployeeButton");
buttonAddEmployee.addEventListener("click",setEmployee);

function setEmployee(e){
    // var employeeName = document.querySelector("input[name='employeeName']");
    // var employeeSkill = document.querySelector("input[name='employeeSkill']");
    // var selectField = document.querySelector("select[name='selectTitle']");
    //var errorElement = document.querySelector("#error");

    var empName = document.querySelector("input[name='employeeName']").value;
    var empSkill = document.querySelector("input[name='employeeSkill']").value;
    var select = document.querySelector("select[name='selectTitle']")
    var option = select.options[select.selectedIndex].text;

    if (!empName || !empSkill){
        alert("You must enter employee Name or Employee Skill");
    }

    var newObj = {
        id: ++countIDs,
        name: empName,
        skill: empSkill,
        title: option,
        datetime: "--",
        actionName: "Check-In"
    }
    e.preventDefault();

    employeeArray.push(newObj);
    createEmployeesList();

}

function createEmployeesList() {
    var source = document.getElementById("employee-template");
    var template = Handlebars.compile(source.innerHTML);
    var context = {
        // entries: getEmployees(),
        entries: employeeArray


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
    };

    var htmlString = template(context);
    console.log(htmlString);
    var htmlContainer = document.querySelector("#container");
    htmlContainer.innerHTML = htmlString;
}

var Store = {
    key: "employees",
    save: function (data){
        localStorage.setItem(this.key, JSON.stringify(data));
    }
};

function onSubmit (){
    // 1. Get values from a form
    // 2. Create an employee object and add it to an Array
    // 3. Display the new Object in HTML.
    // 4. Save in Local Storage
    Store.save(data);
    // Store.load(<from local storage>);
}