const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    points: {
      type:Number,
      required: true,
      unique: true
    },
});

const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;