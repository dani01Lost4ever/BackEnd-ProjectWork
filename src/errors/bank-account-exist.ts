export class BankAccountExistsError extends Error {
  constructor() {
    super();
    this.name = "BankAccountExists";
    this.message = "bank account already in use";
  }
}
