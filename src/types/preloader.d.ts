export {};

declare global {
  interface Window {
    hasPreloaderCompleted?: boolean;
    hasPreloaderDissolveStarted?: boolean;
  }
}
