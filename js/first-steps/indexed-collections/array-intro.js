const arr1 = new Array('a', 'b', 'c');
const arr2 = Array('a', 'b', 'c');
const arr3 = ['a', 'b', 'c'];

console.log(arr1, typeof arr1);
console.log(arr2, typeof arr2);
console.log(arr3, typeof arr3);

const len = 5;
const arr4 = new Array(len);
const arr5 = Array(len);
const arr6 = [];
arr6.length = len;

console.log(arr4);
console.log(arr5);
console.log(arr6);

const arr7 = [42];
const arr8 = Array.of(9.3);

console.log(arr7);
console.log(arr8);

const arr9 = [];
arr9[0] = 'Apple';
arr9[3.4] = 'Orange';
console.log(arr9, ', length:', arr9.length);
