/**
 * @file Declares API for MessageController Rest API related methods
 */
import {Request, Response} from "express";

/**
 * @interface MessageControllerI Declares API for MessageDao related data access object methods
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
export default interface MessageControllerI {

    /**
     * @param {Request} req Represents request from client,
     * representing the user that is messaging another user
     * and the other user receiving the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userMessagesUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is deleting the message
     * and the message being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that were sent by the user.
     */
    findMessagesSentByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user who has received the messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing all the messages received by the user.
     */
    findMessagesSentToUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid  representing the user who is deleting
     * all the messages he sent and the messages being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the messages sent by the user was successful or not
     */
    deleteAllUserSentMessages (req: Request, res: Response): void;

    /**
     * Modifies an existing message
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    userEditsMessage (req: Request, res: Response): void;
};