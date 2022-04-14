let btn = document.getElementById('btn');
let number = document.getElementById('number');
let i = 1;
let maxQuestion = 3;


btn.addEventListener('click', function () {
    if (i < maxQuestion) {
        i++;
        number.innerHTML = `${i} of ${maxQuestion}`;
    } else return;
});