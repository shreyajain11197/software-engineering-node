/**
 * @file Interface FollowDaoI for DAO managing data storage of follows.
 */
import Follow from "../../models/follows/Follow";

/**
 * @interface FollowDaoI consisting of methods for DAO managing data storage of follows.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
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
export default interface FollowDaoI {

    /**
     * Allows a user to follow another user
     * @param {string} userId User id of the person wanting to follow another user to be inserted into the database
     * @param {string} followedUserId User id of the person being followed to be inserted into the database
     * @returns Promise To be notified when user has followed another user is inserted into the database
     */
    userFollowsUser ( userId: string, followedUserId: string): Promise<Follow>;

    /**
     * Allows a user to unfollow another user
     * @param {string} userId User id of the person wanting to unfollow another user to be removed from the database
     * @param {string} unfollowedUserId User id of the person being unfollowed to be removed from the database
     * @returns Promise To be notified when user has unfollowed another user and is removed into the database
     */
    userUnfollowsUser ( userId: string, unfollowedUserId: string): Promise<any>;

    /**
     * Uses FollowModel to retrieve followers list of a user from follows collection
     * @param {string} userId User whose followers list is to be retrieved
     * @returns Promise To be notified when the followers list of the user is retrieved from the database
     */
    getUserFollowerList (userId: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve following list of a user from follows collection
     * @param {string} userId User whose following list is to be retrieved
     * @returns Promise To be notified when the following list of the user is retrieved from the database
     */
    getUserFollowingList (userId: string): Promise<Follow[]>;

    /**
     * Allows a user to unfollow another user
     * @param {string} userId User id of the person wanting to unfollow all user to be removed from the database
     * @returns Promise To be notified when user has unfollowed all users and entries are removed from the database
     */
    deleteAllUserFollowingUsers ( userId: string): Promise<any>;

    /**
     * Allows a user to unfollow another user
     * @param {string} userId User id of the person wanting to remove all followers to be removed from the database
     * @returns Promise To be notified when user has removed  all followers and entries are removed from the database
     */
    deleteAllUserFollowers ( userId: string): Promise<any>;
};
