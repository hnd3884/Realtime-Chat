import mongoose from '../../DbConnection/MongoConnection';
import { ObjectID } from 'mongodb';

const userSchema = new mongoose.Schema({
  _id: ObjectID,
  username: String,
  password: String,
})

export const User = mongoose.model('users', userSchema);