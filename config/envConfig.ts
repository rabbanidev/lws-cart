const envConfig = {
  client_uri:
    process.env.NODE_ENV !== 'production'
      ? process.env.CLIENT_URL_DEV
      : process.env.CLIENT_URL_PRODUCTION,

  client_url_public: process.env.NEXT_PUBLIC_CLIENT_URL,
  mongo_uri: process.env.MONGO_URI,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  auth: {
    secret: process.env.AUTH_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
    facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
    redresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRE_IN,
  },
  access_gmail: process.env.ACCESS_GMAIL,
  access_gmail_pass: process.env.ACCESS_GMAIL_PASS,
};

export default envConfig;
