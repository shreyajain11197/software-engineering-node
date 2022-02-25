/**
 * @file Implements mongoose schema for follows
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents the users follow users
 * @property {User} userFollowed The user who is followed by the other user
 * @property {User} userFollowing The users following another user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;