export const LogLevelConst = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  VERBOSE: 'verbose',
} as const;

export type LogLevel = typeof LogLevelConst[keyof typeof LogLevelConst];
