const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");
// const clockTitle = clockContainer.querySelector("h1"); 로 두줄로 쓰는것 보다 , 다음에 이어서 쓰는게 보기편함.

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // 초가 10보다 작다면 0${seconds} 13:05 이런식으로 나오도록 삼항연산자 사용
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
                            minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

function init(){
    getTime();
    // 1초마다 getTime fn 작동
    setInterval(getTime, 1000);
}

init();