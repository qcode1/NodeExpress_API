
getCustomer(1, (customer) => {
    console.log('Customer:', customer)
    if (customer.isGold) {
        getTopMovies((movies) => {
            console.log('Top movies: ', movies);
            sendEmail(customer.email, movies, () => {
                console.log('Email sent...');
            });
        });
    }
});