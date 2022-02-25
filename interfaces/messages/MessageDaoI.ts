/**
 * @file Declares API for MessageDao related data access object methods
 */
import Message from "../../models/messages/Message";

/**
 * @interface MessageDaoI  Defines the following use CRUD operations for the provided HTTP endpoints:
 * <ul>
 *     <li> user messages a user
 *     </li>
 *     <li> User deletes a message
 *     </li>
 *     <li>Find all messages sent by a user
 *     </li>
 *     <li>Find all messages received by a user
 *     </li>
 * </ul>
 */
export default interface MessageDaoI {

    /**
     * Allows a user to send messages to another user
     * @param {string} from_uid User id of the person sending the message to be inserted into the database
     * @param {string} to_user User id of the person receiving the message to be inserted into the database
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser ( from_uid: string,to_user: string, message: Message): Promise<Message>;

    /**
     * Removes message from the database.
     * @param {string} message_id Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage ( message_id: String): Promise<any>;

    /**
     * Uses MessageModel to retrieve messages sent by a user from messages collection
     * @param {string} username User whose messages sent are to be retrieved
     * @returns Promise To be notified when the messages sent by the user are retrieved from the database
     */
    findMessagesSentByUser( username: string): Promise<Message[]>;

    /**
     * Uses MessageModel to retrieve messages sent to a user from messages collection
     * @param {string} username User whose messages received are to be retrieved
     * @returns Promise To be notified when the messages received by the user are retrieved from the database
     */
    findMessagesSentToUser( username: string) : Promise<Message[]>;

    /**
     * Removes message from the database.
     * @param {string} user_id Primary key of user whose sent messages is to be removed
     * @returns Promise To be notified when messages are removed from the database
     */
    deleteAllUserSentMessages ( user_id: String): Promise<any>;

    /**
     * Updates message with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {Message} message User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    userEditsMessage(uid: string, message: Message): Promise<any>;

};