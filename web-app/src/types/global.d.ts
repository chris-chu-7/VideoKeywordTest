export {};

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
