import { createMetaplexInstance } from "./metaplex";

async function main(){
    const metaplex = createMetaplexInstance()
    const metadataUri = 'https://arweave.net/18Q5S-pVYZUi7Afl1czIJjlfaZGjS_ze6q3iJxUiWDE'
    const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: 'SolDevBootcamp',
        sellerFeeBasisPoints: 0,
    })

    console.log('nft', nft)
}

/* nft {
  model: 'nft',
  updateAuthorityAddress: PublicKey [PublicKey(9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn)] {
    _bn: <BN: 8087a2631c64e0b7db0bbcbf7a418e51f045899c9242ad4c7e521eb8fde6767f>
  },
  json: {
    name: 'kofikofi.sol.NFT',
    description: 'My first Solana NFT using Metaplex Token Standard featuring Coffee Station',
    image: 'https://arweave.net/_nIySH_PEGaHlxUv5FwqidgoAXk7BUs91_9OUhm15wg',
    attributes: [ [Object] ]
  },
  jsonLoaded: true,
  name: 'SolDevBootcamp',
  symbol: '',
  uri: 'https://arweave.net/18Q5S-pVYZUi7Afl1czIJjlfaZGjS_ze6q3iJxUiWDE',
  isMutable: true,
  primarySaleHappened: false,
  sellerFeeBasisPoints: 0,
  editionNonce: 255,
  creators: [
    {
      address: [PublicKey [PublicKey(9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn)]],
      verified: true,
      share: 100
    }
  ],
  tokenStandard: 0,
  collection: null,
  collectionDetails: null,
  uses: null,
  programmableConfig: null,
  address: PublicKey [PublicKey(Dh2USuLA8FiLBRHALsF37arEa6zJ85EYQbFCR1QyjyLU)] {
    _bn: <BN: bc8d24290809fcc7efef96b75f792afbe33c37b0f2ec017450092104c7011eb9>
  },
  metadataAddress: Pda [PublicKey(HttPqenAmRsVPnzB24caLtLXTYPGufG5U7pJxLAzPREw)] {
    _bn: <BN: fb05b924317f57851233b3197b7b8f5b1b18bdd6780ae289a0f85a11b88ce868>,
    bump: 255
  },
  mint: {
    model: 'mint',
    address: PublicKey [PublicKey(Dh2USuLA8FiLBRHALsF37arEa6zJ85EYQbFCR1QyjyLU)] {
      _bn: <BN: bc8d24290809fcc7efef96b75f792afbe33c37b0f2ec017450092104c7011eb9>
    },
    mintAuthorityAddress: PublicKey [PublicKey(DNWNbnb5MAeNUtt3crEbj9TkfUaPPJ2bMyFomZqDuRbT)] {
      _bn: <BN: b7cea6cf030f03127a3a8eeeac8b9e72f5a956c3815a8f3154dc7c7fdcf1ee0e>
    },
    freezeAuthorityAddress: PublicKey [PublicKey(DNWNbnb5MAeNUtt3crEbj9TkfUaPPJ2bMyFomZqDuRbT)] {
      _bn: <BN: b7cea6cf030f03127a3a8eeeac8b9e72f5a956c3815a8f3154dc7c7fdcf1ee0e>
    },
    decimals: 0,
    supply: { basisPoints: <BN: 1>, currency: [Object] },
    isWrappedSol: false,
    currency: { symbol: 'Token', decimals: 0, namespace: 'spl-token' }
  },
  token: {
    model: 'token',
    address: Pda [PublicKey(Dt9VTygQPb6RjNsx3Y2JcHkRMnkxzkRMiXu3tLoxznUq)] {
      _bn: <BN: bf667705cea1e0b2ae8bf3ed306898a40f45c36a7bd4f47edafcd6c2a26cd1fa>,
      bump: 254
    },
    isAssociatedToken: true,
    mintAddress: PublicKey [PublicKey(Dh2USuLA8FiLBRHALsF37arEa6zJ85EYQbFCR1QyjyLU)] {
      _bn: <BN: bc8d24290809fcc7efef96b75f792afbe33c37b0f2ec017450092104c7011eb9>
    },
    ownerAddress: PublicKey [PublicKey(9ej9BKP1gYFVGxPCme2C6is7PNAqN9uANH44VCMVN3Nn)] {
      _bn: <BN: 8087a2631c64e0b7db0bbcbf7a418e51f045899c9242ad4c7e521eb8fde6767f>
    },
    amount: { basisPoints: <BN: 1>, currency: [Object] },
    closeAuthorityAddress: null,
    delegateAddress: null,
    delegateAmount: { basisPoints: <BN: 0>, currency: [Object] },
    state: 1
  },
  edition: {
    model: 'nftEdition',
    isOriginal: true,
    address: Pda [PublicKey(DNWNbnb5MAeNUtt3crEbj9TkfUaPPJ2bMyFomZqDuRbT)] {
      _bn: <BN: b7cea6cf030f03127a3a8eeeac8b9e72f5a956c3815a8f3154dc7c7fdcf1ee0e>,
      bump: 255
    },
    supply: <BN: 0>,
    maxSupply: <BN: 0>
  }
}
*/

main()