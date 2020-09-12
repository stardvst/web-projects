const arr = [1, 2, 3, 4, 5];
arr.splice(1, 3, 'a', 'b', 'c', 'd');
console.log(arr);

const words = ['Fire', 'Rain', 'Wind', 'Snow'];
const sortByLastLetter = function (a, b) {
    if (a[a.length - 1] > b[b.length - 1]) return 1;
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] === b[b.length - 1]) return 0;
}
words.sort(sortByLastLetter);
console.log(words);

const a1 = [1, 2, 3, 4, 5, 6];
const a2 = a1.map(function (el) { return el * 2; });
const a3 = a1.filter(function (el) { return el % 2 == 0; });
const pos = a1.every(function (el) { return el > 0; });
const even = a1.some(function (el) { return el % 2 == 0; });
const total = a1.reduce(function (acc, cur) { return acc + cur; }, 5);
console.log(a2);
console.log(a3);
console.log(pos);
console.log(even);
console.log(total);
