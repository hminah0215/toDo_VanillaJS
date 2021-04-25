const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `/images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

// Math  floor 는 버림. ceil 올림 
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();