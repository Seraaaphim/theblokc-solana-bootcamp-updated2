import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import * as token from '@solana/spl-token'
import base58 from 'bs58'

async function main(){

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const mintAccount = new Web3.PublicKey('CCPgAYcDr1wFmb6SvEFksVrHAke6ZR8PsN881zA89XQc')
    const base58DecodedPK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodedPK)
    const ownerOfTokenAccount = new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn')

    const tokenAccount = await token.createAccount(
        connection,
        signer,
        mintAccount,   //token mint account
        ownerOfTokenAccount,
    )

    console.log('token account', tokenAccount.toBase58())
}

main()