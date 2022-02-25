/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../../interfaces/bookmarks/BookmarkDaoI";
import Bookmark from "../../models/bookmarks/Bookmark";
import BookmarkModel from "../../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Allows a user to bookmark a tuit
     * @param {string} uid User id of the person bookmarking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being bookmarked to be inserted into the database
     * @returns Promise To be notified when the tuit being bookmarked is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Allows a user to unbookmark a tuit
     * @param {string} uid User id of the person unbookmarking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being unbookmarked to be remvoed the database
     * @returns Promise To be notified when the tuit being unbookmarked is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Uses BookmarkModel to retrieve users who bookmarked a tuit from bookmarks collection
     * @param {string} uid User id whose bookmarked tuits is to be retrieved
     * @returns Promise To be notified with a collection of tuits bookmarked by the user is retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Allows a user to unbookmark all tuit
     * @param {string} uid User id of the person unbookmarking all tuit to be removed from the database
     * @returns Promise To be notified when all the tuits are unbookmarked and entries are removed from the database
     */
    removeAllBookmarks = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({ bookmarkedBy: uid});

    /**
     * Allows a user to fetch his most recent bookmarked tuit
     * @param {string} uid User id of the person whose most recent bookmarked tuit is to be retrieved from the database
     * @returns Promise To be notified when  most recent bookmarked tuit is retrieved from the database
     */
    getMostRecentBookmark = async (uid: string): Promise<any> =>
        BookmarkModel.find({bookmarkedBy: uid}).sort({bookmarkDate: -1}).limit(1)
            .populate("bookmarkedTuit")
            .exec();
}