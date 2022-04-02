/**
 * @file Implements mongoose schema for likes
 */

import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef Dislike Represents the users dislike tuits
 * @property {Tuit} tuit The tuit that is disliked by a user
 * @property {User} dislikedBy The users who dislikes the tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;