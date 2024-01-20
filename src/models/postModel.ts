import mongoose, { Document, Schema } from 'mongoose';

export interface Post extends Document {
  userID: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

const postSchema: Schema<Post> = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const PostModel = mongoose.model<Post>('Post', postSchema);

export default PostModel;
