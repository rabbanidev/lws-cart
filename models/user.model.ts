import mongoose, { Schema } from 'mongoose';
import { User as IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User ?? mongoose.model<IUser>('User', userSchema);

export default User;
