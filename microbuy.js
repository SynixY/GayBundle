"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = require("./src/swap");
const types_1 = require("./src/types");
const readline_sync_1 = require("readline-sync");
let mintAddress = "HvV9AcitrJC4Lo8Rj87RkRyruyF2fNTYy6qb6Ueipump"; //Replace with actual token mint address
let microbuySize = 0.02;
const microbuyWallets = [
    {
        privateKey: "2bkS9PNy8mTky63d6Wf9W9CuQz6LCmX1vAeURqaKbiYSUJBaGPC6fwHKRrU9Qp7o8vTAmw6WV88gEn1XUbsJjfFC",
        username: "CJc7F4Eh5Rs9VkgpyitNys7jMJQseZnBzrK9ggRXF8KG",
    },
];
const txMode = types_1.TransactionMode.Execution; //Set to simulate to test, Execution to perform
// Function to handle the WebSocket 'open' event
// Function to handle incoming messages from the WebSocket
class Microbuy {
    constructor(mintAddress, mode) {
        this.mintAddress = mintAddress;
        this.transactionMode = mode;
    }
    async main() {
        const slippageDecimal = 0.2;
        const priorityFeeInSol = 0.0001;
        const tokenBalance = 0.0003;
        const wallet = microbuyWallets[0];
        const unsername = wallet.username.slice(0, 6);
        await (0, swap_1.pumpFunBuy)(this.transactionMode, wallet.privateKey, this.mintAddress, microbuySize, priorityFeeInSol, slippageDecimal, unsername);
        await (0, swap_1.pumpFunSell)(this.transactionMode, wallet.privateKey, this.mintAddress, tokenBalance, priorityFeeInSol, slippageDecimal, unsername);
        setInterval(async () => {
            // Create two transactions
            await (0, swap_1.pumpFunBuy)(this.transactionMode, wallet.privateKey, this.mintAddress, microbuySize, priorityFeeInSol, slippageDecimal, unsername);
            await (0, swap_1.pumpFunSell)(this.transactionMode, wallet.privateKey, this.mintAddress, tokenBalance, priorityFeeInSol, slippageDecimal, unsername);
        }, 200000);
    }
}
// Function to prompt the user for the contract address to snipe
const microbuyPromt = () => {
    const address = (0, readline_sync_1.question)("Enter the contract address to microbuy: ");
    mintAddress = address;
    console.log(`Contract to snipe: ${mintAddress}`);
    const microbuy = new Microbuy(mintAddress, txMode);
    microbuy.main();
};
// Call the functions to prompt the user
microbuyPromt();
