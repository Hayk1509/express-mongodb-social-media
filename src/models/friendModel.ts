import mongoose, { Document, Schema } from 'mongoose';

export interface Friend extends Document {
  userID1: mongoose.Types.ObjectId;
  userID2: mongoose.Types.ObjectId;
  status: string;
  timestamp: Date;
}

const friendSchema: Schema<Friend> = new Schema({
  userID1: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  userID2: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const FriendModel = mongoose.model<Friend>('Friend', friendSchema);

export default FriendModel;
