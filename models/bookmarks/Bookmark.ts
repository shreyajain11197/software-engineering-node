/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents likes relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} tuit Tuit being bookmarked
 * @property {User} likedBy User bookmarks the tuit
 * @property {Date} bookmarkDate Date when the tuit was bookmarked
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User,
    bookmarkDate: Date
};