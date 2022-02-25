import Message from "../../models/messages/Message";
import Tuit from "../../models/tuits/Tuit";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface MessageDaoI {

    userMessagesUser ( from_uid: string,to_user: string, message: Message): Promise<Message>;
    userDeletesMessage ( message_id: String): Promise<any>;
    findMessagesSentByUser( username: string): Promise<Message[]>;
    findMessagesSentToUser( username: string) : Promise<Message[]>;

};