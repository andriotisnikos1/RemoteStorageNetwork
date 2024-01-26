import crypto from 'crypto'
import fsp from 'fs/promises'

export default async function validateAuth(token:string) {
    const passwd = await fsp.readFile('./passwd', 'utf-8')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    return passwd === tokenHash 
}