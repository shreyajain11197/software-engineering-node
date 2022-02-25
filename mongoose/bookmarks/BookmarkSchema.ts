/**
 * @file Implements mongoose schema for bookmarks
 */

import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents the tuits bookmarked by users
 * @property {Tuit} bookmarkedTuit The tuit bookmarked
 * @property {User} bookmarkedBy The users that bookmarked the tuit
 * @property {Date} bookmarkDate The date bookmarked
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    bookmarkDate: {type: Date,  default: Date.now}
}, {collection: "bookmarks"});
export default BookmarkSchema;