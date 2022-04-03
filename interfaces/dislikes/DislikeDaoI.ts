/**
 * @file Interface DislikeDaoI with methods for DAO managing data storage of dislikes.
 */


import Dislike from "../../models/dislikes/Dislike";

/**
 * @class LikeDaoI consisting of methods for DAO managing data storage of dislikes.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
 * <ul>
 *     <li> user dislikes a tuit
 *     </li>
 *     <li> User undislikes a tuit
 *     </li>
 *     <li>Find all users that dislike a tuit
 *     </li>
 *     <li>Find all tuits dislikes by a user
 *     </li>
 * </ul>
 */
export default interface DislikeDaoI {

    /**
     * Uses DislikeModel to retrieve users who disliked a tuit from likes collection
     * @param {string} tid Tuit id whose tuits whose users who dislike the tuit is to be retrieved
     * @returns Promise To be notified with a collection of users who disliked the tuits are retrieved from the database
     */
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;

    /**
     * Uses DislikeModel to retrieve tuits disliked by a user from dislikes collection
     * @param {string} uid User whose tuits disliked are to be retrieved
     * @returns Promise To be notified with the collection of tuits when the tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;

    /**
     * Allows a user to undislike a tuit
     * @param {string} uid User id of the person undisliking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being undisliked to be removed from the database
     * @returns Promise To be notified when the tuit being undisliked by a user and is removed into the database
     */
    userUndislikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Allows a user to dislike a tuit
     * @param {string} uid User id of the person disliking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being disliked to be inserted into the database
     * @returns Promise To be notified when the tuit being disliked is inserted into the database
     */
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;

    /**
     * Finds if the user has disliked a tuit
     * @param {string} uid userId of the user
     * @param {string} tid Tuit id of the tuit
     * @returns Promise To be notified when the user has disliked the tuit
     */
    findUserDislikesTuit (uid: string, tid: string): Promise<any>;

    /**
     * Counts the dislikes on a tuit
     * @param {string} tid Tuit id of the tuit whose count is to be fetched
     * @returns Promise To be notified when count on a tuit is returned
     */
    countHowManyDislikedTuit (tid: string): Promise<any>;
};