import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import base58 from 'bs58'
import { SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js'

console.log(process.env.SOL_PRIVATE_KEY)

async function main(){
    const transaction = new Web3.Transaction();
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn'),
        toPubkey: new Web3.PublicKey('DHwaP7ewUeoK4hmAFZB6jDw2eKrPd4FVFD2cy8J4A8jU'),
        lamports: 0.1 * LAMPORTS_PER_SOL
    })
    transaction.add(sendSolInstruction)

    const base58DecodedPK = base58.decode(process.env.SOL_PRIVATE_KEY || '');
    const keyPairFromSecret = Web3.Keypair.fromSecretKey(base58DecodedPK)

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    const txHash = await sendAndConfirmTransaction(connection, transaction, [keyPairFromSecret])
    console.log('txHash', txHash)
}

main()