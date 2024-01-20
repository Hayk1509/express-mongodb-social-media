import mongoose, { Document, Schema } from 'mongoose';

export interface Image extends Document {
  userID: mongoose.Types.ObjectId;
  imagePath: string;
  description: string;
  timestamp: Date;
}

const imageSchema: Schema<Image> = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ImageModel = mongoose.model<Image>('Image', imageSchema);

export default ImageModel;
