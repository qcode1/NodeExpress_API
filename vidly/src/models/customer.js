const mongodb = require("mongoose");

const customerSchema = new mongodb.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        min: 5,
        max: 150,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        length: 12
    },
});

const Customer = new mongodb.model("Customer", customerSchema);

module.exports = Customer;