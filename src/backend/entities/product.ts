export class Product {
  private static readonly _MIN_AMOUNT = 1;

  constructor(
    public readonly ref: string,
    public readonly name: string,
    public readonly description: string,
    public readonly image: string,
    public readonly price: number,
    public readonly isDisabled: boolean,
    private _amount = Product._MIN_AMOUNT
  ) {}

  get amount() {
    return this._amount;
  }

  set amount(amount: number) {
    if (amount < Product._MIN_AMOUNT) {
      amount = Product._MIN_AMOUNT;
    }
    this._amount = amount;
  }

  get subtotal() {
    return this.price * this.amount;
  }
}
