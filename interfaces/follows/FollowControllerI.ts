/**
 * @file Interface FollowControllerI for RESTful Web service API for follows resource
 */
import {Request, Response} from "express";

/**
 * @interface FollowControllerI consisting of RESTful Web service API for follows resource.
 * Defines the following use cases for HTTP endpoints:
 * <ul>
 *     <li> user follows a User
 *     </li>
 *     <li> User unfollows a User
 *     </li>
 *     <li>Find all users followed by a user
 *     </li>
 *     <li>Find all users following  a user
 *     </li>
 * </ul>
 */
export default interface FollowControllerI {

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userFollowedId representing the user that is following another user
     * and the other user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user being followed that was inserted in the
     * database
     */
    userFollowsUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userUnfollowedId representing the user that is unfollowing
     * another user and the other user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    userUnfollowsUser (req: Request, res: Response): void;

    /**
     * Retrieves all followers of a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followers
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that follow the user
     */
    getUserFollowerList (req: Request, res: Response): void;

    /**
     * Retrieves all users followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followings
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that are followed by the user
     */
    getUserFollowingList (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user who is unfollowing
     * all users and the users being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the followed users was successful or not
     */
    deleteAllUserFollowingUsers (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user who is removing all his followers
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the followers was successful or not
     */
    deleteAllUserFollowers (req: Request, res: Response): void;

};