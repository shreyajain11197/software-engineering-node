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
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }

    /**
     * Uses TuitModel to retrieve all tuits from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid);
    }

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} username User whose tuits posted are to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    async findTuitsByUser(username: string): Promise<any> {
        return TuitModel.find({postedBy: username});
    }

    /**
     * Updates Tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid},{$set: tuit});
    }

    /**
     * Removes tuits of a user from the database.
     * @param {string} postedBy the user whose tuits are to be removed
     * @returns Promise To be notified when tuits of the user are removed from the database
     */
    async deleteTuitsByUsername(postedBy: string): Promise<any> {
        return TuitModel.deleteMany({postedBy});
    }
}