"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinMeta = exports.getCoinData = void 0;
const axios_1 = __importDefault(require("axios"));
async function getCoinData(mintStr) {
    try {
        const url = `https://frontend-api.pump.fun/coins/${mintStr}`;
        const response = await axios_1.default.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "https://www.pump.fun/",
                Origin: "https://www.pump.fun",
                Connection: "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "If-None-Match": 'W/"43a-tWaCcS4XujSi30IFlxDCJYxkMKg"',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.error("Failed to retrieve coin data:", response.status);
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching coin data:", error);
        return null;
    }
}
exports.getCoinData = getCoinData;
async function getCoinMeta(mintStr) {
    try {
        const url = `https://pumpportal.fun/api/data/token-info?ca=${mintStr}`;
        const response = await axios_1.default.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "https://www.pump.fun/",
                Origin: "https://www.pump.fun",
                Connection: "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "If-None-Match": 'W/"43a-tWaCcS4XujSi30IFlxDCJYxkMKg"',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.error("Failed to retrieve coin data:", response.status);
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching coin data:", error);
        return null;
    }
}
exports.getCoinMeta = getCoinMeta;
