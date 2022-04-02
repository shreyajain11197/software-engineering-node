/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../../models/tuits/Tuit";
import TuitModel from "../../mongoose/tuits/TuitModel";
import TuitDaoI from "../../interfaces/tuits/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {

        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Inserts tuit instance into the database
     * @param {string} uid user id of the user woh is creating a tuit
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Removes tuit from the database.
     * @param {string} uid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});

    /**
     * Uses TuitModel to retrieve all tuits from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} uid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} uid User whose tuits posted are to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();

    /**
     * Updates Tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Removes tuits of a user from the database.
     * @param {string} postedBy the user whose tuits are to be removed
     * @returns Promise To be notified when tuits of the user are removed from the database
     */
    async deleteTuitsByUsername(postedBy: string): Promise<any> {
        return TuitModel.deleteMany({postedBy});
    }

    /**
     * Updates the likes on a tuit
     * @param {string} tid the id of the tuit whose likes are to be updated
     * @param {any} newStats the new statistics on the likes of a tuit.
     * @returns Promise To be notified when likes on a tuit is updated.
     */
    updateLikes = async (tid: string, newStats: any): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        );

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} username User whose tuits posted are to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    async findTuitsByUser(username: string): Promise<any> {
        return TuitModel.find({postedBy: username});
    }


    /**
     * Updates the dislikes on a tuit
     * @param {string} tid the id of the tuit whose likes are to be updated
     * @param {any} newStats the new statistics on the likes of a tuit.
     * @returns Promise To be notified when likes on a tuit is updated.
     */
    updateDislikes = async (tid: string, newStats: any): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        );
}