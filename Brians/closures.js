/*
    JavaScript Closures
*/


let subject = 'JavaScript'; // block scoped variable - Window Scope

function homework(student){
    console.log(`${student}, did you finish your ${subject} homework?`);
}

homework('Brian');

// console.log(student); // ReferenceError: student is not defined


// Scopes can be nested

let hometown = 'Chicago'; // Block scoped

{
    var state = 'Illinois'; // Globally Scoped
    let hometown = 'Champaign'; // Block Scoped
    {
        console.log(`I am from ${hometown}, ${state}`)
    }
}

console.log(`I am from ${hometown}, ${state}`)


// Function Scopes can also be nested

// function outer(){
//     let outerMessage = 'This is the outer message'
//     function inner(){
//         let innerMessage = ' and this is the inner message';
//         console.log(outerMessage + innerMessage); 
//     }
//     inner()
// }


// console.log(outer);

// outer();


// Return a function from a function

function outer(){
    let outerMessage = 'This is the outer message';
    function inner(){
        let innerMessage = ' and this is the inner message';
        console.log(outerMessage + innerMessage)
    }
    return inner
}


let outerReturn = outer(); // return value of the 

console.log(outerReturn);

outerReturn();

// inner() function is a closure
// A closure is a function that preserves the outer scope in its inner scope


// A more practical example

function makeMultiplier(x){
    function times(y){
        return x * y
    }
    return times
}


// Create multiplier function

const double = makeMultiplier(2);

console.log(double);

console.log(double(5));
console.log(double(3));
console.log(double(4));
console.log(double(10));
console.log(double(7));



const triple = makeMultiplier(3);

console.log(triple);

console.log(triple(5));
console.log(triple(3));
console.log(triple(4));
console.log(triple(10));
console.log(triple(7));


// Setting up a "hidden" variable using closures

function setCounter(){
    console.log('Counter Set!')
    let count = 0; // Block level scope
    function inner(){
        return count++
    }
    return inner
}

const step = setCounter();

console.log(step);

console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());


// Another Practical Example - hiding variables


// var cache = {}

// function fib(num){
//     if (num < 2){
//         return num
//     } else if (num in cache){
//         return cache[num]
//     } else {
//         let fib_num = fib(num - 1) + fib(num - 2);
//         cache[num] = fib_num
//         return fib_num
//     }
// }


// console.log(fib(10));

// Hide the Cache in a Closure

function makeFibWithCache(){
    var cache = {};
    function innerFib(num){
        if (num < 2){
            return num
        } else if (num in cache){
            return cache[num]
        } else {
            let fib_num = innerFib(num - 1) + innerFib(num - 2);
            cache[num] = fib_num
            return fib_num
        }
    }
    return innerFib
}


const fib = makeFibWithCache();

console.log(fib(10));
console.log(fib(40));
console.log(fib(100));


// IIFE - Immediately Invoked Function Expression


let myFullName = (function formatName(first, last){
    return [first, last].join(' ')
})('Brian', 'Stanton')

console.log(myFullName);

// Set up closures with IIFE

let stepByFive = (function setCounter(step){
    let count = 0;
    function inner(){
        return count += step
    }
    return inner
})(5);


console.log(stepByFive());
console.log(stepByFive());
console.log(stepByFive());
console.log(stepByFive());
console.log(stepByFive());


// In Class Exercise
// Create an IIFE that has a hidden array of names (starts as an empty array) but will add users to the list every time the function is called





console.log(addName('Brian')); // ['Brian']
console.log(addName('Tatyana')); // ['Brian', 'Tatyana']
console.log(addName('Ripal')); // ['Brian', 'Tatyana', 'Ripal']
console.log(addName('Sam')); // ['Brian', 'Tatyana', 'Ripal', 'Sam']

