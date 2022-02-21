/**
 * @file Controller RESTful Web service API for Messages resource
 */
import MessageControllerI from "../../interfaces/messages/MessageControllerI";
import {Express, Request, Response} from "express";
import MessageDao from "../../daos/messages/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:touserid/messagesreceived to retrieve all the messages received by a user
 *     </li>
 *     <li>GET /users/:fromuserid/sentmessages to retrieve all the messages sent by a user
 *     </li>
 *     <li>POST /users/messages to record that a user messages another user
 *     </li>
 *     <li>DELETE /users/:fromuserid/messages/:messageid to record that a user
 *     deleted the message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/users/messages", MessageController.messageController.userMessagesUser);
            app.delete("/users/:fromuserid/messages/:messageid", MessageController.messageController.userDeletesMessage);
            app.get("/users/:fromuserid/sentmessages", MessageController.messageController.findMessagesSentByUser);
            app.get("/users/:touserid/messagesreceived", MessageController.messageController.findMessagesSentToUser);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client,
     * representing the user that is messaging another user
     * and the other user receiving the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.body)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is deleting the message
     * and the message being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that were sent by the user.
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.fromuserid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has received the messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing all the messages received by the user.
     */
    findMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentToUser(req.params.touserid)
            .then(messages => res.json(messages));
}