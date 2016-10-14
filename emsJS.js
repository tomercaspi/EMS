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


function Employee(title) {
    if (!title){
        throw Error("Title is missing");
    }
    this.title = title;
}

Employee.prototype.createButton = function(buttonAction){
    var button = document.createElement("button");
    button.innerHTML = buttonAction;
    return button;
}

function Teacher(){
    //Employee.call(this,"Teacher");
    this.btn1 = this.createButton('Check-In');
}

Teacher.prototype = new Employee('Teacher');
Teacher.prototype.constructor = Teacher;
Teacher.prototype.getButtons = function(){
    return this.btn1;
}

function Developer(){
    //Employee.call(this,"Developer");
    this.btn1 = this.createButton('Check-In');
}

Teacher.prototype = new Employee('Developer');
Teacher.prototype.constructor = Developer;
Teacher.prototype.getButtons = function(){
    return this.btn1;
}

function Manager(){
    //Employee.call(this,"Manager");
    this.btn1 = this.createButton('Check-In');
    this.btn2 = this.createButton('Say Yo');
}

Teacher.prototype = new Employee('Manager');
Teacher.prototype.constructor = Teacher;
Teacher.prototype.getButtons = function(){
    return this.btn1 + this.btn2;
}


var buttonAddEmployee = document.getElementById("addEmployeeButton");
buttonAddEmployee.addEventListener("click",getEmployee);

/*function createButton(title){
    var button = document.createElement("button");
    button.innerHTML = title;
    return button;
}*/

var roll = {

    count: function(title){
        switch(title) {
            case "Manager":
                var count = 2;
                break;
            case "CEO":
                var count = 3;
                break;
            default:
                var count = 1;
        };
        return count;
    },

    getActionButtons:  function(){
        if (this.title=="Teacher" || this.title=="Developer"){
            return  createButton("Check-In");
        }
        else if (this.title=="Manager"){
            var btn1 = createButton("Check-In");
            var btn2 = createButton("Say Yo");
            return btn2;
        } else if (title=="CEO"){
            var btn1 = createButton("Check-In");
            var btn2 = createButton("Say Yo");
            var btn3 = createButton("Fire Everyone");
            return btn3;
        }
    }
}



/**
 * Get values from a form
 **/
function getEmployee(e){

    var empName = document.querySelector("input[name='employeeName']");
    var empSkill = document.querySelector("input[name='employeeSkill']");
    var select = document.querySelector("select[name='selectTitle']");
    var option = select.options[select.selectedIndex];

    if (!empName || !empSkill){
        alert("You must fill all fields and then add an employee");
        e.preventDefault();
        //throw new Error("No Type was specified!");
        return;
    }

    var date = new Date();
    var element = document.getElementById("employeeButtons");

    /*  Creating an employee object and add it to an Array */
    var newObj = {
        id: ++countIDs,
        name: empName.value,
        skill: empSkill.value,
        title: option.text,
        datetime: date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes().toPrecision(2),
        //actionName: element.appendChild(option.getButtons);
    };

    newObj[option] = true;



    /* create the employee in the HTML */
    createEmployeesList(newObj);

    empName.value='';
    empSkill.value='';
    option.text='Developer';
    // e.preventDefault();
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



/*function onSubmit (){
    // 1. Get values from a form
    // 2. Create an employee object and add it to an Array
    // 3. Display the new Object in HTML.
    // 4. Save in Local Storage
    Store.save(data);
    // Store.load(<from local storage>);
}*/


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
