const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    }
});

// create a model called 'users' using userSchema
mongoose.model('users', userSchema);