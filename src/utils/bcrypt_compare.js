import User from '../models/users.js';
import bcrypt from 'bcrypt'

export async function bcCompare(client_password, bd_password_hash){
    let bcript_verify = await bcrypt.compare(client_password, bd_password_hash)
    if (bcript_verify){
        return bcript_verify
    } else{
        return false
    }
}