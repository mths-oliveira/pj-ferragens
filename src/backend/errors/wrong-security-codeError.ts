export class WrongSecurityCodeError extends Error {
  constructor() {
    super('Wrong security code');
  }
}
