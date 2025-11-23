import mongoose, { mongo } from "mongoose";
import bcrpty from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 20 },
})

// Hash Password before saving
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrpty.genSalt(10)
    this.password= await bcrpty.hash(this.password,salt)
    next()
})

const User = mongoose.model('user' ,userSchema)

export default User;