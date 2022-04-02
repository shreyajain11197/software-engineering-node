/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../../interfaces/likes/LikeDaoI";
import LikeModel from "../../mongoose/likes/LikeModel";
import Like from "../../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {

    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Uses LikeModel to retrieve users who liked a tuit from likes collection
     * @param {string} tid Tuit id whose tuits whose users who like the tuit is to be retrieved
     * @returns Promise To be notified with a collection of users who liked the tuits are retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve tuits liked by a user from likes collection
     * @param {string} uid User whose tuits liked are to be retrieved
     * @returns Promise To be notified with the collection of tuits  when the tuits are retrieved from the database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Allows a user to like a tuit
     * @param {string} uid User id of the person liking a tuit to be inserted into the database
     * @param {string} tid Tuit id of the tuit being liked to be inserted into the database
     * @returns Promise To be notified when the tuit being liked is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Allows a user to unlike a tuit
     * @param {string} uid User id of the person unliking a tuit to be removed from the database
     * @param {string} tid Tuit id of the tuit being unliked to be removed from the database
     * @returns Promise To be notified when the tuit being unliked by a user and is removed into the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Counts the likes on a tuit
     * @param {string} tid Tuit id of the tuit whose count is to be fetched
     * @returns Promise To be notified when count on a tuit is returned
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});

    /**
     * Finds if the user has liked a tuit
     * @param {string} uid userId of the user
     * @param {string} tid Tuit id of the tuit
     * @returns Promise To be notified when the user has liked the tuit
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});
}