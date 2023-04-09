var db = require('./db');
const userSchema = new db.mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    pwd: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },

}, { collection: 'users' })

let usersModel = db.mongoose.model('usersModel', userSchema);

module.exports = { usersModel };