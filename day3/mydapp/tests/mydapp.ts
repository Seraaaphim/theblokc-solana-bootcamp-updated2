import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Mydapp } from "../target/types/mydapp";
import * as assert from "assert";
import { Connection } from '@solana/web3.js';
import * as bs58 from "bs58";

describe("mydapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Mydapp as Program<Mydapp>;

  it('can send a new tweet', async () => {
    // Execute the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();
    const anchorProvider = program.provider as anchor.AnchorProvider
    await program.methods
      .sendTweet('gm', 'hello')
      .accounts({
        tweet: tweet.publicKey,
        author: anchorProvider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
  

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), anchorProvider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'gm');
    assert.equal(tweetAccount.content, 'hello');
    assert.ok(tweetAccount.timestamp);
    });

  it('can send a new tweet without a topic', async () => {
    // Execute the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();
    const anchorProvider = program.provider as anchor.AnchorProvider
    await program.methods
      .sendTweet('', 'hello')
      .accounts({
        tweet: tweet.publicKey,
        author: anchorProvider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
    
  
    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  
    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), anchorProvider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, '');
    assert.equal(tweetAccount.content, 'hello');
    assert.ok(tweetAccount.timestamp);
    });
    
    it('can send a new tweet from a different author', async () => {
      // Generate another user and airdrop them some SOL.
      const anchorProvider = program.provider as anchor.AnchorProvider
      const tweet = anchor.web3.Keypair.generate();
      const otherUser = anchor.web3.Keypair.generate();
      const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
      
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const latestBlockHash = await connection.getLatestBlockhash();

      const transactionConfirmationStrategy = {
        signature: signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      };
      
      await program.provider.connection.confirmTransaction(transactionConfirmationStrategy);
      
      await program.methods
        .sendTweet('gm', 'hello')
        .accounts({
          tweet: tweet.publicKey,
          author: otherUser.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([otherUser,tweet])
        .rpc();
      
    
      // Fetch the account details of the created tweet.
      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    
      // Ensure it has the right data.
      assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
      assert.equal(tweetAccount.topic, 'gm');
      assert.equal(tweetAccount.content, 'hello');
      assert.ok(tweetAccount.timestamp);
      });

  it('cannot provide a topic with more than 50 characters', async () => {
    // Execute the "SendTweet" instruction.
  try{
    const anchorProvider = program.provider as anchor.AnchorProvider
    const tweet = anchor.web3.Keypair.generate();
    const topicWith51Chars = 'x'.repeat(51);

    await program.methods
      .sendTweet(topicWith51Chars, 'hello')
      .accounts({
        tweet: tweet.publicKey,
        author: anchorProvider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
  } catch (error) { 
    assert.equal(error.error.errorMessage, 'The provided topic should be 50 characters long maximum.')
    return;
  }
    assert.fail('The instruction should have failed with 51-character topic');
  });

  it('cannot provide a content with more than 280 characters', async () => {
    // Execute the "SendTweet" instruction.
  try{
    const anchorProvider = program.provider as anchor.AnchorProvider
    const tweet = anchor.web3.Keypair.generate();
    const contentWith51Chars = 'x'.repeat(281);

    await program.methods
      .sendTweet('gm', contentWith51Chars)
      .accounts({
        tweet: tweet.publicKey,
        author: anchorProvider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();
  } catch (error) { 
    assert.equal(error.error.errorMessage, 'The provided content should be 280 characters long maximum.');
    return;
  }
    assert.fail('The instruction should have failed with 281-character content');
  });

  it('can fetch all tweets', async () => {
    const tweetAccounts = await program.account.tweet.all();
    assert.equal(tweetAccounts.length, 3);
  });

  it('can filter tweets by author', async () => {
    const anchorProvider = program.provider as anchor.AnchorProvider;
    const authorPublicKey = anchorProvider.wallet.publicKey
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8,
          bytes: authorPublicKey.toBase58(),
        }
      }
    ]);
    assert.equal(tweetAccounts.length, 2);
    assert.ok(tweetAccounts.every(tweetAccount => {
      return tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
  });

  it('can filter tweets by topic', async () => {
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8+32+8+4,
          bytes: bs58.encode(Buffer.from('gm')),
        }
      }
    ]);
    assert.equal(tweetAccounts.length, 2);
    assert.ok(tweetAccounts.every(tweetAccount => {
      return tweetAccount.account.topic === 'gm'
    }))
  })

});