// Callback Hell Problem is solved with Promises!


/*
    In JavaScript, a promise is an object that returns a value which you hope to receive in the future, but not now.
    Has three states:
    1. Pending: initial state, neither fulfilled nor rejected
    2. Fulfilled: meaning that the operation was completed successfully
    3. Rejected: meaning that the operation failed
*/

function downloadSong(songName){
    console.log(`Searching for ${songName} in our database...`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (songName.length > 4){
                resolve(`${songName}.mp4`)
            } else {
                reject(`${songName} is not valid`)
            }
        }, 3000)
    })
}

// let mySong = downloadSong('Mrs. Robinson');
// console.log(mySong);
// mySong.then(song => console.log(song.toUpperCase()));

// downloadSong('Yesterday').then(s => console.log(`We are now playing ${s}`))

// downloadSong('ABC').then(s => console.log(`We are now playing ${s}`)).catch(e => console.warn(e))


// function playSong(songFile){
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res(`${songFile} is playing...`)
//         }, 2000)
//     })
// }




// downloadSong('ABC')
// .then((s) => {
//     console.log(`${s} has downloaded`)
//     return playSong(s)
// })
// .then(message => console.log(message))
// .catch(err => console.warn(err))



// Real Life Example
// Get the price of a user's orders based on user_id
// userId -> user -> user's orders -> calculate order total


function getUser(userId){
    return new Promise((resolve, reject) => {
        console.log(`Searching for user #${userId} in database...`)
        setTimeout(() => {
            // Set up some fake rule for if a user does not exist
            if (userId >= 100){
                let user = {
                    id: userId,
                    username: 'johnqsample'
                }
                resolve(user)
            } else {
                reject(`No user with id #${userId}`)
            }
        }, 2000)
    })
}


function getUserOrder(user){
    console.log(`Getting the orders for ${user.username}`)
    return new Promise((res, rej) => {
        setTimeout(()=>{
            let orders = [
                {prodName: 'Computer', price: 1000},
                {prodName: 'Water Bottle', price: 12},
                {prodName: 'Picture Frame', price: 14},
            ]
            res(orders)
        }, 2000)
    })
}

function getOrderTotal(order){
    console.log("Calculating order total:...")
    return new Promise((res, rej) => {
        setTimeout(() => {
            let total = 0
            order.forEach(p => total += p.price)
            res(total)
        }, 1000)
    })
}

function getUsersTotalFromUserId(userId){
    getUser(userId)
        .then(user => getUserOrder(user))
        .then(order => getOrderTotal(order))
        .then(total => console.log(`Your total is $${total}`))
        .catch(err => console.warn(err))
}


// Async / Await -- allows us to write our code to look more synchronous. *It is simply syntactical sugar for Promises*

function getUsersTotalFromUserId(userId){
    getUser(userId)
        .then(user => getUserOrder(user))
        .then(order => getOrderTotal(order))
        .then(total => console.log(`Your total is $${total}`))
        .catch(err => console.warn(err))
}

// What it would look like in Python (synchronous)
// def get_user_total_from_id(user_id):
//     user = getUser(userId)
//     order = getUserOrder(user)
//     total = getOrderTotal(order)
//     print(f"Your total is ${total}")

async function getUserTotal(userId){
    try{
        let user = await getUser(userId);
        let order = await getUserOrder(user);
        let total = await getOrderTotal(order);
        console.log(`Your total is $${total}`)
    } catch(err) {
        console.warn(err)
    }
}

