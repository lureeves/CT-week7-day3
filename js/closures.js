console.log('Hello from closures.js!');


/*
    JavaScript Closures
*/

let subject = 'JavaScript'; // Block scoped - window

function homework(student){ // student - function scoped
    console.log(`${student}, did you finish your ${subject} homework?`);
};

homework('Brian');

// console.log(student); // Uncaught ReferenceError: student is not defined

// Scopes can be nested

let hometown = 'Chicago'; // Block Scoped - Window

{
    var state = 'Illinois'; // Global Scope
    let hometown = 'Springfield'; // Block Scoped
    {
        let hometown = 'Bloomington'
        console.log(`I am from ${hometown}, ${state}`);
    };
    console.log(`I am from ${hometown}, ${state}`);
};

console.log(`I am from ${hometown}, ${state}`);


// Function Scopes can also be nested

// function outer(){
//     // define a variable in the outer function scope
//     let outerMessage = 'This is the outer message';

//     // Define a function within the outer function
//     function inner(){
//         // define a variable in the inner function scope
//         let innerMessage = ' and this is the inner message';
//         // log out the outer + inner message
//         console.log(outerMessage + innerMessage);
//     };

//     // Execute the inner function
//     inner();

//     // Log out the outer + inner
//     // console.log(outerMessage + innerMessage); // Uncaught ReferenceError: innerMessage is not defined
// };

// console.log(outer);

// outer();

// Return a function from a function
function outer(){
    // define a variable in the outer function scope
    let outerMessage = 'This is the outer message';

    // Define a function within the outer function
    function inner(){
        let innerMessage = ' and this is the inner message';
        console.log(outerMessage + innerMessage);
    };

    // return the inner function
    return inner;
};

console.log(outer);

let outerReturn = outer(); // return value of the outer function

console.log(outerReturn);
console.log(typeof outerReturn);


outerReturn();

// inner() function is a closure
// A closure is a function that preserves the outer scope in its inner scope

// console.log(outerMessage); // Uncaught ReferenceError: outerMessage is not defined


// A more practical example

function makeMultiplier(x){
    function times(y){
        return x * y
    };
    return times;
};

let double = makeMultiplier(2);

console.log(double);

console.log(double(5));
console.log(double(10));
console.log(double(7));
console.log(double(33));
console.log(double(43));

console.log("===========");

let triple = makeMultiplier(3);
console.log(triple);

console.log(triple(5));
console.log(triple(10));
console.log(triple(7));
console.log(triple(33));
console.log(triple(43));

// Set up "hidden" variables using closures
function setCounter(){
    console.log("Setting counter...");
    let count = 0; // scoped to the setCounter function -- hidden variable

    function increaseCount(){
        count++;
        return count;
    }

    return increaseCount;
};


let step = setCounter();

console.log(step);

console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());

console.clear();


// Another practical example - hiding variables

// let cache = {};

// function fib(num){
//     if (num < 2){
//         return num;
//     } else if (num in cache) {
//         return cache[num]
//     } else {
//         let fibNum = fib(num - 1) + fib(num - 2);
//         cache[num] = fibNum
//         return fibNum;
//     };
// };

// console.log(fib(10));


// Hide the cache with a closure

function makeFibWithCache(){
    let cache = {};
    return fib;

    function fib(num){
        if (num < 2){
            return num;
        } else if (num in cache) {
            return cache[num]
        } else {
            let fibNum = fib(num - 1) + fib(num - 2);
            cache[num] = fibNum
            return fibNum;
        };
    };

};

let fibWithCache = makeFibWithCache();

console.log(fibWithCache(100));

// console.log(cache); // Uncaught ReferenceError: cache is not defined

// IIFE - Immediately Invoked Function Expression
// Syntax - (function to define)(any args)

// function formatName(first, last){
//     return [first, last].join(' ')
// }

// let myFullName = formatName('Brian', 'Stanton');
// console.log(myFullName);

// let myName = (function formatName(first, last){
//     return [first, last].join(' ')
// })('Brian', 'Stanton')

// console.log(myName);

let myFullName = ((first, last) => [first, last].join(' '))('Brian', 'Stanton');
console.log(myFullName);
console.log(typeof myFullName);

// Set up a closure with an IIFE

let stepByFive = (step => {
    let count = 0;
    return () => count+=step
})(5)

console.log(stepByFive());
console.log(stepByFive());
console.log(stepByFive());
console.log(stepByFive());

// Make the fib with cache as an IIFE

const myFib = (function makeFibWithCache(){
    let cache = {};
    return fib;

    function fib(num){
        if (num < 2){
            return num;
        } else if (num in cache) {
            return cache[num]
        } else {
            let fibNum = fib(num - 1) + fib(num - 2);
            cache[num] = fibNum
            return fibNum;
        };
    };
})();

console.log(myFib(45));



// In Class Exercise
// Create an IIFE that has a hidden array of names (starts as an empty array) but will add users to the array every time the function is called
console.clear()

// const addName = (() => {let names = []; return(name) => (names.push(name), names); })();

// const addName = (() => {
//     let names = []
//     function addNewName(name) {
//         names.push(name)
//         return names
//     } 
//     return addNewName
// })();

const addName = (() => {
    let names = []
    return function(name) {
        names.push(name)
        return names
    } 
})();

console.log(addName('Brian')); // ['Brian']
console.log(addName('Tatyana')); // ['Brian', 'Tatyana']
console.log(addName('Ripal')); // ['Brian', 'Tatyana', 'Ripal']
console.log(addName('Sam')); // ['Brian', 'Tatyana', 'Ripal', 'Sam']