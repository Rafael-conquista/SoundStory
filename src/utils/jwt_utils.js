import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'

const secret_key = process.env.SECRET_KEY

export function jwt_sign(email){
    const token = jwt.sign({ email }, secret_key, { expiresIn: '10m' });
    return token
}

export function jwt_verify(token){
    return jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          return false
        }
        const teste = is_token_expiring(token)
        console.log(teste)
        return true
    });
}

export function is_token_expiring(token){
    return jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          return err
        }
        const exp = decoded['exp']

        // Obtém o tempo atual em segundos
        const currentTime = Math.floor(Date.now() / 1000);

        // Define o intervalo de tempo (por exemplo, 5 minutos antes da expiração)
        const intervaloExpiracao = 5 * 60;
        return (exp - currentTime)<=intervaloExpiracao
    });
}