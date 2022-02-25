/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../../interfaces/follows/FollowDaoI";
import FollowModel from "../../mongoose/follows/FollowModel";
import Follow from "../../models/follows/Follow";

/**
 * @class FollowsDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowsDao} followDao Private single instance of FollowsDao
 */
export default class FollowsDao implements FollowDaoI {

    private static followDao: FollowsDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowsDao
     */
    public static getInstance = (): FollowsDao => {
        if (FollowsDao.followDao === null) {
            FollowsDao.followDao = new FollowsDao();
        }
        return FollowsDao.followDao;
    }

    private constructor() {
    }

    /**
     * Allows a user to follow another user
     * @param {string} uid User id of the person wanting to follow another user to be inserted into the database
     * @param {string} userFollowedId User id of the person being followed to be inserted into the database
     * @returns Promise To be notified when user has followed another user is inserted into the database
     */
    userFollowsUser = async (uid: string, userFollowedId: string): Promise<any> =>
        FollowModel.create({userFollowed: uid, userFollowing: userFollowedId});

    /**
     * Allows a user to unfollow another user
     * @param {string} uid User id of the person wanting to unfollow another user to be removed from the database
     * @param {string} userFollowedId User id of the person being unfollowed to be removed from the database
     * @returns Promise To be notified when user has unfollowed another user and is removed into the database
     */
    userUnfollowsUser = async (uid: string, userFollowedId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: userFollowedId});

    /**
     * Uses FollowModel to retrieve following list of a user from follows collection
     * @param {string} uid User whose following list is to be retrieved
     * @returns Promise To be notified when the following list of the user is retrieved from the database
     */
    getUserFollowingList = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve followers list of a user from follows collection
     * @param {string} userId User whose followers list is to be retrieved
     * @returns Promise To be notified when the followers list of the user is retrieved from the database
     */
    getUserFollowerList = async (userId: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: userId})
            .populate("userFollowed")
            .exec();

    /**
     * Allows a user to unfollow another user
     * @param {string} userId User id of the person wanting to unfollow all user to be removed from the database
     * @returns Promise To be notified when user has unfollowed all users and entries are removed from the database
     */
    deleteAllUserFollowingUsers = async (userId: string): Promise<any> =>
        FollowModel.deleteMany({userFollowed: userId});

    /**
     * Allows a user to unfollow another user
     * @param {string} userId User id of the person wanting to remove all users who follow him to be removed from the database
     * @returns Promise To be notified when user has removed all follower users and entries are removed from the database
     */
    deleteAllUserFollowers = async (userId: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: userId});
}