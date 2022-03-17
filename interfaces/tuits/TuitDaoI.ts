/**
 * @file Interface TuitDaoI for DAO managing data storage of tuits.
 */
import Tuit from "../../models/tuits/Tuit";

/**
 * @interface TuitDaoI consisting of methods for DAO managing data storage of tuits.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
 * <ul>
 *     <li> create a tuit
 *     </li>
 *     <li> delete a tuit
 *     </li>
 *     <li>Find all tuits
 *     </li>
 *     <li>Find all tuits by id
 *     </li>
 *     <li>update a tuit
 *     </li>
 * </ul>
 */
export default interface TuitDaoI {

    /**
     * Uses TuitModel to retrieve all tuits from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits(): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} username User whose tuits posted are to be retrieved
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findTuitsByUser(username: string): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve single tuit from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById(tid: string): Promise<Tuit>;

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit(tuit: Tuit): Promise<Tuit>;

    /**
     * Updates Tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit(tid: string, tuit: Tuit): Promise<any>;

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit(tid: string): Promise<any>;

    /**
     * Removes tuits of a user from the database.
     * @param {string} postedBy the user whose tuits are to be removed
     * @returns Promise To be notified when tuits of the user are removed from the database
     */
    deleteTuitsByUsername(postedBy: string): Promise<any>;

}
