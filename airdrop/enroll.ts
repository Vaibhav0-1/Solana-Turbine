import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import * as fs from "fs";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";

const walletJson = JSON.parse(fs.readFileSync("Turbin3-wallet.json", "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(walletJson));


const connection = new Connection("https://api.devnet.solana.com", "confirmed");


const github = Buffer.from("Vaibhav0-1", "utf8");


const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });



const program : Program<Turbin3Prereq>= new Program(IDL, provider);


const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

console.log("Generated PDA:", enrollment_key.toBase58());

(async () => {
try {
const txhash = await program.methods
.submit(github)
.accounts({
signer: keypair.publicKey,
})
.signers([
keypair
]).rpc();
console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
} catch(e) {
console.error(`Oops, something went wrong: ${e}`)
}
})();
