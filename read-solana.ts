import * as Web3 from '@solana/web3.js'

const publicKey = new Web3.PublicKey('9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn');

async function main(){
    // console.log('devnet url', Web3.clusterApiUrl('devnet'))
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    const balance = await connection.getBalance(publicKey)
    console.log('balance', balance)

    const accountInfo = await connection.getAccountInfo(publicKey)
    console.log('accountInfo', accountInfo?.data.toString())
}

main()