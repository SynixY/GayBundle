import { getSolBalance } from "./src/utils";
import { RPC, wallets } from "./src/constants";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import bs58 from "bs58";
import { question } from "readline-sync";
import { getAssociatedTokenAddress } from "@solana/spl-token";

let mintAddress: string = "";

class Balance {
  async main() {
    const connection = new Connection(RPC, "confirmed");

    let total = 0;

    const mint = new PublicKey(mintAddress);
    const transactions = wallets.map(async (wallet) => {
      const walletkey = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));

      try {
        const tokenAccountAddress = await getAssociatedTokenAddress(
          mint,
          walletkey.publicKey,
          false
        );
        const tokenbalancefull = await connection.getTokenAccountBalance(
          tokenAccountAddress
        );

        const { amount } = tokenbalancefull.value;
        const power = 10 ** 6;

        const balance = parseInt(amount) / power;

        total = total + balance;

        console.log(
          `Username: ${wallet.username.slice(0, 6)} Sol Balance: ${balance}`
        );
      } catch {
        console.log(`Username: ${wallet.username.slice(0, 6)} Failed`);
      }
    });
    await Promise.all(transactions);
    console.log(`Total: ${total}`);
  }
}

const tokenadress = (): void => {
  mintAddress = question("Token address: ");

  const bl = new Balance();
  bl.main();
};

tokenadress();
