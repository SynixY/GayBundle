"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = require("./src/swap");
const types_1 = require("./src/types");
const ws_1 = __importDefault(require("ws"));
const api_1 = require("./src/api");
const readline_sync_1 = require("readline-sync");
const constants_1 = require("./src/constants");
const gay = [];
let holding = false;
// Define the WebSocket URL
const wsUrl = "wss://pumpportal.fun/api/data";
let mintAddress = "HvV9AcitrJC4Lo8Rj87RkRyruyF2fNTYy6qb6Ueipump"; //Replace with actual token mint address
let userAction;
// Create a WebSocket connection
const ws = new ws_1.default(wsUrl);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const txMode = types_1.TransactionMode.Execution; //Set to simulate to test, Execution to perform
// Function to handle the WebSocket 'open' event
// Function to handle incoming messages from the WebSocket
class Bundler {
    constructor(mintAddress, mode) {
        this.mintAddress = mintAddress;
        this.transactionMode = mode;
    }
    async main() {
        const slippageDecimal = 0.9; // Example value, adjust as needed
        const tokenBalance = 74 * 10 ** 6; // Example value, adjust as needed
        const priorityFeeInSol = 0.025; // Example value for tip 0.0001 to get faster inclusion, adjust as needed
        let customwallet = constants_1.wallets;
        if (userAction === "s") {
            customwallet = constants_1.wallets.reverse();
        }
        const transactions = customwallet.map(async (wallet) => {
            const unsername = wallet.username.slice(0, 6);
            try {
                if (userAction === "s") {
                    // Call the buy function
                    await (0, swap_1.pumpFunSell)(this.transactionMode, wallet.privateKey, this.mintAddress, tokenBalance, priorityFeeInSol, slippageDecimal, unsername);
                }
                else {
                    // Call the sell function
                    await (0, swap_1.pumpFunBuy)(this.transactionMode, wallet.privateKey, this.mintAddress, wallet.buyamount, priorityFeeInSol, slippageDecimal, unsername);
                }
                return;
            }
            catch (error) {
                console.error("Error in main function:", error);
                return;
            }
        });
        const results = await Promise.all(transactions);
        console.log("Action completed");
        if (userAction === "b") {
            holding = true;
            const sellingfast = (0, readline_sync_1.question)(`Type "s" to insta sell ${mintAddress}: `).toLowerCase();
            if (sellingfast === "s") {
                userAction = "s";
                const bundler = new Bundler(mintAddress, txMode);
                bundler.main();
            }
            else {
            }
        }
        else {
            holding = false;
        }
    }
}
const promptAction = () => {
    const action = (0, readline_sync_1.question)('Do you want to buy or sell? (enter "b" or "s"): ').toLowerCase();
    if (action !== "b" && action !== "s") {
        console.log('Invalid action. Please enter "buy" or "sell".');
        return promptAction();
    }
    constants_1.wallets.forEach((wallet) => {
        const user = wallet.username.slice(0, 6);
        console.log(`${user} : ${wallet.buyamount}`);
    });
    console.log("");
    userAction = action;
    if (action === "b") {
        promtNewPair();
    }
    else {
        promptSniping();
    }
};
const promtNewPair = () => {
    const action = (0, readline_sync_1.question)("Snipe new ticker (y or n): ").toLowerCase();
    if (action !== "y" && action !== "n") {
        console.log('Invalid action. Please enter "y" or "n".');
    }
    constants_1.wallets.forEach((wallet) => {
        const user = wallet.username.slice(0, 6);
        console.log(`${user} : ${wallet.buyamount}`);
    });
    console.log("");
    if (action === "y") {
        const ticker_custom = (0, readline_sync_1.question)("Type the ticker, or the address you want to snipe: ");
        ws.on("open", function open() {
            console.log("WebSocket connection opened");
            // Define the payload to subscribe to token creation events
            const payload = {
                method: "subscribeNewToken",
            };
            // Send the subscription message
            ws.send(JSON.stringify(payload));
        });
        // UPDATE
        ws.on("message", async function message(data) {
            try {
                const message = JSON.parse(data.toString());
                const { mint } = message;
                const { traderPublicKey } = message;
                if (mint) {
                    if (constants_1.TICKERORADDRESS) {
                        const coinmeta = await (0, api_1.getCoinMeta)(mint);
                        const { symbol } = coinmeta.data;
                        if (symbol.toLowerCase() === ticker_custom.toLowerCase()) {
                            console.log("Coin Ticker found: ", symbol, "mint: ", mint);
                            mintAddress = mint;
                            ws.close();
                            setTimeout(async () => {
                                const coindata = await (0, api_1.getCoinData)(mint);
                                console.log("name: ", coindata.name, "marketcap: ", coindata.usd_market_cap);
                                console.log(`https://pump.fun/${mint}`);
                                const bundler = new Bundler(mintAddress, txMode);
                                await bundler.main();
                            }, constants_1.DELAYPUMP);
                        }
                        else {
                            console.log("Invalid ticker not the coin dev: ", symbol);
                        }
                    }
                    else {
                        if (traderPublicKey.toLowerCase() === ticker_custom.toLowerCase()) {
                            console.log("Coin Dev found: ", traderPublicKey, "mint: ", mint);
                            mintAddress = mint;
                            ws.close();
                            setTimeout(async () => {
                                const coindata = await (0, api_1.getCoinData)(mint);
                                console.log("name: ", coindata.name, "marketcap: ", coindata.usd_market_cap);
                                console.log(`https://pump.fun/${mint}`);
                                const bundler = new Bundler(mintAddress, txMode);
                                await bundler.main();
                            }, constants_1.DELAYPUMP);
                        }
                        else {
                            console.log("Invalid ticker not the coin dev: ", traderPublicKey);
                        }
                    }
                }
                else {
                    console.log(message);
                }
            }
            catch { }
        });
    }
    else {
        promptSniping();
    }
};
// Function to prompt the user for the contract address to snipe
const promptSniping = () => {
    const address = (0, readline_sync_1.question)("Enter the contract address to snipe: ");
    mintAddress = address;
    console.log(`Contract to snipe: ${mintAddress}`);
    const bundler = new Bundler(mintAddress, txMode);
    bundler.main();
};
// Call the functions to prompt the user
promptAction();
