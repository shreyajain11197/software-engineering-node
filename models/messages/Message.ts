/**
 * @file Declares Like data type representing relationship between
 * users, as in user messages another user.
 */
import User from "../users/User";

/**
 * @typedef Message Represents likes relationship between a users,
 * as in a user messages another user
 * @property {String} message that a user wants to send
 * @property {User} to User to whom the message is to be sent
 * @property {User} from User who is sender of the message
 * @property {Date} sentOn the date when the message was sent
 */

export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn: Date
};