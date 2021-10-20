export class WrongPasswordError extends Error {
  constructor() {
    super('Password is incorrect');
  }
}
