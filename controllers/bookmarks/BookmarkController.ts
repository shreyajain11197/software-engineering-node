/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../../daos/bookmarks/BookmarkDao";
import BookmarkControllerI from "../../interfaces/bookmarks/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve all tuits bookmarked by the user
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid to record that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unbookmarks/:tid to record that a user
 *     no longer bookmarks a tuit</li>
 *     <li>DELETE /users/:uid/unbookmarkall to record that a user
 *     no longer bookmarks any tuit</li>
 * </ul>
 * @property {BookmarkDao} BookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.post("/users/:uid/bookmarks/tuits/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/users/:uid/unbookmarks/tuits/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.delete("/users/:uid/unbookmarkall", BookmarkController.bookmarkController.removeAllBookmarks);
            app.get("/users/:uid/bookmarks/mostrecent", BookmarkController.bookmarkController.getMostRecentBookmark);

        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
       BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid  representing the user that is unbookmarking
     * all the tuits and the tuits being bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    removeAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.removeAllBookmarks(req.params.uid)
            .then(status => res.send(status));

    /**
     * Retrieves most recently bookmarked tuit by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit object that was most recently bookmarked
     */
    getMostRecentBookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.getMostRecentBookmark(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

}