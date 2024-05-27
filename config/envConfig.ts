const envConfig = {
  client_uri:
    process.env.NODE_ENV !== 'production'
      ? process.env.CLIENT_URL_DEV
      : process.env.CLIENT_URL_PRODUCTION,
  mongo_uri: process.env.MONGO_URI,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  auth: {
    secret: process.env.AUTH_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
    redresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRE_IN,
  },
};

export default envConfig;
