import mongoose from 'mongoose';
import envConfig from './envConfig';

const MONGO_URI = envConfig.mongo_uri;

const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};

const dbConnect = async (): Promise<typeof mongoose> => {
  if (!MONGO_URI) {
    throw new Error(
      'Please define the MONGO_URI environment variable inside .env',
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
  } catch (err) {
    cached.promise = undefined;
    throw err;
  }
  return cached.connection;
};

export default dbConnect;
