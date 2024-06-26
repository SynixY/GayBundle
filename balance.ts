import { getSolBalance } from "./src/utils";
import { RPC, wallets } from "./src/constants";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";

class Balance {
  async main() {
    const connection = new Connection(RPC, "confirmed");
    let total = 0;
    const transactions = wallets.map(async (wallet) => {
      const walletkey = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));
      const balance = await getSolBalance(
        connection,
        walletkey.publicKey.toString()
      );

      total = total + balance;

      console.log(
        `Username: ${wallet.username.slice(0, 6)} Sol Balance: ${
          balance / LAMPORTS_PER_SOL
        }`
      );
    });
    await Promise.all(transactions);
    console.log(`Total: ${total / LAMPORTS_PER_SOL}`);
  }
}

const bl = new Balance();
bl.main();
