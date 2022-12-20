export class Username {
  private static readonly usernameRegrex = /^[_A-z0-9]*((-|\s)*[_A-z0-9]){10,30}$/;
  public static isValid(value: string) {
    return this.usernameRegrex.test(value);

  }
}