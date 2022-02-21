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

    userMessagesUser = async (message: Message): Promise<any> =>
        MessageModel.create(message);

    userDeletesMessage = async (uid: string): Promise<any> =>
        MessageModel.deleteOne({from: uid});

    findMessagesSentByUser = async (uid: string) : Promise<any> =>
        MessageModel.find({from: uid});

    findMessagesSentToUser = async (uid: string) : Promise<any> =>
        MessageModel.find({to: uid});

}