const movieSchema = new mongo.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 200
    },
    actors: [String],
    genre: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    let result = v && v.length > 0;
                    callback(result); 
                }, 6000); 
            }, 
            message: "At least on genre should be provided"
        }
    },
    date: { type: Date, default: Date.now },
    profit: {
        type: Number,
        min: 100,
        required: function() {
            return this.isReleased;
        }
    },
    isReleased: Boolean
});