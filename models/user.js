const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }], 
    githubId: String,
    username: String,
    photo: String
},{timestamps: true});

userSchema.pre('save', function(next) {
    // this will have the user data passed on while we call User.create()

    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } else {
        next();
    }
});

userSchema.methods.validatePassword = function(password){
    if(this.password){
        return bcrypt.compareSync(password, this.password);
    } else {
        return null;
    }
    
};



module.exports = mongoose.model('User', userSchema);
