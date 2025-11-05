const winston = require('winston');
const path = require('path');

const logDir = path.join(__dirname, '..','..', 'logs');

const logFile = path.join(logDir, 'runtime.log');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    ({ level, message, timestamp, stack }) => {
      const errDetail = stack ? `\n${stack}` : '';
      return `[${timestamp}] [${level.toUpperCase}] [${message}]${errDetail}`;
    }
  )
);

// create logger instance
const logger = winston.createLogger({
    // Global log level: only logs of 'error' level and above will be processed
    level: 'error', 
    format: logFormat,
    transports: [
        // 3. Save error if happen to runtime.log file (File Transport)
        new winston.transports.File({ 
            filename: logFile, 
            maxsize: 5242880, // 5MB (optional)
            maxFiles: 5,      // keeps up to 5 files (optional)
        }),
    ],
    // ExitOnError: false prevents the application from crashing on a logging error.
    exitOnError: false, 
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'error', // Only show errors in console
    }));
}

module.exports = logger;