"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./src/utils");
const constants_1 = require("./src/constants");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
class Balance {
    async main() {
        const connection = new web3_js_1.Connection(constants_1.RPC, "confirmed");
        let total = 0;
        const transactions = constants_1.wallets.map(async (wallet) => {
            const walletkey = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(wallet.privateKey));
            const balance = await (0, utils_1.getSolBalance)(connection, walletkey.publicKey.toString());
            total = total + balance;
            console.log(`Username: ${wallet.username.slice(0, 6)} Sol Balance: ${balance / web3_js_1.LAMPORTS_PER_SOL}`);
        });
        await Promise.all(transactions);
        console.log(`Total: ${total / web3_js_1.LAMPORTS_PER_SOL}`);
    }
}
const bl = new Balance();
bl.main();
