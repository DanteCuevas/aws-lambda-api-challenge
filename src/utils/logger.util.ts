import { createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';
import 'dotenv/config'

const lokiTransport = new LokiTransport({
  host: process.env.LOKI_URL as string,
  labels: {
    app: 'my-serverless-app',
    environment: 'production'
  },
  format: format.combine(
    format.timestamp(),
    format.json()
  )
});

export const cleanup = () => {
  if (lokiTransport.close) {
    lokiTransport.close();
  }
};

export const logger = createLogger({
  level: 'info',
  transports: [lokiTransport]
});
