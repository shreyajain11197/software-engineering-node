/**
 * @file Declares Like data type representing relationship between
 * users, as in user follows a tuit
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and a user,
 * as in a user follows another user.
 * @property {User} userFollowed User being followed by another user
 * @property {User} userFollowing User following another user
 */

export default interface Like {
    userFollowed: User,
    userFollowing: User
};