import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import * as token from '@solana/spl-token'
import base58 from 'bs58'

async function main(){

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    const base58DecodedPK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodedPK)
    
    const mintAccount = new Web3.PublicKey('6aFDj2C1yaDy7sqm2jwsqegDcCqk7jPn9758jcjqTpoJ')
    const mintAuthority = new Web3.PublicKey('4649YunsxkUYeWJQW1nNoi9H3vsFrfz9KSTvKj2JURgr')
    const destination = new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn')

    const tokenMint = await token.mintTo(
        connection,
        signer,
        mintAccount,
        mintAuthority,
        destination,
        100000000000,
    )

    console.log('token mint', tokenMint)

    // tokenMint 6aFDj2C1yaDy7sqm2jwsqegDcCqk7jPn9758jcjqTpoJ
    // token account 4649YunsxkUYeWJQW1nNoi9H3vsFrfz9KSTvKj2JURgr
    //token mint 3Prh53BNg6HMz8iEJ7YGfMYW8DgibooncgcdV7hELmpKX8D8729TCHJN2DkC4Smr8LUgTB6DeHUE77rQhCTaqapn

}

main()