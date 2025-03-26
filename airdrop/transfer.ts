import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import * as fs from "fs";

// Import the dev wallet (sender)
const walletJson = JSON.parse(fs.readFileSync("dev-wallet.json", "utf8"));
const from = Keypair.fromSecretKey(new Uint8Array(walletJson));

// Replace with your Phantom Devnet address
const to = new PublicKey("FGJcvTBtZ5zNcfUWNgicjbNUVBD9wMGRoU8SDmBFFpjn");

// Connect to Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    // Get the current balance of the wallet
    const balance = await connection.getBalance(from.publicKey);

    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    if (balance === 0) {
      console.log("No SOL left to transfer.");
      return;
    }

    // Create a dummy transaction to estimate fees
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
    transaction.feePayer = from.publicKey;

    // Get exact fee for the transaction
    const fee = (await connection.getFeeForMessage(transaction.compileMessage(), "confirmed")).value || 0;

    console.log(`Estimated transaction fee: ${fee / LAMPORTS_PER_SOL} SOL`);

    // Adjust balance to send exact amount minus fees
    transaction.instructions.pop(); // Remove old instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee, // Send remaining balance minus fee
      })
    );

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
