export const DEV = process.env.NODE_ENV !== 'production';

export const SERVER_LOCATION_HOST = DEV ? 'localhost:8002' : '104.154.190.133';
