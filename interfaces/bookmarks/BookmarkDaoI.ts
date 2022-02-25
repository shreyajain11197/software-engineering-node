/**
 * @file Interface BookmarkDaoI for DAO managing data storage of bookmarks.
 */
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @interface BookmarkDaoI consisting of methods for DAO managing data storage of bookmarks.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
 * <ul>
 *     <li> user bookmarks a tuit
 *     </li>
 *     <li> User unbookmarks a tuit
 *     </li>
 *     <li>Find all tuits bookmarked by a user
 *     </li>
 * </ul>
 */
export default interface BookmarkDaoI {

    /**
     * Allows a user to bookmark a tuit
     * @param {string} uid User id of the person bookmarking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being bookmarked to be inserted into the database
     * @returns Promise To be notified when the tuit being bookmarked is inserted into the database
     */
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;

    /**
     * Allows a user to unbookmark a tuit
     * @param {string} uid User id of the person unbookmarking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being unbookmarked to be remvoed the database
     * @returns Promise To be notified when the tuit being unbookmarked is removed from the database
     */
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses BookmarkModel to retrieve users who bookmarked a tuit from bookmarks collection
     * @param {string} uid User id whose bookmarked tuits is to be retrieved
     * @returns Promise To be notified with a collection of tuits bookmarked by the user is retrieved from the database
     */
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;

    /**
     * Allows a user to unbookmark all tuit
     * @param {string} uid User id of the person unbookmarking all tuit to be removed from the database
     * @returns Promise To be notified when tall he tuits are unbookmarked and entries are removed from the database
     */
    removeAllBookmarks ( uid: string): Promise<any>;

    /**
     * Allows a user to fetch his most recent bookmarked tuit
     * @param {string} uid User id of the person whose most recent bookmarked tuit is to be retrieved from the database
     * @returns Promise To be notified when  most recent bookmarked tuit is retrieved from the database
     */
    getMostRecentBookmark ( uid: string): Promise<Bookmark[]>;
};