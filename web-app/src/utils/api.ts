import { SERVER_LOCATION_HOST } from 'constants/index';
import { Configuration, DefaultApiFactory } from 'openapi';

export const api = DefaultApiFactory(
  new Configuration({ basePath: `http://${SERVER_LOCATION_HOST}` }),
);
