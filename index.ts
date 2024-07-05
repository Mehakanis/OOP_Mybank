#! /usr/bin/env node
import inquirer from "inquirer";

//Bank account interface

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void; //amount is a input
  deposit(amount: number): void;
  checkBalance(): void;
}

//Bank Account Class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    //initializes class objects
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  // Debit Money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`
      );
    } else {
      console.log("insufficient balance.");
    }
  }
  // Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee charged if more than $100 is deposited
      this.balance += amount;
      console.log(
        `Deposit of $${amount} succesful. Remaining balance: $${this.balance}`
      );
    }
  }
  // Check Balance

  checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
  }
}
// create customers class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}
// Create bank accounts

const accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 1000),
  new BankAccount(1003, 2000),
];

// create customers
const customers: Customer[] = [
  new Customer("Hamza", "Khan", "Male", 25, 3247382474, accounts[0]),
  new Customer("Mehak", "Anis", "Female", 20, 3167382474, accounts[1]),
  new Customer("Ahmed", "Shah", "Male", 35, 3337382474, accounts[2]),
];

// function to interact with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "AccountNumber",
      type: "number",
      message: "Enter your account number",
    });
    const Customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.AccountNumber
    );
    if (Customer) {
      console.log(`Welcome, ${Customer.firstName} ${Customer.lastName} !\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an operation",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);
      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "input",
            message: "Enter the amount to deposit:",
          });
          Customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "input",
            message: "Enter the amount to withdraw:",
          });
          Customer.account.withdraw(withdrawAmount.amount);
          break;
        case "Check Balance":
          Customer.account.checkBalance();
          break;
        case "Exit":
          console.log("Exiting bank program...");
          console.log(
            "\n Thank you for using our bank services. Have a good day"
          );
          return; // ye exit ko do while loop se bahir le jayega.
      }
    } else {
      console.log("Invalid account number. Please try again.");
    }
  } while (true);
}
service();
