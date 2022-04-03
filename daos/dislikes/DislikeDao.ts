/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../../interfaces/dislikes/DislikeDaoI";
import Dislike from "../../models/dislikes/Dislike";
import DislikeModel from "../../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {DislikeDao} disLikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {

    private static disLikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.disLikeDao === null) {
            DislikeDao.disLikeDao = new DislikeDao();
        }
        return DislikeDao.disLikeDao;
    }
    private constructor() {}

    /**
     * Counts the dislikes on a tuit
     * @param {string} tid Tuit id of the tuit whose count is to be fetched
     * @returns Promise To be notified when count on a tuit is returned
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});

    /**
     * Uses DislikeModel to retrieve tuits disliked by a user from dislikes collection
     * @param {string} uid User whose tuits disliked are to be retrieved
     * @returns Promise To be notified with the collection of tuits when the tuits are retrieved from the database
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
     * Uses DislikeModel to retrieve users who disliked a tuit from dislikes collection
     * @param {string} tid Tuit id whose tuits whose users who dislike the tuit is to be retrieved
     * @returns Promise To be notified with a collection of users who disliked the tuits are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Finds if the user has disliked a tuit
     * @param {string} uid userId of the user
     * @param {string} tid Tuit id of the tuit
     * @returns Promise To be notified when the user has disliked the tuit
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Allows a user to dislike a tuit
     * @param {string} uid User id of the person disliking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being disliked to be inserted into the database
     * @returns Promise To be notified when the tuit being disliked is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Allows a user to undislike a tuit
     * @param {string} uid User id of the person undisliking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being undisliked to be removed from the database
     * @returns Promise To be notified when the tuit being undisliked by a user and is removed into the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

}