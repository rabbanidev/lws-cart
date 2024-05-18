const envConfig = {
  client_uri:
    process.env.NODE_ENV !== 'production'
      ? process.env.CLIENT_URL_DEV
      : process.env.CLIENT_URL_PRODUCTION,
  mongo_uri: process.env.MONGO_URI,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  auth: {
    secret: process.env.AUTH_SECRET,
  },
};

export default envConfig;
