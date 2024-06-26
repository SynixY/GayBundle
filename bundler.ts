import { pumpFunBuy, pumpFunSell } from "./src/swap";
import { TransactionMode } from "./src/types";
import WebSocket from "ws";
import { getCoinData, getCoinMeta } from "./src/api";
import { Keypair, PublicKey } from "@solana/web3.js";
import { decode } from "bs58";
import { question } from "readline-sync";
import { wallets, TICKER, TICKERORADDRESS, DELAYPUMP } from "./src/constants";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const gay = [];

let holding: boolean = false;
// Define the WebSocket URL
const wsUrl: string = "wss://pumpportal.fun/api/data";

let mintAddress: string = "HvV9AcitrJC4Lo8Rj87RkRyruyF2fNTYy6qb6Ueipump"; //Replace with actual token mint address
let userAction: string;
// Create a WebSocket connection
const ws: WebSocket = new WebSocket(wsUrl);

// Define the payload type for better type safety
interface Payload {
  method: string;
}
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const txMode = TransactionMode.Execution; //Set to simulate to test, Execution to perform
// Function to handle the WebSocket 'open' event

// Function to handle incoming messages from the WebSocket

class Bundler {
  private mintAddress: string;
  private transactionMode: TransactionMode;

  constructor(mintAddress: string, mode: TransactionMode) {
    this.mintAddress = mintAddress;
    this.transactionMode = mode;
  }

  async main() {
    const slippageDecimal = 0.9; // Example value, adjust as needed
    const tokenBalance = 74 * 10 ** 6; // Example value, adjust as needed

    const priorityFeeInSol = 0.025; // Example value for tip 0.0001 to get faster inclusion, adjust as needed

    let customwallet = wallets;
    if (userAction === "s") {
      customwallet = wallets.reverse();
    }
    const transactions = customwallet.map(async (wallet) => {
      const unsername = wallet.username.slice(0, 6);
      try {
        if (userAction === "s") {
          // Call the buy function
          await pumpFunSell(
            this.transactionMode,
            wallet.privateKey,
            this.mintAddress,
            tokenBalance,
            priorityFeeInSol,
            slippageDecimal,
            unsername
          );
        } else {
          // Call the sell function

          await pumpFunBuy(
            this.transactionMode,
            wallet.privateKey,
            this.mintAddress,
            wallet.buyamount,
            priorityFeeInSol,
            slippageDecimal,
            unsername
          );
        }
        return;
      } catch (error) {
        console.error("Error in main function:", error);
        return;
      }
    });
    const results = await Promise.all(transactions);
    console.log("Action completed");
    if (userAction === "b") {
      holding = true;
      const sellingfast = question(
        `Type "s" to insta sell ${mintAddress}: `
      ).toLowerCase();
      if (sellingfast === "s") {
        userAction = "s";
        const bundler = new Bundler(mintAddress, txMode);
        bundler.main();
      } else {
      }
    } else {
      holding = false;
    }
  }
}

const promptAction = (): void => {
  const action = question(
    'Do you want to buy or sell? (enter "b" or "s"): '
  ).toLowerCase();

  if (action !== "b" && action !== "s") {
    console.log('Invalid action. Please enter "buy" or "sell".');
    return promptAction();
  }
  wallets.forEach((wallet) => {
    const user = wallet.username.slice(0, 6);
    console.log(`${user} : ${wallet.buyamount}`);
  });
  console.log("");
  userAction = action;
  if (action === "b") {
    promtNewPair();
  } else {
    promptSniping();
  }
};

const promtNewPair = (): void => {
  const action = question("Snipe new ticker (y or n): ").toLowerCase();

  if (action !== "y" && action !== "n") {
    console.log('Invalid action. Please enter "y" or "n".');
  }
  wallets.forEach((wallet) => {
    const user = wallet.username.slice(0, 6);
    console.log(`${user} : ${wallet.buyamount}`);
  });
  console.log("");

  if (action === "y") {
    const ticker_custom = question(
      "Type the ticker, or the address you want to snipe: "
    );
    ws.on("open", function open() {
      console.log("WebSocket connection opened");

      // Define the payload to subscribe to token creation events
      const payload: Payload = {
        method: "subscribeNewToken",
      };

      // Send the subscription message
      ws.send(JSON.stringify(payload));
    });
    // UPDATE
    ws.on("message", async function message(data: WebSocket.Data) {
      try {
        const message = JSON.parse(data.toString());

        const { mint } = message;
        const { traderPublicKey } = message;
        if (mint) {
          if (TICKERORADDRESS) {
            const coinmeta = await getCoinMeta(mint);

            const { symbol } = coinmeta.data;
            if (symbol.toLowerCase() === ticker_custom.toLowerCase()) {
              console.log("Coin Ticker found: ", symbol, "mint: ", mint);
              mintAddress = mint;
              ws.close();

              setTimeout(async () => {
                const coindata = await getCoinData(mint);
                console.log(
                  "name: ",
                  coindata.name,
                  "marketcap: ",
                  coindata.usd_market_cap
                );
                console.log(`https://pump.fun/${mint}`);
                const bundler = new Bundler(mintAddress, txMode);
                await bundler.main();
              }, DELAYPUMP);
            } else {
              console.log("Invalid ticker not the coin dev: ", symbol);
            }
          } else {
            if (traderPublicKey.toLowerCase() === ticker_custom.toLowerCase()) {
              console.log("Coin Dev found: ", traderPublicKey, "mint: ", mint);
              mintAddress = mint;
              ws.close();
              setTimeout(async () => {
                const coindata = await getCoinData(mint);
                console.log(
                  "name: ",
                  coindata.name,
                  "marketcap: ",
                  coindata.usd_market_cap
                );
                console.log(`https://pump.fun/${mint}`);
                const bundler = new Bundler(mintAddress, txMode);
                await bundler.main();
              }, DELAYPUMP);
            } else {
              console.log("Invalid ticker not the coin dev: ", traderPublicKey);
            }
          }
        } else {
          console.log(message);
        }
      } catch {}
    });
  } else {
    promptSniping();
  }
};

// Function to prompt the user for the contract address to snipe
const promptSniping = (): void => {
  const address = question("Enter the contract address to snipe: ");
  mintAddress = address;
  console.log(`Contract to snipe: ${mintAddress}`);

  const bundler = new Bundler(mintAddress, txMode);
  bundler.main();
};

// Call the functions to prompt the user
promptAction();
