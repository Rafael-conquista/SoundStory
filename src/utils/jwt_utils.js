import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'

const secret_key = process.env.SECRET_KEY

export function jwt_sign(email){
    const token = jwt.sign({ email }, secret_key, { expiresIn: '1m' });
    return token
}

export function jwt_verify(token){
    return jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          return false
        }
        return true
    });
}