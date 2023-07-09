import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import * as token from '@solana/spl-token'
import base58 from 'bs58'
import { SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js'

async function main(){
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const mintAuthority = new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn')
    const freezeAuthority = new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn')

    const base58DecodedPK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodedPK)

    const tokenMint = await token.createMint(
        connection,
        signer,
        mintAuthority,
        freezeAuthority,
        9,
    );

    console.log('tokenMint', tokenMint.toBase58());

    // CCPgAYcDr1wFmb6SvEFksVrHAke6ZR8PsN881zA89XQc
    // 3pTQ82DEyRHhmiRKvG1yWrjF3CMaLjeNRtJDLvYLbywt
}

main()