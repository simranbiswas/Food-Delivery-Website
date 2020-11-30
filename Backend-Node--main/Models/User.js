const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstname:{
        type: String,
        required:true,
        trim: true
    },
    lastname:{
        type: String,
        required:true,
        trim: true     
    },
    location:{
        type: String,
        required: true
    },
    hash_password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
});

UserSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
})


UserSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('user',UserSchema);

