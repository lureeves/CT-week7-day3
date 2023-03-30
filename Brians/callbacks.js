// console.log('Callbacks!!!!!!!!!')

/*
    JavaScript Callbacks
*/

function filter(anArray){
    let output = [];
    for (let element of anArray){
        if (element % 2 !== 0){ // Logic that determines if num is odd
            output.push(element);
        };
    };
    return output;
}

let numbers = [5, 10, 15, 20, 25, 30];
console.log(filter(numbers));


// Create a function to filter out based on any true condition from a function

function filterWithCallback(anArr, callbackFn){
    let output = [];
    for (let element of anArr){
        if (callbackFn(element)){ // Logic that determines if element should be filtered
            output.push(element);
        };
    };
    return output;
}

function isEven(num){
    return num % 2 === 0
}

console.log(filterWithCallback(numbers, isEven));

function cName(name){
    return name[0].toUpperCase() === 'C'
}


console.log(filterWithCallback(['Chicago', 'Boston', 'Chattanooga', 'Charlotte', 'Nashville'], cName));


// isEven and cName are considered callback functions (because they are functions passed into another function as an argument to be executed later)
// filterWithCallback is considered a higher-order function (because it accepts a function as an argument)


// Often you will see callback function written right into argument
console.log(filterWithCallback(numbers, function(num){
    return num % 10 === 0;
}))

// More so with arrow functions
console.log(filterWithCallback(numbers, num => num % 10 === 0))


// Async Example

function first(){
    console.log('First started')
    setTimeout(function(){
        console.log('First')
    }, 3000)
};


function second(){
    console.log('Second started')
    console.log('Second')
};


// first();
// second();

// Real Life Example

// You have a function that will take in a song name, download the song, and then play the downloaded song

// function downloadSong(songName){
//     console.log(`Downloading ${songName}...`)
//     setTimeout(() => {
//         console.log('Finished Downloading')
//         return songName
//     }, 3000)
// }

// function playSong(songName){
//     let song = downloadSong(songName);
//     console.log(`${song} is playing`)
// }

// playSong('Let It Be');

// Fix the Issue with CALLBACKS!!

function downloadSong(songName, downloadTime, callback){
    console.log(`Downloading ${songName}...`)
    setTimeout(() => {
        // Script to download the song
        console.log(`Finished downloading ${songName}`)
        // Execute callback once finished downloading
        callback(songName)
    }, downloadTime)
}

function playSong(song){
    console.log(`${song} is playing`)
}

// downloadSong('Let It Be', 3000, playSong);


// // Download a song and then send it to a friend
// downloadSong('Brown Eyed Girl', 2000, (s) => console.log(`Sending ${s} to friend`));
// downloadSong('Hey Ya', 1000, s => console.log(`I love ${s}`))


const song1 = 'Wonderwall';
const song2 = 'Stairway to Heaven';
const song3 = 'Back in Black';


// downloadSong(song1, 3000, s => {
//     console.log(`Saving ${s} to playlist`)
//     downloadSong(song2, 2000, s => {
//         console.log(`Saving ${s} to playlist`)
//         downloadSong(song3, 2000, s => {
//             console.log(`Saving ${s} to playlist`)
//         })
//     })
// })

/*
    Though Callbacks give us more functionality...they also introduce
    their own problem: Callback Hell
    Something that looks like this:
    function1( () => {
        function2( () => {
            function3( () => {
                function4( () => {
                    // Maybe do something here... 🤷
                })
            })
        })
    })
*/


// Handling Errors 

function downloadSong2(songName, callbackSuccess, callbackFail){
    console.log(`Searching for ${songName} in our database...`)
    setTimeout(() => {
        // Simulate a valid song choice
        if (songName.length > 3){
            callbackSuccess(songName)
        } else {
            callbackFail(songName)
        }
    }, 3000)
}


let mySong = 'ABC'
downloadSong2(
    mySong, 
    s => console.log(`${s} has successfully downloaded and is now playing`), 
    s => console.log(`${s} is not a valid song choice`)
);