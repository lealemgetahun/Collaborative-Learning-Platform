import mongoose from 'mongoose';
import options from '../../config';

export const connect = async (url = options.dbUrl) => {
  mongoose.set('strictQuery', false);
  return await mongoose
    .connect(url)
    .then(() => console.log('mongodb is connected'))
    .catch((err) => console.log(err));
};
