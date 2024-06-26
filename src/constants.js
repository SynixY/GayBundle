"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = exports.SYSTEM_PROGRAM_ID = exports.PUMP_FUN_ACCOUNT = exports.PUMP_FUN_PROGRAM = exports.RENT = exports.ASSOC_TOKEN_ACC_PROG = exports.TOKEN_PROGRAM_ID = exports.FEE_RECIPIENT = exports.GLOBAL = exports.RPC = exports.DELAYPUMP = exports.MCAPMAX = exports.TICKERORADDRESS = exports.TICKER = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.TICKER = "milfy";
exports.TICKERORADDRESS = false;
exports.MCAPMAX = 9500.0;
exports.DELAYPUMP = 4000.0;
exports.RPC = "https://mainnet.helius-rpc.com/?api-key=c17ea9e6-2632-4904-8010-1f87b6717332";
exports.GLOBAL = new web3_js_1.PublicKey("4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf");
exports.FEE_RECIPIENT = new web3_js_1.PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM");
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
exports.ASSOC_TOKEN_ACC_PROG = new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
exports.RENT = new web3_js_1.PublicKey("SysvarRent111111111111111111111111111111111");
exports.PUMP_FUN_PROGRAM = new web3_js_1.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
exports.PUMP_FUN_ACCOUNT = new web3_js_1.PublicKey("Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1");
exports.SYSTEM_PROGRAM_ID = web3_js_1.SystemProgram.programId;
exports.wallets = [
    {
        privateKey: "3wGoiukJu3SjV1xoGcmgcKeheXBmyyyVjhefCpZoCov4ueo5qPXDSFMqyZk4YzyW4PE3EC3eyweyKMatwL9BmhSE",
        buyamount: 1.0,
        username: "DeoaNm9oJBeiJ3qu8Xnnhbfh6ExP2c2V3ZrtJgozT6Kp",
    },
    {
        privateKey: "5E7HTAu6aXWM8DgVyDhKvL7kUsUCDtMiknea7UepvkL6A4qfS3yXfKPNH16CP7QLHcSEJFTsJKcwzyTSHDP1QHTy",
        buyamount: 1.3,
        username: "3dMfNBgDQSyDKVLHqxdpGxEsRxwKw9VKAnV5mrMPASjd",
    },
    {
        privateKey: "33TCRnGQcVE54CwAQxcYqFcg1PceYXDQNR6YHdRzxftEkJpbihZDEhcdjj6R7tMXQHoXVo2DoeN2r4DBZ9KuXxok",
        buyamount: 2.0,
        username: "Gw6hSaUe8vAT4QGvMoWY31AYYnXSzA7jLMdMMQ5d337G",
    },
    {
        privateKey: "5yAyXAcpPA37YyGQMaxHgxQRRqHKVYLFbZH8nijFyS9pniZdvLFE3qBfbEJYV93icWjksih8zbE38zBQoLwjG5ZT",
        buyamount: 2.0,
        username: "3ay8NVjymRe9ByKrYVUaW25gf2G9EobuFD9U6d1fgAU9",
    },
];
/**
 *
 *

,
  {
    privateKey:
      "3LfC6PN8FJYyfjxpx28mawcgCfXnBnR6Ra5JPaRwdaEVLg1C8FR33hfUsemijRHwHhZE2zwaJq3sXVn2WWyptLCS",
    buyamount: 1.0,
    username: "CeUUaaJyjaszD5htvTaaFxMKjQRBnBUWrxtoGqireEhG",
  },
  {
    privateKey:
      "3XZumRmLgKXyrRNjYouHgqfps2LGqs4keM19de2acPraQMtVSJkx3T9AuiV2zytdpHZKiuEgYo7A7qL7vD5BFJx",
    buyamount: 1.3,
    username: "7KMACEQeEfwaekwjMLCc2pqjk9T9QmUTk63Af66aZdTv",
  },
  {
    privateKey:
      "3Su2v85xPsyzbqvm3nXXGeinWkrjrWVMtJz1rtboa1YKsgc41nCVj5KQX4j4wCxxUNUnLm1mYNAX8mEQe78jtmfy",
    buyamount: 1.2,
    username: "D8vHqD8WYMvGjkm3wP4LL7bhs93DhtGw5tHAsSbRk5b1",
  },
  {
    privateKey:
      "RYrPSEep5sgtJ2LWLb4vZ5NknD17U8ZsQk1u8iX6JPtqpaHeu3XEWtJuBGHrQQcBhrQmpJucQss8rsaPe4mCzNY",
    buyamount: 1.9,
    username: "ndF86EvscKiwMUT8rytUPhsmyB13GDMw6osihDXvBz4",
  },
  {
    privateKey:
      "5HfbZxh4deYtq6117EUJvfdSixzSC9Fx1FiUH7umrki1KiB7cmmAJP5bXunNPkGbiLP9EoRV94itCgeBvsfAcnFU",
    buyamount: 2.0,
    username: "BNqU7ZfXj5Fb1VhSAx9M6bARAJ4sJaf8PMLDZtLV71ce",
  },

  {
    privateKey:
      "YyhsxAV3tfiYp5GKvtQpmbm2nRVqmgUHAdHtghWrmPsbLsFYBEMxAy1zdkbXXCNBefyNvPyC8KHBDx65QtCkaCv",
    buyamount: 0.7,
    username: "5WmPv63GSawxSwE7Rf32765bu7HKXXgzyiWQXHzGsfxr",
  },
  
 


  */
/*
,
  

*/
