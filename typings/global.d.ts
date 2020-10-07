declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSpecificSnapshot(path?: string): R;
    }
  }
}
export {};
