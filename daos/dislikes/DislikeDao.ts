/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../../interfaces/dislikes/DislikeDaoI";
import Dislike from "../../models/dislikes/Dislike";
import DislikeModel from "../../mongoose/dislikes/DislikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {

    private static disLikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.disLikeDao === null) {
            DislikeDao.disLikeDao = new DislikeDao();
        }
        return DislikeDao.disLikeDao;
    }
    private constructor() {}

    /**
     * Counts the likes on a tuit
     * @param {string} tid Tuit id of the tuit whose count is to be fetched
     * @returns Promise To be notified when count on a tuit is returned
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});

    /**
     * Uses LikeModel to retrieve tuits liked by a user from likes collection
     * @param {string} uid User whose tuits liked are to be retrieved
     * @returns Promise To be notified with the collection of tuits  when the tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses LikeModel to retrieve users who liked a tuit from likes collection
     * @param {string} tid Tuit id whose tuits whose users who like the tuit is to be retrieved
     * @returns Promise To be notified with a collection of users who liked the tuits are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Finds if the user has liked a tuit
     * @param {string} uid userId of the user
     * @param {string} tid Tuit id of the tuit
     * @returns Promise To be notified when the user has liked the tuit
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Allows a user to like a tuit
     * @param {string} uid User id of the person liking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being liked to be inserted into the database
     * @returns Promise To be notified when the tuit being liked is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Allows a user to unlike a tuit
     * @param {string} uid User id of the person unliking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being unliked to be removed from the database
     * @returns Promise To be notified when the tuit being unliked by a user and is removed into the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

}