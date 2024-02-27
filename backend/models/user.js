const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }
});

// signup function
userSchema.statics.signup = async function({email, password}){
    if(!email || !password) {
        throw Error('All filds are required.');
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid!');
    } 

    const exist = await this.findOne({email});
    if(exist) {
        throw Error('Email already exists.');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All filds are required');
    }

    const user = await this.findOne({email});
    if(!user) {
        throw Error('Incorrect Cardantials!');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw Error('Incorrect Cardantials!!!');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);