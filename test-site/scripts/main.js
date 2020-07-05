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

// dynamic list
const info = document.createElement('p');
info.setAttribute('id', 'dynamic-list');
info.textContent = 'Below is a dynamic list. Click this text to add a new list item. Click an existing list item to change its text.';

const list = document.createElement('ul');

document.body.appendChild(info);
document.body.appendChild(list);

info.onclick = function () {
	const item = document.createElement('li');
	list.appendChild(item);
	const text = prompt('Please enter item text');
	item.textContent = text;

	item.onclick = function (e) {
		e.stopPropagation();
		const newText = prompt('Please enter item new text');
		item.textContent = newText;
	};
};
