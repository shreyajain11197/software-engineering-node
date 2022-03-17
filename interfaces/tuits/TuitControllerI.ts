import {Request, Response} from "express";

/**
 * @interface TuitControllerI consisting of RESTful Web service API for bookmark resource.
 * Defines the following use cases for HTTP endpoints:
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
export default interface TuitControllerI {

    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits (req: Request, res: Response): void;

    /**
     * Retrieves all tuits from the database for a particular user and returns
     * an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuitsByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the user ID
     */
    findTuitById (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuitByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including path
     * parameter postedBy identifying the user who posted the tuits which is to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the tuits was successful or not
     */
    deleteTuitsByUsername (req: Request, res: Response): void;

};