/**
 * Structured logger utility.
 */
const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];

const timestamp = () => new Date().toISOString();

export const logger = {
  debug: (...args) => currentLevel <= LOG_LEVELS.debug && console.debug(`[${timestamp()}] [DEBUG]`, ...args),
  info:  (...args) => currentLevel <= LOG_LEVELS.info  && console.log(`[${timestamp()}] [INFO]`, ...args),
  warn:  (...args) => currentLevel <= LOG_LEVELS.warn  && console.warn(`[${timestamp()}] [WARN]`, ...args),
  error: (...args) => currentLevel <= LOG_LEVELS.error && console.error(`[${timestamp()}] [ERROR]`, ...args),
};
