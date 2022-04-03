/**
 * @file Interface DislikeControllerI for RESTful Web service API for dislikes resource
 */
import {Request, Response} from "express";

/**
 * @interface DislikeControllerI consisting of RESTful Web service API for dislikes resource.
 * Defines the following use cases for HTTP endpoints:
 * <ul>
 *     <li> user dislikes a tuit
 *     </li>
 *     <li> User undislikes a tuit
 *     </li>
 *     <li>Find all users that dislike a tuit
 *     </li>
 *     <li>Find all tuits disliked by a user
 *     </li>
 * </ul>
 */
export default interface DislikeControllerI {

    /**
     * Retrieves all users that disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were disliked
     */
    findAllTuitsDislikedByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userTogglesTuitDislikes (req: Request, res: Response): void;

};