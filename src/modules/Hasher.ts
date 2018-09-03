import * as Hashids from 'hashids'
import { GameMode, HASH_KEY, HASH_LENGTH } from './Welcome';

export class Hasher {

    public key: string
    public length: number
    public hashidsInstance: any

    constructor(key = HASH_KEY, length = HASH_LENGTH){
        this.key = key
        this.length = length
        this.hashidsInstance = new Hashids(this.key, this.length)
    }

    encode(data: any): string {
        return this.hashidsInstance.encode(data)
    }

    decode(hash: string): any {
        return this.hashidsInstance.decode(hash)
    }
    
}

export const hasher = new Hasher