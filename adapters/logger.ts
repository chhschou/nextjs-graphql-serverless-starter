import pino from 'pino';
import { MakeLogger } from 'core';

const makeLogger: MakeLogger = (namespace: string) => {
  return pino({ name: namespace });
};

export { makeLogger };
