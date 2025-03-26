import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from "fs";

// Import the wallet from dev-wallet.json
const walletJson = JSON.parse(fs.readFileSync("dev-wallet.json", "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(walletJson));

// Create a connection to Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    // Request 2 SOL airdrop
    const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
