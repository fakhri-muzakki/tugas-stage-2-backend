import { type StringValue } from 'ms';

const required = <T = string>(key: string): T => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`❌ Environment variable ${key} belum di set`);
  }

  return value as T;
};

const env = {
  baseUrl: required('BASE_URL'),
  nodeEnv: required('NODE_ENV'),
  databaseUrl: required('DATABASE_URL'),

  accessTokenSecret: required('ACCESS_TOKEN_SECRET'),
  //   refreshTokenSecret: required('REFRESH_TOKEN_SECRET'),

  accessTokenExpired: required<StringValue>('ACCESS_TOKEN_EXPIRES_IN'),
  //   refreshTokenExpired: required<StringValue>('REFRESH_TOKEN_EXPIRES_IN'),
};

export default env;
