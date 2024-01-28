import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js';

export async function bcCompare(client_password, bd_password_hash){
    let bcript_verify = await bcrypt.compare(client_password, bd_password_hash)
    if (bcript_verify){
        return bcript_verify
    } else{
        return false
    }
}

export function decrypt_password(client_password){
    const chaveDeCifra = 'chave-secreta'; 
    const bytes = CryptoJS.AES.decrypt(client_password, chaveDeCifra);
    return bytes.toString(CryptoJS.enc.Utf8);
}