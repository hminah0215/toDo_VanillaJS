const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


// todo 항목을 담을 배열
let toDos = [];

// todo 항목 li를 지우는 함수 
function deleteToDo(event){
    // console.dir(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter는 배열의 모든 아이템을 이용해 함수를 실행하고, true인 아이템들만 가지고 새로운 배열을 만든다.
    const cleanToDos = toDos.filter(function(toDo){
        // li.id가 스트링이라 숫자로 변환해야함
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // 스토리지에 저장할때 string으로 저장해야함
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    // console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    // 이모지 사용시 안보인다면 html charset utf-8으로 변경 
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;

    // 만든 버튼과 스판을 li태그에 담아서 보이도록.
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // string이 가져와지니까 다시 자바스크립트objet로 변환
        const parsedToDos = JSON.parse(loadedToDos);
        //저장된것들을 paintToDo. 배열에 있는것함수들을 한번씩 실행시켜줌 
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
    return;
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
