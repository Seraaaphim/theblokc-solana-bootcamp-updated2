const { systemModule } = require('@metaplex-foundation/js')
const anchor = require('@project-serum/anchor')
const { SystemProgram } = anchor.web3

const TestFunc = async () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider)

    const program = anchor.workspace.Kdapp

    const account = anchor.web3.Keypair.generate()

    let tx = await program.rpc.initialize({
        accounts: {
            initialAccount: account.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [account],
    })
    console.log('Your transaction signature', tx)
    // Fetch data from the accouunt.
    let fetchedvalue = await program.account.init.fetch(account.publicKey)
    console.log('output value', fetchedvalue.value.toString())

    const value = new anchor.BN(40)

    let tx2 = await program.rpc.updateValue(value, {
        accounts: {
            storageAccount: account.publicKey,
        },
        //signers: [account],
    })
    console.log(('Your transaction signature', tx2))
    let fetchedvalue2 = await program.account.init.fetch(account.publicKey)
    console.log('output value', fetchedvalue2.value.toString())
}

const runTest = async () => {
    try {
        await TestFunc()
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

runTest()