import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
const prompt = require("prompt-sync")()
import fs from "fs";


let kp = Keypair.generate()

console.log(`You've generated a new Solana wallet:
${kp.publicKey.toBase58()}`);

console.log(`[${kp.secretKey}]`);
// 2YX65gAeVzxsSFcogivtDPe3Wv57Lt8XPfe6qmNVoheH
//https://explorer.solana.com/tx/573KRBvMSd8FKQubJZhkr4Hb5bgZibwuaNmaFzpe48e8gtXeG1fQNq2XDhmr31rNKijEFm3QjKf9QoV6s9W7dpFX?cluster=devnet
//3. Success! Check out your TX here: https://explorer.solana.com/tx/u8H1MoqEg7afm8L9QSJguc5udtURf33oxzdNrJX5rGdm4uh323gdSZeDg5hcyg4WeHRZcZPgfrZNFCCHgrN248k?cluster=devnet

//4. Current balance: 1.899995 SOL
// Estimated transaction fee: 0.000005 SOL
// Success! Check out your TX here: https://explorer.solana.com/tx/Dho7roUuWPmt8Hx3DtD31gxMWqW7HFRN31666jdbcRqqvfw45pnD8L8zRXppHP5riQtSXewumegmxP4RfMKbfB2?cluster=devnet

//5.Generated PDA: Eaqas1mxEho8HwgQBHZXDh2sVwDu3A9MLKhpXLL1cyaW

// Success! Check out your TX here:
// https://explorer.solana.com/tx/5YWgsR8KN9KrLmTqXArchQUAY5PRiL2DE1GVCJSnwc2qRK3GjxWQ3ywDu115oWw5AqjXxYRBPTCiCD5F64vWPQrF?cluster=devnet


function base58ToWallet() {
    console.log("Enter your base58 private key:");
    const base58Key = prompt("> ");
    
    try {
      const wallet = new Uint8Array(bs58.decode(base58Key)); // Convert to Uint8Array
      console.log("Your wallet keypair:", JSON.stringify(Array.from(wallet)));
    } catch (e) {
      console.error("Invalid Base58 Key. Please try again.");
    }
  }
  
  const walletJson = JSON.parse(fs.readFileSync("dev-wallet.json", "utf8"));

  function walletToBase58() {
    const wallet = new Uint8Array(walletJson);
    const base58Key = bs58.encode(wallet);
    console.log("Base58 Private Key:", base58Key);
  }
  
  base58ToWallet();
  walletToBase58();
  