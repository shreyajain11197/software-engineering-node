import MessageDaoI from "../../interfaces/messages/MessageDaoI";
import MessageModel from "../../mongoose/messages/MessageModel";
import Message from "../../models/messages/Message";

export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userMessagesUser = async (from_uid: string,to_uid: string, message: Message): Promise<any> =>
        MessageModel.create( {from: from_uid,to:to_uid, message: message});

    userDeletesMessage = async ( messageid: string): Promise<any> =>
        MessageModel.deleteOne({_id: messageid});

    findMessagesSentByUser = async (from_uid: string): Promise<any> =>
        MessageModel.find({from: from_uid});

    findMessagesSentToUser = async (to_uid: string): Promise<any> =>
        MessageModel.find({to: to_uid});

}