"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./src/constants");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const readline_sync_1 = require("readline-sync");
const spl_token_1 = require("@solana/spl-token");
let mintAddress = "";
class Balance {
    async main() {
        const connection = new web3_js_1.Connection(constants_1.RPC, "confirmed");
        let total = 0;
        const mint = new web3_js_1.PublicKey(mintAddress);
        const transactions = constants_1.wallets.map(async (wallet) => {
            const walletkey = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(wallet.privateKey));
            try {
                const tokenAccountAddress = await (0, spl_token_1.getAssociatedTokenAddress)(mint, walletkey.publicKey, false);
                const tokenbalancefull = await connection.getTokenAccountBalance(tokenAccountAddress);
                const { amount } = tokenbalancefull.value;
                const power = 10 ** 6;
                const balance = parseInt(amount) / power;
                total = total + balance;
                console.log(`Username: ${wallet.username.slice(0, 6)} Sol Balance: ${balance}`);
            }
            catch {
                console.log(`Username: ${wallet.username.slice(0, 6)} Failed`);
            }
        });
        await Promise.all(transactions);
        console.log(`Total: ${total}`);
    }
}
const tokenadress = () => {
    mintAddress = (0, readline_sync_1.question)("Token address: ");
    const bl = new Balance();
    bl.main();
};
tokenadress();
