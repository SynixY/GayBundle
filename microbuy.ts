import { pumpFunBuy, pumpFunSell } from "./src/swap";
import { TransactionMode } from "./src/types";
import WebSocket from "ws";
import { getCoinData, getCoinMeta } from "./src/api";
import { Keypair } from "@solana/web3.js";
import { decode } from "bs58";
import { question } from "readline-sync";
import { wallets, TICKERORADDRESS, DELAYPUMP } from "./src/constants";

let mintAddress: string = "HvV9AcitrJC4Lo8Rj87RkRyruyF2fNTYy6qb6Ueipump"; //Replace with actual token mint address

let microbuySize: number = 0.02;

const microbuyWallets = [
  {
    privateKey:
      "2bkS9PNy8mTky63d6Wf9W9CuQz6LCmX1vAeURqaKbiYSUJBaGPC6fwHKRrU9Qp7o8vTAmw6WV88gEn1XUbsJjfFC",
    username: "CJc7F4Eh5Rs9VkgpyitNys7jMJQseZnBzrK9ggRXF8KG",
  },
];

const txMode = TransactionMode.Execution; //Set to simulate to test, Execution to perform
// Function to handle the WebSocket 'open' event

// Function to handle incoming messages from the WebSocket

class Microbuy {
  private mintAddress: string;
  private transactionMode: TransactionMode;

  constructor(mintAddress: string, mode: TransactionMode) {
    this.mintAddress = mintAddress;
    this.transactionMode = mode;
  }

  async main() {
    const slippageDecimal = 0.2;
    const priorityFeeInSol = 0.0001;
    const tokenBalance = 0.0003;
    const wallet = microbuyWallets[0];
    const unsername = wallet.username.slice(0, 6);
    await pumpFunBuy(
      this.transactionMode,
      wallet.privateKey,
      this.mintAddress,
      microbuySize,
      priorityFeeInSol,
      slippageDecimal,
      unsername
    );

    await pumpFunSell(
      this.transactionMode,
      wallet.privateKey,
      this.mintAddress,
      tokenBalance,
      priorityFeeInSol,
      slippageDecimal,
      unsername
    );

    setInterval(async () => {
      // Create two transactions

      await pumpFunBuy(
        this.transactionMode,
        wallet.privateKey,
        this.mintAddress,
        microbuySize,
        priorityFeeInSol,
        slippageDecimal,
        unsername
      );

      await pumpFunSell(
        this.transactionMode,
        wallet.privateKey,
        this.mintAddress,
        tokenBalance,
        priorityFeeInSol,
        slippageDecimal,
        unsername
      );
    }, 200000);
  }
}

// Function to prompt the user for the contract address to snipe
const microbuyPromt = (): void => {
  const address = question("Enter the contract address to microbuy: ");
  mintAddress = address;
  console.log(`Contract to snipe: ${mintAddress}`);

  const microbuy = new Microbuy(mintAddress, txMode);
  microbuy.main();
};

// Call the functions to prompt the user
microbuyPromt();
