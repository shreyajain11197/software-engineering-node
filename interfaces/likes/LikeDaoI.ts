/**
 * @file Interface LikeDaoI with methods for DAO managing data storage of likes.
 */
import Like from "../../models/likes/Like";

/**
 * @class LikeDaoI onsisting of methods for DAO managing data storage of likes.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
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
export default interface LikeDaoI {

    /**
     * Uses LikeModel to retrieve users who liked a tuit from likes collection
     * @param {string} tid Tuit id whose tuits whose users who like the tuit is to be retrieved
     * @returns Promise To be notified with a collection of users who liked the tuits are retrieved from the database
     */
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;

    /**
     * Uses LikeModel to retrieve tuits liked by a user from likes collection
     * @param {string} uid User whose tuits liked are to be retrieved
     * @returns Promise To be notified with the collection of tuits  when the tuits are retrieved from the database
     */
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Allows a user to unlike a tuit
     * @param {string} uid User id of the person unliking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being unliked to be removed from the database
     * @returns Promise To be notified when the tuit being unliked by a user and is removed into the database
     */
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Allows a user to like a tuit
     * @param {string} uid User id of the person liking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being liked to be inserted into the database
     * @returns Promise To be notified when the tuit being liked is inserted into the database
     */
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};