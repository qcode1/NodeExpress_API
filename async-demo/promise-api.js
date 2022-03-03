
// const promise = Promise.resolve( {id: 21, name: "qcode-1"} );
// const promise = Promise.reject( new Error('Rejected for tests!') );

// promise.catch(result => console.log(result));


const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Asymc operation 1 ... ');
        resolve('Worked');
    }, 2500);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asymc operation 2 ... ');
        resolve(20);
        reject(new Error('An error occured 2'));
    }, );
});


Promise.race([p1, p2])
                    .then(result => console.log(result)).catch(err => console.log('Error :', err.message));

