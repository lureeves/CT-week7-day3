console.log('This is a promise.');

/*
    In JavaScript, a promise is an object that returns a value which you hope to receive in the future, but not now.
    Has three states:
    1. Pending: initial state, neither fulfilled nor rejected
    2. Fulfilled: meaning that the operation was completed successfully, will return a value
    3. Rejected: meaning that the operation failed, will return a error message
*/

// Promise based function
function downloadSong(songName){
    console.log(`Searching for ${songName} in database...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (songName.length > 5){
                resolve({
                    title: songName,
                    artist: 'Beyonce'
                })
            } else {
                reject(`${songName} is not in our database...`)
            }
        }, 5000)
    });
};


// let mySong = downloadSong('Single Ladies');
// console.log(mySong);

function playSong(song){
    console.log(`${song.title} by ${song.artist} is playing...`);
};

// mySong.then(playSong);


// downloadSong('Halo').then(playSong, err => console.warn(err));

// let anotherSong = downloadSong('Halo');

// anotherSong.then(playSong, err => console.warn(err));

// downloadSong('ABC').then(playSong).catch(e => console.warn(e));


// downloadSong('Halo')
//     .then(song => song.artist)
//     .then(artist => artist.toUpperCase())
//     .then(upperArtist => console.log(upperArtist))
//     .catch(error => console.warn(error))


// Real-ish life example
// Get the price of an order based on a user's id
// userId -> user -> user's orders -> calculate the total

function getUser(userId){
    return new Promise((resolve, reject) => {
        console.log(`Searching for user #${userId} in database...`)
        setTimeout(() => {
            // Set up some fake rule to determing existing user
            if (userId > 100){
                let user = {
                    id: userId,
                    username: 'johnqsample'
                };
                resolve(user);
            } else {
                reject(`No user with id #${userId}`)
            }
        }, 2000);
    });
};


function getUserOrder(user){
    return new Promise((res, rej) => {
        console.log(`Getting the orders for ${user.username}`)
        setTimeout(() => {
            if (user.id > 150){
                let orders = [
                    {prodName: 'Picture Frame', price: 25.95},
                    {prodName: 'Winter Hat', price: 19.45},
                    {prodName: 'Deck of Cards', price: 8.99},
                ];
                res(orders);
            } else {
                rej('This user has no orders');
            }
        }, 2000)
    })
}


function getOrderTotal(order){
    return new Promise((res, rej) => {
        console.log("Calculating order total...")
        setTimeout(() => {
            let total = 0;
            order.forEach(p => total += p.price);
            res(total);
        }, 1000)
    })
}


function getTotalFromUserId(userId){
    getUser(userId)
        .then(user => getUserOrder(user))
        .then(order => getOrderTotal(order))
        .then(total => console.log(`User #${userId} has a total of $${total}`))
        .catch(err => console.warn(err))
};

getTotalFromUserId(128);


// Async/Await - allows us to write our code to LOOK more synchronous
// * It is simply syntactical sugar for Promises *

/*
Similar Get total from user id in python:
def get_total_from_user_id(user_id):
    user = get_user(user_id)
    order = get_user_order(user)
    total = get_order_total(order)
    print(f"User #{user_id} has a total of ${total}")
get_total_from_user_id(3243)
*/

async function getUserTotal(userId){
    try{
        let user = await getUser(userId);
        let order = await getUserOrder(user);
        let total = await getOrderTotal(order);
        console.log(`User #${userId} has a total of $${total}`);
    } catch(err) {
        console.warn(err);
    };
};


// getUserTotal(153);


const arrowAsyncFunc = async (id) => {
    let user = await getUser(id)
    console.log(`User has an id of ${user.id} and username is ${user.username}`)
};

// arrowAsyncFunc(123)