const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const User_LS = "currentUser",
    SHOWING_CN = "showing"

function saveName(text){
    localStorage.setItem(User_LS,text);
}

function handleSubmit(event){
    //이벤트 기본동작 막기
    event.preventDefault();
    // 입력된 이름을 가져옴
    const currentValue = input.value;
    // alert(currentValue)
    paintGreeting(currentValue);
    // 새로고침해도 이름을 기억할 수 있게.저장
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){

    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

// localStorage.setItem("key",value) 
function loadName() {
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null){
        askForName();
    } else{
        // 유저 이름이 있다면
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();