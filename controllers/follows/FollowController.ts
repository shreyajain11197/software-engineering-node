/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../../daos/follows/FollowsDao";
import FollowControllerI from "../../interfaces/follows/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/followings to retrieve all the users whom a user follows
 *     </li>
 *     <li>GET /users/:uid/followers to retrieve all users that follow a user
 *     </li>
 *     <li>POST /users/:uid/follows/:userfollowedid to record that a user follows a user
 *     </li>
 *     <li>DELETE /users/:uid/unfollows/:userfollowedid to record that a user
 *     no longer follows a user</li>
 *     </li>
 *     <li>DELETE /users/:uid/removefollowing to record that a user
 *     unfollows all other users</li>
 *      <li>DELETE /users/:uid/removefollowers to record that a user
 *     removed his followers</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();

            app.post("/users/:uid/follows/:userfollowedid", FollowController.followController.userFollowsUser);
            app.delete("/users/:uid/unfollows/:userfollowedid", FollowController.followController.userUnfollowsUser);
            app.get("/users/:uid/followers", FollowController.followController.getUserFollowerList);
            app.get("/users/:uid/following", FollowController.followController.getUserFollowingList);
            app.delete("/users/:uid/removefollowing", FollowController.followController.deleteAllUserFollowingUsers);
            app.delete("/users/:uid/removefollowers", FollowController.followController.deleteAllUserFollowers);

        }
        return FollowController.followController;
    }

    private constructor() {}


    /**
     * Retrieves all followers of a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followers
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that follow the user
     */
    getUserFollowerList(req: Request, res: Response): void {
        FollowController.followDao.getUserFollowerList(req.params.uid)
            .then(followers => res.json(followers));
    }

    /**
     * Retrieves all users followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followings
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that are followed by the user
     */
    getUserFollowingList(req: Request, res: Response): void {
        FollowController.followDao.getUserFollowingList(req.params.uid)
            .then(following => res.json(following));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userFollowedId representing the user that is following another user
     * and the other user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user being followed that was inserted in the
     * database
     */
    userFollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.userfollowedid)
            .then(follows => res.json(follows));

    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userUnfollowedId representing the user that is unfollowing
     * another user and the other user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    userUnfollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.userfollowedid)
            .then(status => res.send(status));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user who is unfollowing
     * all users and the users being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the following users was successful or not
     */
    deleteAllUserFollowingUsers (req: Request, res: Response): void {
        FollowController.followDao.deleteAllUserFollowingUsers(req.params.uid)
            .then(status => res.send(status));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user who is removing all
     * all users who follow him and the users being removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting all the following users was successful or not
     */
    deleteAllUserFollowers (req: Request, res: Response): void {
        FollowController.followDao.deleteAllUserFollowers(req.params.uid)
            .then(status => res.send(status));
    }

}