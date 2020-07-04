const theHeading = document.querySelector('h2');
theHeading.textContent = 'Hello world!';

document.querySelector('img').onclick = function () {
    alert('Ouch! Stop poking me!');
};

let image = document.querySelector('img');
image.onclick = function () {
    let theSrc = image.getAttribute('src');
    if (theSrc === 'images/firefox-icon.png') {
        image.setAttribute('src', 'images/firefox2.png');
    } else {
        image.setAttribute('src', 'images/firefox-icon.png');
    }
};

// button click event
function setUserName() {
    let name = prompt('Please enter your name.');
    if (!name || name === null) {
        setUserName();
    } else {
        localStorage.setItem('name', name);
        theHeading.textContent = 'Mozilla is cool, ' + name;
    }
}

let storedName = localStorage.getItem('name');
if (!storedName) {
    setUserName();
} else {
    theHeading.textContent = 'Mozilla is cool, ' + storedName;
}

document.querySelector('button').onclick = function () {
    setUserName();
};
