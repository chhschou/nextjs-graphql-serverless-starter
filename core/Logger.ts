export interface Logger {
  debug: (data: string) => void;
  info: (data: string) => void;
  error: (err: Error | string) => void;
}

export type MakeLogger = (namespace: string) => Logger;
