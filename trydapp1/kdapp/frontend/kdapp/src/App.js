import React, { useState } from 'react'
import './App.css';
import * as anchor from '@project-serum/anchor'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import idl from './kdapp.json'
import { AnchorProvider } from '@project-serum/anchor';

const { SystemProgram, Keypair } = anchor.web3;

let myAccount = Keypair.generate()

const programID = new PublicKey(idl.metadata.address)
console.log(programID, 'program ID is set correctly')

const network = clusterApiUrl('devnet')

const opts = {
  preflightCommitment: "processed"
}

function App() {

  const [walletAddress, setWalletAddress] = useState(null)
  const [retrieveValue, setRetrieveValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  window.onload = async function () {
    try {
      if (window.solana) {
        const solana = window.solana
        if (solana.isPhantom) {
          console.log('Phantom wallet found')
          const res = await solana.connect({ onlyIfTrusted: true })
          console.log('Connected with Public Key: ', res.publicKey.toString())
          setWalletAddress(res.publicKey.toString())
          await Retrieve()
          if (retrieveValue === null){
            await CreateAccount()
          }
        }
      }
      else {
        alert('Wallet not found! Install Phantom Wallet')
      }
    } catch (error) {
      console.error(error)
    }
  }



  const connectwallet = async () => {
    if (window.solana) {
      const solana = window.solana
      const res = await solana.connect()
      setWalletAddress(res.publicKey.toString())
    }
    else {
      alert('Wallet not found! Install Phantom Wallet')
    }
  }

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment)
    const provider = new AnchorProvider(
      connection, 
      window.solana, 
      opts.preflightCommitment,
      )
    console.log(provider, 'provider is set correctly')
    return provider;
  }

  const Retrieve = async () => {
    try{
      const provider = getProvider()
      const program = new anchor.Program(idl, programID, provider)
      const account = await program.account.init.fetch(myAccount.publicKey)
      setRetrieveValue(account.value.toString())
      console.log('retrieved value is: ', retrieveValue)
    } catch (error){
      console.error('Error in fetching: ',error)
      setRetrieveValue(null)
    }
  }

  const onInputChange = (event) => {
    const { value } = event.target
    setInputValue(value)
  }

  const CreateAccount = async () => {
    try{
      const provider = getProvider()
      const program = new anchor.Program(idl, programID, provider)
      let tx = await program.rpc.initialize({
        accounts: {
          initialAccount: myAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [myAccount],
       })
       console.log('Created a new myAccount with address: ', myAccount.publicKey.toString())
    } catch (error){
      console.log('Error in creating account: ', error)
    }
  }

  const UpdateValue = async () => {
    try{
      const provider = getProvider()
      const program = new anchor.Program(idl, programID, provider)
      const value = new anchor.BN(inputValue)

      let tx2 = await program.rpc.updateValue(value, {
        accounts:{
          storageAccount: myAccount.publicKey,
        },
        //signers: [account],
      })
    } catch(error){
      console.log('Error creating myAccount account: ', error)
    }
  }

  return (
    <div className="App">
      <div className="">
        <h1 className="header">My Solana Dapp</h1>
      
      <div>
          {!walletAddress && (
          <div>
            <button className="btn" onClick={connectwallet}>
              Connect Wallet
            </button>
          </div>
          )}

          {walletAddress && (
          <div>
            <p>
              Connected Account: {' '}
              <span className="address"> {walletAddress} </span>
            </p>
            <div className="grid-container">
              {/* set value column one*/}
              <div className="grid-item">
                <input placeholder="value"
                value={inputValue}
                onChange={onInputChange}>
                </input>
                <br></br>
                <button className="btn2" onClick={UpdateValue}>Store</button>
              </div>
              {/* get value column two*/}
              <div className="grid-item">
                <button className="btn2" onClick={Retrieve}>
                  Retrieve
                </button>
                <p>{retrieveValue}</p>
              </div>
            </div>
          </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default App;
