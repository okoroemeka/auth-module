import jwt from 'jsonwebtoken'

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

export const createLead = async (payload: Record<string, any>) => await  fetch("https://sensation--crewlavany.sandbox.my.salesforce.com/services/data/v50.0/sobjects/Lead/", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: "follow"
})

export const generateToken = (userId: number): string => {
    // @ts-ignore
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }) // Token expires in 1 hour
}

const verifyToken = (token: string): string | object => {
    // @ts-ignore
    return jwt.verify(token, process.env.JWT_SECRET)
}