export class PhoneNumber {
  private static readonly phoneNumberRegrex = /^[0-9]*$/;
  public static isValid(value: string) {
    return this.phoneNumberRegrex.test(value);
  }
}