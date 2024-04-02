import { createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';

const lokiTransport = new LokiTransport({
  host: 'http://serverless-loki:3100', // Loki server address
  labels: { // Additional labels to include with each log entry
    app: 'my-serverless-app',
    environment: 'production'
  },
  format: format.combine(
    format.timestamp(),
    format.json()
  )
});

export const logger = createLogger({
  level: 'info', // Set the log level
  transports: [lokiTransport] // Use Loki transport for logging
});
