import * as Sentry from '@sentry/node';

export const initSentry = () => {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn) {
    console.info('[Sentry] No SENTRY_DSN provided. Server-side error tracking is disabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  });

  console.log('[Sentry] Backend error tracking initialized successfully.');
};

export { Sentry };
