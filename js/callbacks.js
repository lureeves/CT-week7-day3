console.log('Hello hello from callbacks!');


/*
    JavaScript Callbacks
*/

function filter(anArr){
    let output = [];
    for (let element of anArr){
        if (element % 2 === 0){ // Logic that determines if filtered
            output.push(element);
        };
    };
    return output;
};

let numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

console.log(numbers);
console.log(filter(numbers));


// Create a function to filter out based on any true condition from a function

function filterWithCallback(anArr, callbackFn){
    let output = [];
    for (let element of anArr){
        if (callbackFn(element)){ // Logic that determines if filtered
            output.push(element);
        };
    };
    return output;
};


function isOdd(num){
    return num % 2 === 1
};

console.log(filterWithCallback(numbers, isOdd))

console.log(filterWithCallback(numbers, num => num >= 25));

// isOdd and the arrow function are considered callback functions (because they are 
// passed into another function as an argument to be executed later)
// filterWithCallback is considered a higher-order function (because it accepts
// a function as an argument)
console.clear();

function first(){
    console.log('Start')
    setTimeout(() => {
        console.log('First');
    }, 3000)
};

function second(){
    console.log('Second');
};

// first();
// second();



// function fib(num){
//     if (num < 2){
//         return num;
//     } else {
//         let fibNum = fib(num - 1) + fib(num - 2);
//         return fibNum;
//     };
// };


// console.log(fib(40))

// Real-ish life example

// function downloadSong(songName){
//     console.log(`Downloading ${songName}...`);
//     setTimeout(()=>{
//         console.log('Finished downloading');
//         return {song: songName, artist: 'Beyonce'}
//     }, 3000)
// }

// function playSong(songName){
//     let song = downloadSong(songName);
//     console.log(song);
//     // console.log(`${song.song} by ${song.artist} is now playing`);
// };

// playSong('Single Ladies');


// Fix Issues with Callback Functions!

function downloadSong(songName, callback){
    console.log(`Downloading ${songName}...`);
    setTimeout(()=>{
        console.log('Finished downloading');
        callback({song: songName, artist: 'Beyonce'})
    }, 3000)
}

function playSong(song){
    console.log(`${song.song} by ${song.artist} is now playing`);
};


// downloadSong('Single Ladies', playSong);

// downloadSong('Halo', s => console.log(`${s.song} is saved to your playlist`));


// Handling Errors
function downloadSong2(songName, callbackSuccess, callbackFail){
    console.log(`Searching for ${songName} in our database...`);
    setTimeout(() => {
        // Simulate a valid song choice
        if (songName.length > 5){
            let song = {
                title: songName,
                artist: 'Beyonce'
            };
            callbackSuccess(song);
        } else {
            callbackFail(songName);
        };
    }, 3000);
};


// downloadSong2(
//     'Halo',
//     song => console.log(`${song.title} by ${song.artist} is currently playing...`),
//     searchedSong => console.warn(`${searchedSong} is not in our database`)
// );


// Call-back Hell
downloadSong('Single Ladies', (s) => {
    console.log(`${s.song} by ${s.artist} is playing...`)
    downloadSong('Lemondade', (s) => {
        console.log(`${s.song} by ${s.artist} is playing...`);
        downloadSong('Halo', (s) => {
            console.log(`${s.song} by ${s.artist} is playing...`)
        })
    })
})