import mongoose from '../../DbConnection/MongoConnection';

const messageSchema = new mongoose.Schema({
  message: String,
  time: Date,
  author: String,
  username: String
})

export const Message = mongoose.model('messages', messageSchema);