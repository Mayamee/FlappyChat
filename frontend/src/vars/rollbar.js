/* eslint-disable import/prefer-default-export */
const accessToken = process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN || '';
const environment = process.env.REACT_APP_ROLLBAR_ENVIRONMENT || 'development';

export const rollbarConfig = {
  accessToken,
  environment,
};
