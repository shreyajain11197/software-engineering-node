/**
 * @file Implements mongoose schema for messages
 */

import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents the users messaging other users
 * @property {String} message The message in the form of a string
 * @property {User} to The users who sends the message
 * @property {User} from The users who receives the message
 * @property {Date} sentOn The date when the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date,  default: Date.now}
}, {collection: "messages"});
export default MessageSchema;