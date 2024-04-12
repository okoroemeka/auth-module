"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.createLead = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer 00D9Z000002D2MD!AQEAQOw.Wi9RXttNqp2S9McBTs75G_iI4tlknLCeZ1iH36YX1s0FjL2uAm2T7U.lDH1nPcXE8oZaFtwjnpODsLMWC5V9v7mj");
myHeaders.append("Cookie", "BrowserId=upgpk_gVEe6bNaEAN3K2uQ; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1");
const raw = JSON.stringify({
    "FirstName": "john",
    "LastName": "doe",
    "Email": "doe@gmail.com",
    "Phone": "12342567",
    "Gender__c": "Male",
    "Market__c": "tourlane.de",
    "Destination__c": "italy",
    "leadsource": "Appointment"
});
const createLead = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch("https://sensation--crewlavany.sandbox.my.salesforce.com/services/data/v50.0/sobjects/Lead/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    });
});
exports.createLead = createLead;
const generateToken = (userId) => {
    // @ts-ignore
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    // @ts-ignore
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
