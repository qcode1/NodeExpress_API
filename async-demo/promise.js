

const p = new Promise((resolve, reject) => {
    // Kick off
    setTimeout(() => {
        // resolve(1);
        reject(new Error('my err message'));
    }, 2500);
    // reject(new Error('message'));
});

p
.then(result => console.log('Result', result))
.catch(err => console.log('Error :', err.message))