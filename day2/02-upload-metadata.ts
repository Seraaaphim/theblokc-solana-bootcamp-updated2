import { createMetaplexInstance } from "./metaplex";

const metaplex = createMetaplexInstance()

const metadata = {
    name: "kofikofi.sol.NFT",
    description: "My first Solana NFT using Metaplex Token Standard featuring Coffee Station",
    image: "https://arweave.net/_nIySH_PEGaHlxUv5FwqidgoAXk7BUs91_9OUhm15wg",
    attributes:[
        {
        trait_type: 'Event',
        value: 'Solana Developers Bootcamp'
    }
    ]
}

async function main(){
    const { uri } = await metaplex.nfts().uploadMetadata(metadata)
    console.log('metadata uri', uri)
}

main()