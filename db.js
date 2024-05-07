const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://cparakh53:VsR0suwDAa7XjbEs@chiraglearn.7ynaqrk.mongodb.net/flagfury')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const TeamSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        required: true
    },
    levelReached: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

const Account = mongoose.model('Accounts', accountSchema)
const Teams = mongoose.model('Teams', TeamSchema)
module.exports = { Teams, Account };