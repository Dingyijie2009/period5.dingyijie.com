
const next = document.getElementById('right-arrow');
const prev = document.getElementById('left-arrow');
const dateDisplay = document.getElementById('date-display');

var html = [], currentIndex = 0;
html[0] = "dish/1.html";
html[1] = "dish/2.html";
html[2] = "dish/3.html";
html[3] = "dish/4.html";
html[4] = "dish/5.html";

var dishList = document.getElementById('dish-list');
if (dishList) {
    dishList.innerHTML = '<iframe src="' + html[currentIndex] + '" frameborder="0" style="width:100%; height:400px;"></iframe>';
}

console.log('next element:', next);
if (next) {
    next.onclick = function() {
        currentIndex++;
        if (currentIndex > html.length - 1) {
            currentIndex = 0;
        }
        if (dishList) {
            dishList.innerHTML = '<iframe src="' + html[currentIndex] + '" frameborder="0" style="width:100%; height:400px;"></iframe>';
        }
    };
}

if (prev) {
    prev.onclick = function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = html.length - 1;
        }
        if (dishList) {
            dishList.innerHTML = '<iframe src="' + html[currentIndex] + '" frameborder="0" style="width:100%; height:400px;"></iframe>';
        }
    };
}

dateDisplay.textContent = new Date().toLocaleDateString();
