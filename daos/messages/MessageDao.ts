/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../../interfaces/messages/MessageDaoI";
import MessageModel from "../../mongoose/messages/MessageModel";
import Message from "../../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of UserDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Allows a user to send messages to another user
     * @param {string} from_uid User id of the person sending the message to be inserted into the database
     * @param {string} to_uid User id of the person receiving the message to be inserted into the database
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (from_uid: string,to_uid: string, message: Message): Promise<any> =>
        MessageModel.create( {from: from_uid,to:to_uid, message: message});

    /**
     * Removes message from the database.
     * @param {string} messageid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async ( messageid: string): Promise<any> =>
        MessageModel.deleteOne({_id: messageid});

    /**
     * Uses MessageModel to retrieve messages sent by a user from messages collection
     * @param {string} from_uid User whose messages sent are to be retrieved
     * @returns Promise To be notified when the messages sent by the user are retrieved from the database
     */
    findMessagesSentByUser = async (from_uid: string): Promise<any> =>
        MessageModel.find({from: from_uid});

    /**
     * Uses MessageModel to retrieve messages sent to a user from messages collection
     * @param {string} to_uid User whose messages received are to be retrieved
     * @returns Promise To be notified when the messages received by the user are retrieved from the database
     */
    findMessagesSentToUser = async (to_uid: string): Promise<any> =>
        MessageModel.find({to: to_uid});

    /**
     * Removes message from the database.
     * @param {string} user_id Primary key of user whose sent messages is to be removed
     * @returns Promise To be notified when messages are removed from the database
     */
    deleteAllUserSentMessages = async ( user_id: string): Promise<any> =>
        MessageModel.deleteMany({from: user_id});

    /**
     * Updates message with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {Message} message User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    userEditsMessage = async (uid: string, message: Message): Promise<any> =>
         MessageModel.updateOne({_id: uid}, {$set: message});

}