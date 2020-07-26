import mongoose from '../../DbConnection/MongoConnection';

const messageSchema = new mongoose.Schema({
  message: String,
  time: Date,
  authorId: String,
  username: String
})

export const Message = mongoose.model('messages', messageSchema);