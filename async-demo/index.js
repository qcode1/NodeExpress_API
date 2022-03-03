// DEALING WITH ASYNC CODE
// = Callbacks
// = Promises
// = Async/await

getUser = (id) => {
    console.log(`Reading User ID: ${id} from DB ... `);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: id, username: "qcode-1"});
        }, 2500);
    });
}

getUserTm = (id, callback) => {
    console.log(`Reading User ID: ${id} from DB ... `);
    setTimeout(() => {
        callback({id: id, username: "qcode-1"});
    }, 2500);
}

getRepositories = (name) => {
    console.log(`Reading repository data with Name: ${name} from DB ... `);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('message'));
        }, 3000)
    });   
}

getRepositoriesTm = (name, callback) => {
    console.log(`Reading repository data with Name: ${name} from DB ... `);
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
        // reject(new Error('message'));
    }, 3000);
}

getCommits = (repo) => {
    console.log(`Reading commits data FOR REPO: ${repo} from DB ... `);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([`${repo}:commit1`, `${repo}:commit2`, `${repo}:commit3`]);
        }, 3000);
    });
}

getCommitsTm = (repo, callback) => {
    console.log(`Reading commits data FOR REPO: ${repo} from DB ... `);
    setTimeout(() => {
        callback([`${repo}:commit1`, `${repo}:commit2`, `${repo}:commit3`]);
    }, 3000);
}

console.log('Before');

// INITIAL
// = Callback Approach (But resolves to callback hell)
// getUserTm(10, (user) => {
//     getRepositoriesTm(user.username, (repos) => {
//         getCommitsTm(repos[0], (data, err) => {
//             if (err) console.log(new Error('An error occured for Callback Approach'))
//             console.log('Commits', data);
//         });
//     });
// });

// REFACTORED
// getUser(10, getData);

function displayCommits(commits) {
    console.log('Commits', commits);
}
function displayRepos(userRepos) {
    getCommits(userRepos[0], displayCommits);
}
function getData(user) {
    getRepositories(user.username, displayRepos);
}
// END OF REFACTORED


// NEW BLOCK
// = Promise Based Approach
// getUser(10)
// .then(user => getRepositories(user.username))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log('All commits', commits))
// .catch(err => console.log('Error NEW :', err.message))
// END OF NEW BLOCK

console.log('After');




// NEW BLOCK
// = Async & Await
async function displayCommits() {
    try {
        const user = await getUser(1);
        const allRepos = await getRepositories(user.username);
        const commits = await getCommits(allRepos[2]);
        console.log('Async & Await = Commits =', commits);
    } catch (err) {
        console.log("Error in Async & Await :", err.message)
    }
}
displayCommits();
// END OF NEW BLOCK