declare namespace jasmine {
  interface Matchers<T> {
    toHaveText(actual: any, expectationFailOutput?: any): any;
  }
}
