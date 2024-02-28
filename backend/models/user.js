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
        return {'msg': 'error', 'message':'All filds are required.'};
        // throw Error('All filds are required.');
    }

    if(!validator.isEmail(email)) {
        return {'msg': 'error', 'message':'Email is not valid.'};
        // throw Error('Email is not valid!');
    } 

    const exist = await this.findOne({email});
    if(exist) {
        return {'msg': 'error', 'message':'This email already exists.'};
        // throw Error('Email already exists.');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        return {'msg': 'error', 'message':'All filds are required.'};
        // throw Error('All filds are required');
    }

    const user = await this.findOne({email});
    if(!user) {
        return {'msg': 'error', 'message':'Incorrect Cardantials!.'};
        // throw Error('Incorrect Cardantials!');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return {'msg': 'error', 'message':'Incorrect Cardantials!!!.'};
        // throw Error('Incorrect Cardantials!!!');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);