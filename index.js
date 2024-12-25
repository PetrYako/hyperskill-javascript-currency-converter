const {exit} = require("process");
const input = require("sync-input");

const exchangeRates = {
    USD: 1.0,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75
};

const greeting = () => {
    console.log("Welcome to Currency Converter!");
}

const printExchangeRates = () => {
    Object.entries(exchangeRates).forEach(([key, value]) => {
        console.log(`1 USD equals ${value} ${key}`);
    });
};

const menu = () => {
    console.log("What do you want to do?");
    console.log("1-Convert currencies 2-Exit program");
    const command = input();
    if (command !== "1" && command !== "2") {
        console.log("Unknown input");
    }
    switch (command) {
        case "1":
            convertCurrency();
            break;
        case "2":
            console.log("Have a nice day!");
            exit(0);
            break;
    }
}

const convertCurrency = () => {
    console.log("What do you want to convert?");
    const currencyFrom = input("From: ").toUpperCase();

    if (!exchangeRates[currencyFrom]) {
        console.log("Unknown currency");
        return;
    }

    const currencyTo = input("To: ").toUpperCase();

    if (!exchangeRates[currencyTo]) {
        console.log("Unknown currency");
        return;
    }

    const amount = Number(input("Amount: "));

    if (isNaN(amount)) {
        console.log("The amount has to be a number");
        return;
    }

    if (amount <= 0) {
        console.log("The amount cannot be less than 1");
        return;
    }

    const fromUSDAmount = amount / exchangeRates[currencyFrom];
    const toRate = exchangeRates[currencyTo];
    const result = fromUSDAmount * toRate;

    console.log(`Result: ${amount} ${currencyFrom} equals ${result.toFixed(4)} ${currencyTo}`);
}

greeting();
printExchangeRates();
while (true) {
    menu();
}