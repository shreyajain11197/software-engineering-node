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

            app.post("/users/:fromuid/messages/:touid", MessageController.messageController.userMessagesUser);
            app.delete("/messages/:messageid", MessageController.messageController.userDeletesMessage);
            app.get("/users/:fromuid/sentmessages", MessageController.messageController.findMessagesSentByUser);
            app.get("/users/:touid/messagesreceived", MessageController.messageController.findMessagesSentToUser);
            app.delete("/users/:uid/deletemessages", MessageController.messageController.deleteAllUserSentMessages);
            app.put("/messages/:messageid", MessageController.messageController.userEditsMessage);
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
        MessageController.messageDao.userMessagesUser(req.params.fromuid,req.params.touid, req.body.message)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is deleting the message
     * and the message being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.messageid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that were sent by the user.
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.fromuid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has received the messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing all the messages received by the user.
     */
    findMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentToUser(req.params.touid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid  representing the user who is deleting
     * all the messages he sent and the messages being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the messages sent by the user was successful or not
     */
    deleteAllUserSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllUserSentMessages(req.params.uid)
            .then(status => res.send(status));

    /**
     * Modifies an existing message
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    userEditsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userEditsMessage(req.params.messageid,req.body)
            .then(status => res.json(status));
}