/**
 * @file Implements mongoose schema for likes
 */

import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents the users like tuits
 * @property {Tuit} tuit The tuit that is liked by a user
 * @property {User} likedBy The users who likes the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;