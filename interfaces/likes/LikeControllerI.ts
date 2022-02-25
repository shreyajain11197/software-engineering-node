/**
 * @file Interface LikeControllerI for RESTful Web service API for likes resource
 */
import {Request, Response} from "express";

/**
 * @interface LikeControllerI consisting of RESTful Web service API for likes resource.
 * Defines the following use cases for HTTP endpoints:
 * <ul>
 *     <li> user likes a tuit
 *     </li>
 *     <li> User unlikes a tuit
 *     </li>
 *     <li>Find all users that like a tuit
 *     </li>
 *     <li>Find all tuits likes by a user
 *     </li>
 * </ul>
 */
export default interface LikeControllerI {

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit (req: Request, res: Response): void;

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit (req: Request, res: Response): void;
};