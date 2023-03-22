//select elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST,id;

//get items from localstorage

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id= LIST.length; // set the id to the last one in the list
    loadList(LIST);//load the list to the user
}else{
    LIST=[];
    id=0;
}

//add items to localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));

//Show Today's date
const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//load data to the UI

function loadList(array){
    array.forEach(element => {
        addToDo(element.name,element.id, element.done, element.trash);
    });
}

//clear button
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

//add function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const STRIKE = done ? LINE_THROUGH : "";
    const item = `
                    <li class="item"><i class="fa ${DONE} complete " id=${id} job="complete"></i>
                    <p class="text ${STRIKE}" > ${toDo} </p>
                    <i class="fa fa-trash-o delete" id=${id} job="delete"></i>
                    </li>
                `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (event) {
    if (event.code == "Enter") {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
        }
        input.value = "";
    }

});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items cretaed dynamically

list.addEventListener("click",function(event){
    const element= event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob =="complete"){
        completeToDo(element);
    }else if (elementJob =="delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});