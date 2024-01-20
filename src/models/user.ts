import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  profilePicture: string;
  // Add other personal details as needed
}

const userSchema: Schema<User> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String },
  // Define other personal details fields here
});
const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;
