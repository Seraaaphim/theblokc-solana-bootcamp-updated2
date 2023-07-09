import {createMetaplexInstance} from './metaplex'
import {toMetaplexFile} from '@metaplex-foundation/js'
import fs from 'fs'

const buffer = fs.readFileSync(__dirname + "/assets/chowchowking.jpg");
const file = toMetaplexFile(buffer, "image.jpg");

const metaplex = createMetaplexInstance()

async function main() {
    const imageUrl = await metaplex.storage().upload(file)
    console.log('image Url', imageUrl);
}

// kofikofi Upload picture URL: https://arweave.net/_nIySH_PEGaHlxUv5FwqidgoAXk7BUs91_9OUhm15wg
// chowchowking Upload picture URL: https://arweave.net/51stflx1Md0BAYTvS4R3A1WfSYsMWRPdLU_ItxeVRNg

main()