import path from 'path';

export const camelToSnakeCase = (str: string): string =>
  `${str.charAt(0).toLowerCase()}${str.slice(1)}`.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );

export const camelToLineCase = (str: string): string =>
  `${str.charAt(0).toLowerCase()}${str.slice(1)}`.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`
  );

export const toInt = (v: unknown, def = 0): number => {
  switch (typeof v) {
    case 'string':
      return parseInt(v, 0);
    case 'number':
      return parseInt(`${v}`, 0);
    default:
      return def;
  }
};

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

export function isArray(value: unknown): boolean {
  return value instanceof Array;
}
/**
 * Get pm2 path
 * @param defaultPath
 */
export function envPath(defaultPath?: string): string {
  const envFile = process.env.FILE_ENV
    ? process.env.FILE_ENV
    : process.env.NODE_ENV === 'production'
    ? '.env'
    : '.env.dev';

  const envPath = defaultPath
    ? path.resolve(__dirname, defaultPath, envFile)
    : process.env.pm_cwd && process.env.cwd
    ? path.resolve(process.env.pm_cwd.replace(process.env.cwd, ''), envFile)
    : process.env.INIT_CWD
    ? path.resolve(process.env.INIT_CWD, envFile)
    : path.resolve(envFile);

  console.log('');
  console.log('Load enviroment file: %s', envFile);
  console.log('');
  return envPath;
}
