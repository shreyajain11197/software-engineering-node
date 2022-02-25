/**
 * @file Interface BookmarkControllerI for RESTful Web service API for bookmarks resource
 */
import {Request, Response} from "express";

/**
 * @interface BookmarkControllerI consisting of RESTful Web service API for bookmark resource.
 * Defines the following use cases for HTTP endpoints:
 * <ul>
 *     <li> user bookmarks a tuit
 *     </li>
 *     <li> User unbookmarks a tuit
 *     </li>
 *     <li>Find all tuits bookmarked by a user
 *     </li>
 * </ul>
 */
export default interface BookmarkControllerI {

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnbookmarksTuit (req: Request, res: Response): void;

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid  representing the user that is unbookmarking
     * all the tuits and the tuits being bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    removeAllBookmarks (req: Request, res: Response): void;

    /**
     * Retrieves most recently bookmarked tuit by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit object that was most recently bookmarked
     */
    getMostRecentBookmark (req: Request, res: Response): void;

};