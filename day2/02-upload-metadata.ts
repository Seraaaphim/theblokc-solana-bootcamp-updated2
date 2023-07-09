import { createMetaplexInstance } from "./metaplex";

const metaplex = createMetaplexInstance()

const metadata = {
    name: "chowchowking.sol.NFT",
    description: "Chowking Beef Siomai",
    image: "https://arweave.net/51stflx1Md0BAYTvS4R3A1WfSYsMWRPdLU_ItxeVRNg",
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

// kofikofi Upload metadata URL: https://arweave.net/18Q5S-pVYZUi7Afl1czIJjlfaZGjS_ze6q3iJxUiWDE
// chowchowking Upload metadata URL: https://arweave.net/IZWCIPWc07EpEzhzEQriAy5H4QxqlRJZGbmb09fUy40

main()